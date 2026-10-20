// "Ask the sand": matches a question to a topic and builds an answer for the books it asks about.
//
// 1. normalize()  lowercases, unifies spellings (Koran → quran, Mohammed → muhammad) and removes punctuation.
// 2. stem()       trims common endings so "prophets", "praying" and "prayed" match "prophet" and "pray".
// 3. findBooks()  notices which books or faiths the question names (Torah, Christians, Qur'an…).
// 4. answer()     checks for a named passage or chapter first (passages.js, study.js), then scores every topic by its keywords and answers for the named books only,
//                 or for all three when none (or all) are named.
import { TOPICS } from './topics.js';
import { PASSAGES, CONTEXT_WORDS } from './passages.js';
import { findChapter, questionType, studyAnswer } from './study.js';

export { TOPICS };

export const BOOKS = ['tanakh', 'bible', 'quran'];
const LABELS = {
  book: { tanakh: 'Tanakh', bible: 'Bible', quran: "Qur'an" },
  faith: { tanakh: 'Judaism', bible: 'Christianity', quran: 'Islam' },
};

const SPELLINGS = [
  [/qur['’]?an|koran|coran/g, 'quran'],
  [/mohammed|mohammad|muhammed|mohamed/g, 'muhammad'],
  [/judgement/g, 'judgment'],
  [/neighbour/g, 'neighbor'],
  [/['’]/g, ''],                      // what's → whats
];

export function normalize(text) {
  let t = String(text).toLowerCase();
  for (const [pattern, replacement] of SPELLINGS) t = t.replace(pattern, replacement);
  return ` ${t.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()} `;
}

// Light stemming: enough to match plurals and verb forms, applied the same way to questions and keywords.
function stemOnce(word) {
  if (word.length <= 4) return word;
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

// Words that name a book or its faith. "hebrew bible" is removed before looking for "bible".
const BOOK_WORDS = {
  tanakh: ['tanakh', 'tanach', 'torah', 'hebrew bible', 'hebrew scriptures', 'jewish', 'jews', 'jew', 'judaism', 'talmud'],
  bible: ['bible', 'new testament', 'old testament', 'gospel', 'gospels', 'christian', 'christians', 'christianity'],
  quran: ['quran', 'islam', 'islamic', 'muslim', 'muslims'],
};

export function findBooks(question) {
  let q = normalize(question);
  const found = [];
  for (const book of BOOKS) {
    if (BOOK_WORDS[book].some((w) => q.includes(` ${w} `))) found.push(book);
    if (book === 'tanakh') q = q.replace(/ hebrew (bible|scriptures) /g, ' ');
  }
  return found;
}

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
  return PREPARED.map(({ topic, keywords }) => {
    let score = 0, weakHit = 0;
    for (const k of keywords) {
      if (!q.includes(k.phrase)) continue;
      if (k.weak) weakHit = 1;
      else score += k.points;
    }
    return { topic, score: score + weakHit };
  }).filter((r) => r.score > 0).sort((a, b) => b.score - a.score);   // stable: earlier topics win ties
}

/** Builds the paragraphs for a topic, for some or all of the books. */
export function compose(topic, books = BOOKS) {
  const labels = LABELS[topic.kind ?? 'faith'];
  const answer = [];
  if (topic.shared && books.length > 1) answer.push(topic.shared);
  for (const book of books) answer.push(`${labels[book]}: ${topic[book]}`);
  if (topic.note) answer.push(topic.note);
  const names = books.map((b) => labels[b]);
  const title = books.length === BOOKS.length ? topic.title
    : books.length === 1 ? `${topic.title} · ${names[0]}`
    : `${topic.title} · ${names.join(' vs ')}`;
  return { id: topic.id, title, answer, books };
}

const PROFILE = TOPICS.find((t) => t.id === 'profile');
const DIFFERENCES = TOPICS.find((t) => t.id === 'differences');

/**
 * A known passage named in the question ("Psalm 137", "Surah 96", "John 3:16").
 * Numbered references always count; named ones ("rivers of Babylon") count when the question asks about context or meaning.
 * The longest matching pattern wins, so "1 Corinthians 13" beats "Corinthians 13".
 */
export function findPassage(question) {
  const q = normalize(question);
  const asksContext = CONTEXT_WORDS.some((w) => q.includes(w));
  let best = null;
  for (const passage of PASSAGES) {
    for (const pattern of passage.match) {
      const p = ` ${normalize(pattern).trim()} `;
      if (!q.includes(p)) continue;
      if (!/[0-9]/.test(pattern) && !asksContext) continue;
      if (!best || p.length > best.length) best = { passage, length: p.length };
    }
  }
  return best?.passage ?? null;
}

const BOOK_LABEL = { tanakh: 'Tanakh', bible: 'Bible', quran: "Qur'an" };

export function passageAnswer(passage) {
  return {
    id: 'passage',
    title: `Historical context · ${passage.ref}`,
    answer: [...passage.context, `${BOOK_LABEL[passage.book]} passage. Dates are common scholarly estimates; religious traditions may date it differently.`],
    books: [passage.book],
  };
}

export function answer(question) {
  const q = normalize(question);
  if (q.trim().length < 2) return FALLBACK;
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
  if (!best || best.topic.id === 'profile') return FALLBACK;
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
