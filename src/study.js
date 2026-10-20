// Study questions about a specific chapter or surah: "What ethical choices arise in Genesis 12?",
// "Who are the key people in Exodus 3 in the Torah?", "What are the main themes of Surah Al-Mulk?"
//
// 1. findChapter() finds a chapter the workbook covers and decides which scripture it belongs to.
// 2. questionType() works out which kind of study question it is (main idea, people, ethics, context…).
// 3. studyAnswer() returns the matching guidance, more questions to study, and a link to read the passage.
import { GUIDANCE, QUESTIONS, FIT, CHAPTERS } from './studydata.js';
import { t, languagePack, bookName } from './i18n.js';
import { normalize, localize, startsWords, wordForms } from './text.js';

const lower = (text) => normalize(text);

// ---------- Chapters ----------

const ORDINALS = [[/\b(first|1st|i)\s+(?=samuel|kings|chronicles|corinthians|thessalonians|timothy|peter|john)/g, '1 '],
  [/\b(second|2nd|ii)\s+(?=samuel|kings|chronicles|corinthians|thessalonians|timothy|peter|john)/g, '2 '],
  [/\bpsalm\b/g, 'psalms'], [/\bchapter\s+/g, '']];

function cleanRefs(question) {
  let q = localize(question);              // "Génesis 12", "سورة 2" → English names
  for (const [pattern, replacement] of ORDINALS) q = q.replace(pattern, replacement);
  return q.replace(/ (\d+) of (?:the book of )?([a-z0-9 ]+?) /, (m, n, book) => ` ${book} ${n} `);   // "chapter 12 of genesis"
}

// "Genesis 12" etc. from both lists, so a chapter in either is recognized. Longest names first ("1 john" before "john").
const NAMED = [...new Set([...CHAPTERS.bible, ...CHAPTERS.tanakh].map((ref) => ref.replace(/ \d+$/, '')))]
  .sort((a, b) => b.length - a.length);
const BOOK_REF = new RegExp(`(?<![0-9] )\\b(${NAMED.map((b) => b.toLowerCase()).join('|')}) (\\d+)\\b`);

const JEWISH = [' torah ', ' jewish ', ' judaism ', ' rabbi', ' tanakh ', ' hebrew bible ', ' midrash ', ' parashah ', ' parsha '];

// Surah names without the Arabic article ("Al-Baqarah" → "baqarah"), so "Surah Baqarah" also works.
const SURAH_CORE = CHAPTERS.quran.map(([n, name]) => [n, lower(name).trim(), lower(name).trim().replace(/^(al|an|at|as|ar|ad|az|ash|ath)\s+/, '')]);
const QURAN_WORDS = /\b(surah|sura|surat|quran|koran|chapter)\b/;

function findSurah(q) {
  const numbered = q.match(/\b(?:surah|sura|surat|quran|koran) (\d{1,3})\b/);
  if (numbered) {
    const hit = CHAPTERS.quran.find(([n]) => n === Number(numbered[1]));
    return hit ? hit : null;
  }
  for (const [n, full, core] of SURAH_CORE) {
    // A name with the Arabic article ("al baqarah") is distinctive on its own. Others, and short forms, need
    // "surah" or "Quran" nearby, since many surahs are named after people (Muhammad, Yusuf, Maryam, Ibrahim)
    const distinctive = full !== core && q.includes(` ${full} `);
    if (distinctive || ((q.includes(` ${full} `) || (core.length >= 4 && q.includes(` ${core} `))) && QURAN_WORDS.test(q))) {
      return CHAPTERS.quran.find(([m]) => m === n);
    }
  }
  return null;
}

const TITLE = (s) => s.replace(/\b[a-z]/g, (c) => c.toUpperCase());

/** The chapter a question asks about, if the workbook covers it: { book, ref, label, url } or null. */
export function findChapter(question) {
  const q = cleanRefs(question);
  const surah = findSurah(q);
  if (surah) {
    const [n, name] = surah;
    return { book: 'quran', ref: `Surah ${n} (${name})`, label: `Surah ${n} (${name})`, surah: [n, name], url: `https://quran.com/${n}`, source: 'Quran.com' };
  }
  const m = q.match(BOOK_REF);
  if (!m) return null;
  const ref = `${TITLE(m[1])} ${m[2]}`.replace(/^(\d) /, '$1 ');
  const inBible = CHAPTERS.bible.includes(ref);
  const inTorah = CHAPTERS.tanakh.includes(ref);
  const wantsTorah = JEWISH.some((w) => q.includes(w)) || (languagePack()?.bookWords?.tanakh ?? []).some((w) => startsWords(q, w));
  const book = inTorah && (wantsTorah || !inBible) ? 'tanakh' : inBible ? 'bible' : null;
  if (!book) return null;
  if (book === 'tanakh') {
    const [name, n] = [ref.replace(/ \d+$/, ''), ref.match(/\d+$/)[0]];
    return { book, ref, label: `${ref} (Torah)`, url: `https://www.sefaria.org/${name}.${n}`, source: 'Sefaria' };
  }
  return { book, ref, label: ref, url: `https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=WEB`, source: 'Bible Gateway (World English Bible)' };
}

// ---------- Kind of question ----------

// Word beginnings that point to each GUIDANCE entry (same order as GUIDANCE).
const TYPE_WORDS = [
  ['happen', 'main', 'central', 'summar', 'about', 'teach', 'theme', 'message', 'argument', 'event', 'overview', 'story', 'explain'],
  ['who', 'people', 'person', 'character', 'group', 'communit', 'role', 'famil', 'leader', 'figure', 'behavio'],
  ['god', 'divine', 'humanit', 'relationship', 'attribute', 'guidance', 'revelation', 'faith', 'covenant', 'accountab', 'allah', 'lord'],
  ['ethic', 'moral', 'responsib', 'choice', 'command', 'law', 'right', 'wrong', 'duty', 'obligation', 'justice', 'holiness', 'compassion', 'decision', 'lesson', 'spiritual'],
  ['histor', 'setting', 'context', 'background', 'when', 'where', 'audience', 'written', 'revealed', 'occasion'],
  ['word', 'image', 'imager', 'symbol', 'metaphor', 'hebrew', 'arabic', 'greek', 'term', 'language', 'rhetor', 'literary', 'pattern', 'structure', 'progression', 'repeat', 'phrase', 'style'],
  ['conflict', 'problem', 'tension', 'struggle', 'resolv', 'resolution', 'challenge'],
  ['connect', 'relate', 'compar', 'elsewhere', 'another', 'earlier', 'later', 'parallel', 'link'],
  ['interpret', 'commentar', 'tafsir', 'rabbi', 'scholar', 'tradition', 'midrash', 'reader', 'mean', 'denomination', 'view'],
  ['difficult', 'hard', 'puzzl', 'confus', 'debate', 'controvers'],
];
// Words that name a scripture shouldn't count as a kind of question ("Jewish" isn't asking for "interpretation")
const IGNORE = new Set(['torah', 'quran', 'koran', 'surah', 'sura', 'bible', 'tanakh', 'jewish', 'christian', 'muslim', 'hebrew']);

/** Which GUIDANCE fits the question (index), and how strongly it matched (0 = no clear kind). */
export function questionType(question) {
  const words = lower(question).trim().split(' ').filter((w) => !IGNORE.has(w) || w === 'hebrew');
  const local = languagePack()?.studyTypeWords ?? [];
  let best = 0, score = 0;
  TYPE_WORDS.forEach((english, i) => {
    const stems = [...english, ...(local[i] ?? []).map((w) => normalize(w).trim())];
    const hits = words.filter((w) => wordForms(w).some((f) => stems.some((s) => s && f.startsWith(s)))).length;
    if (hits > score) { best = i; score = hits; }
  });
  return { type: best, score };
}

// ---------- Answer ----------

const fill = (text, ref) => text.replaceAll('{ref}', ref);

/** A chapter's name in the current language: "Génesis 12", "Génesis 12 (Torá)", "Sura 2 (Al-Baqarah)". */
function localLabel({ book, ref, surah }) {
  if (book === 'quran') return t('surahRef', { n: surah[0], name: languagePack()?.surahNames?.[surah[0]] ?? surah[1] });
  const local = `${bookName(ref.replace(/ \d+$/, ''))} ${ref.match(/\d+$/)[0]}`;
  return book === 'tanakh' ? t('torahSuffix', { ref: local }) : local;
}

/** Builds the answer for a chapter question, in the current language. */
export function studyAnswer(question, chapter = findChapter(question)) {
  const { type } = questionType(question);
  const { book, url, source } = chapter;
  const pack = languagePack();
  const guidanceText = pack?.study?.guidance ?? GUIDANCE;
  const questionText = pack?.study?.questions?.[book] ?? QUESTIONS[book];
  const label = localLabel(chapter);
  const ref = book === 'tanakh' ? label.replace(/\s*\(.*\)$/, '') : label;       // "Exodus 3", without "(Torah)"
  const asked = FIT[book].findIndex((g) => g.includes(type));
  const guidance = (asked >= 0 ? FIT[book][asked] : [type]).map((g) => fill(guidanceText[g], ref));
  // The workbook's Qur'an questions already say "Surah {ref}", so they get the name without "Surah"
  const questionRef = book === 'quran' ? `${chapter.surah[0]} (${pack?.surahNames?.[chapter.surah[0]] ?? chapter.surah[1]})` : ref;
  const more = questionText.filter((_, i) => i !== asked).slice(0, 3).map((q) => fill(q, questionRef));
  return {
    id: 'study',
    title: t('studyTitle', { ref: label }),
    answer: [...guidance, t('studyMore', { questions: more.join(' ') })],    // the page adds a link to read it
    books: [book],
    source: { url, label: t('studyRead', { ref, source }) },
  };
}
