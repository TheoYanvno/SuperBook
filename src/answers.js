// "Ask the sand": matches a question to a topic and builds an answer for the books it asks about.
//
// 1. normalize()  lowercases, removes accents and vowel marks, unifies spellings (Koran → quran,
//                 Mohammed → muhammad) and keeps only letters and digits, in any of the app's languages.
// 2. localize()   turns book names in the current language into English ones ("Génesis 12" → "genesis 12"),
//                 so passages and chapters are recognized whatever language the question is in.
// 3. stem()       trims common English endings so "prophets", "praying" and "prayed" match "prophet" and "pray".
// 4. findBooks()  notices which books or faiths the question names (Torah, Christians, Qur'an…).
// 5. answer()     checks for a named passage or chapter first (passages.js, study.js), then scores every topic
//                 by its English keywords and the current language's keywords, and answers for the named
//                 books only, or for all three when none (or all) are named. Answers are in the current language.
import { TOPICS } from './topics.js';
import { PASSAGES, CONTEXT_WORDS } from './passages.js';
import { findChapter, questionType, studyAnswer } from './study.js';
import { t, tr, languagePack } from './i18n.js';
import { normalize, localize, startsWords } from './text.js';

export { normalize, localize };

export { TOPICS };

export const BOOKS = ['tanakh', 'bible', 'quran'];

// ---------- English stemming ----------

// Light stemming: enough to match plurals and verb forms, applied the same way to questions and keywords.
function stemOnce(word) {
  if (word.length <= 4 || !/^[a-z0-9]+$/.test(word)) return word;
  if (word.endsWith('ies')) return word.slice(0, -3) + 'y';
  if (word.endsWith('ing') && word.length > 5) return word.slice(0, -3);
  if (word.endsWith('ed') && word.length > 5) return word.slice(0, -2);
  if (word.endsWith('es') && /(ch|sh|x|ss)es$/.test(word)) return word.slice(0, -2);
  if (word.endsWith('s') && !word.endsWith('ss') && !word.endsWith('us')) return word.slice(0, -1);
  if (word.endsWith('e')) return word.slice(0, -1);   // cremate / cremated → cremat
  return word;
}
export function stem(word) {
  for (let next = stemOnce(word); next !== word; next = stemOnce(word)) word = next;   // miracles → miracle → miracl
  return word;
}
const stemText = (normalized) => ` ${normalized.trim().split(' ').map(stem).join(' ')} `;

// ---------- Which books a question names ----------

// Words that name a book or its faith. "hebrew bible" is removed before looking for "bible".
const BOOK_WORDS = {
  tanakh: ['tanakh', 'tanach', 'torah', 'hebrew bible', 'hebrew scriptures', 'jewish', 'jews', 'jew', 'judaism', 'talmud'],
  bible: ['bible', 'new testament', 'old testament', 'gospel', 'gospels', 'christian', 'christians', 'christianity'],
  quran: ['quran', 'islam', 'islamic', 'muslim', 'muslims'],
};

export function findBooks(question) {
  let q = normalize(question);
  const local = languagePack()?.bookWords ?? {};
  const found = [];
  for (const book of BOOKS) {
    if (BOOK_WORDS[book].some((w) => q.includes(` ${w} `)) || (local[book] ?? []).some((w) => startsWords(q, w))) found.push(book);
    if (book === 'tanakh') {
      q = q.replace(/ hebrew (bible|scriptures) /g, ' ');
      for (const w of local.hebrewBible ?? []) q = q.split(` ${normalize(w).trim()} `).join(' ');
    }
  }
  return found;
}

// ---------- Topics ----------

// Keywords are prepared once: normalized, stemmed, and flagged weak ("~").
const PREPARED = TOPICS.map((topic) => ({
  topic,
  keywords: topic.keywords.map((k) => {
    const weak = k.startsWith('~');
    const phrase = stemText(normalize(weak ? k.slice(1) : k));
    return { phrase, weak, points: weak ? 1 : phrase.trim().split(' ').length + 1 };
  }),
}));

/** Scores every topic; longer phrases count more, and all weak words together count 1 point. */
export function rank(question) {
  const q = stemText(normalize(question));
  const plain = normalize(question);
  const pack = languagePack();
  return PREPARED.map(({ topic, keywords }) => {
    let score = 0, weakHit = 0;
    for (const k of keywords) {
      if (!q.includes(k.phrase)) continue;
      if (k.weak) weakHit = 1;
      else score += k.points;
    }
    // Keywords in the current language (written as word beginnings, e.g. "profet" for profeta/profetas)
    for (const k of pack?.topics?.[topic.id]?.keywords ?? []) {
      const weak = k.startsWith('~');
      const phrase = weak ? k.slice(1) : k;
      if (!startsWords(plain, phrase)) continue;
      if (weak) weakHit = 1;
      else score += normalize(phrase.replace(/^=/, '')).trim().split(' ').length + 1;
    }
    return { topic, score: score + weakHit };
  }).filter((r) => r.score > 0).sort((a, b) => b.score - a.score);   // stable: earlier topics win ties
}

const label = (kind, book) => t(`${kind === 'book' ? 'short' : 'faith'}.${book}`);

/** Builds the paragraphs for a topic, for some or all of the books, in the current language. */
export function compose(topic, books = BOOKS) {
  const kind = topic.kind ?? 'faith';
  const text = (field) => tr('topics', topic.id, field, topic[field]);
  const answer = [];
  if (topic.shared && books.length > 1) answer.push(text('shared'));
  for (const book of books) answer.push(`${label(kind, book)}: ${text(book)}`);
  if (topic.note) answer.push(text('note'));
  const names = books.map((b) => label(kind, b));
  const title = text('title');
  const fullTitle = books.length === BOOKS.length ? title
    : books.length === 1 ? `${title} · ${names[0]}`
    : `${title} · ${names.join(` ${t('vs')} `)}`;
  return { id: topic.id, title: fullTitle, answer, books };
}

const PROFILE = TOPICS.find((x) => x.id === 'profile');
const DIFFERENCES = TOPICS.find((x) => x.id === 'differences');

// ---------- Passages ----------

/**
 * A known passage named in the question ("Psalm 137", "Surah 96", "John 3:16"; also "Salmo 137" in Spanish).
 * Numbered references always count; named ones ("rivers of Babylon") count when the question asks about context or meaning.
 * The longest matching pattern wins, so "1 Corinthians 13" beats "Corinthians 13".
 */
export function findPassage(question) {
  const q = localize(question);
  const localContext = languagePack()?.contextWords ?? [];
  const asksContext = CONTEXT_WORDS.some((w) => q.includes(w)) || localContext.some((w) => startsWords(q, w));
  let best = null;
  for (const passage of PASSAGES) {
    const local = languagePack()?.passages?.[passage.ref]?.match ?? [];
    for (const pattern of [...passage.match, ...local]) {
      const p = ` ${normalize(pattern).trim()} `;
      if (!q.includes(p)) continue;
      if (!/[0-9]/.test(pattern) && !asksContext) continue;
      if (!best || p.length > best.length) best = { passage, length: p.length };
    }
  }
  return best?.passage ?? null;
}

export function passageAnswer(passage) {
  const ref = tr('passages', passage.ref, 'ref', passage.ref);
  return {
    id: 'passage',
    title: t('passageTitle', { ref }),
    answer: [...tr('passages', passage.ref, 'context', passage.context), t('passageNote', { book: t(`short.${passage.book}`) })],
    books: [passage.book],
  };
}

// ---------- Answer ----------

export function answer(question) {
  const q = normalize(question);
  if (q.trim().length < 2) return fallback();
  // A named chapter: the passage's historical context when we have it and that's what is asked,
  // otherwise the study guide for that chapter (main idea, people, ethics, words, interpretations…)
  const passage = findPassage(question);
  const chapter = findChapter(question);
  if (passage && (!chapter || [0, 4, 8].includes(questionType(question).type) || questionType(question).score === 0)) {
    return passageAnswer(passage);
  }
  if (chapter) return studyAnswer(question, chapter);
  const named = findBooks(question);
  const books = named.length ? named : BOOKS;
  const [best] = rank(question);

  // "Tell me about the Torah", "What is Islam?": no other topic, so describe the book
  if ((!best || best.topic.id === 'profile') && named.length) {
    return named.length > 1 ? compose(DIFFERENCES, books) : compose(PROFILE, books);
  }
  if (!best || best.topic.id === 'profile') return fallback();
  return compose(best.topic, books);
}

const FALLBACK = {
  id: 'unknown',
  title: 'Ask me about…',
  answer: [
    "The sand doesn't know that one yet.",
    'Try a question about the books (how old they are, who wrote them, where, what language, how they are organized, the oldest copies), people (God, Jesus, Muhammad, Moses, Abraham, Mary, Noah, Joseph, David, Jonah), beliefs (creation, angels, Satan, miracles, the afterlife, sin, free will, the end of days) or practice (prayer, holy days, fasting, charity, pilgrimage, food, marriage, funerals, dress).',
    'Name one or two books to compare just those, for example: "How do the Bible and the Qur\'an see Jesus?"',
    'You can also ask for the historical context of a passage, such as Psalm 137, Isaiah 53, John 3:16 or Surah 96.',
    'Or ask how to study one of 300 chapters and surahs, for example: "What ethical choices arise in Genesis 12?" or "What are the main themes of Surah Al-Mulk?"',
  ],
};
export { FALLBACK };

/** The "I don't know that one" answer, in the current language. */
export function fallback() {
  const local = languagePack()?.fallback;
  return local ? { id: 'unknown', title: local.title, answer: local.answer } : FALLBACK;
}
