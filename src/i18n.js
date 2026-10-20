// Languages for the whole app: page text, answers, the study guide and (where a free translation exists)
// the scriptures themselves. English is built in; each other language is a module in src/lang/ that
// is loaded the first time someone picks it. Anything a language file leaves out falls back to English.

export const LANGS = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'he', name: 'עברית', dir: 'rtl' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'el', name: 'Ελληνικά', dir: 'ltr' },
  { code: 'la', name: 'Latina', dir: 'ltr' },
];

/** English page text. Language files translate the same keys. {name} placeholders are filled in by t(). */
export const UI = {
  pageTitle: 'SuperBook',
  pageDescription: "Read the Tanakh, the Bible and the Qur'an side by side, and ask how they differ.",
  tagline: 'Three sacred books of the Abrahamic faiths. Open a book to read it, ask the sand a question, or compare them side by side.',
  language: 'Language',
  musicOn: 'Music on',
  musicOff: 'Music off',
  musicTitle: 'Play calm desert ambience',
  books: 'Books',
  openBook: 'Open the {book}',
  'book.tanakh': 'Tanakh',
  'book.bible': 'Holy Bible',
  'book.quran': "Qur'an",
  'short.tanakh': 'Tanakh',
  'short.bible': 'Bible',
  'short.quran': "Qur'an",
  'faith.tanakh': 'Judaism',
  'faith.bible': 'Christianity',
  'faith.quran': 'Islam',
  'subtitle.tanakh': 'The Hebrew Bible',
  'subtitle.bible': 'Eastern Orthodox canon',
  'subtitle.quran': 'القرآن الكريم',
  askTitle: 'Ask the sand',
  askPlaceholder: "Ask anything, e.g. How do the Bible and the Qur'an see Jesus?",
  askLabel: 'Your question',
  askButton: 'Ask',
  compareToggle: 'Compare the books side by side',
  compareTitle: 'The books side by side',
  compareShow: 'Show',
  compareTable: 'Comparison of the three books',
  compareNote: 'Rounded figures. Ask the sand for more detail on any row.',
  smooth: 'Let the wind smooth the sand',
  sandNote: 'Simplified overview. Beliefs and practices vary within each tradition.',
  closeBook: 'Close book',
  sectionBook: 'Book',
  sectionSurah: 'Surah',
  kingdoms: '{n} Kingdoms',
  appendix: 'appendix',
  chapter: 'Chapter',
  original: 'Original language',
  previous: 'Previous',
  next: 'Next',
  opening: 'Opening…',
  turning: 'Turning the page…',
  loadError: 'Could not load this page.',
  checkConnection: 'Check your internet connection and try again.',
  tooFast: 'Reading too fast: wait a few seconds and try again.',
  inEnglish: 'This text is not available in {language} from a free, public-domain source, so it is shown in English.',
  // Answers
  vs: 'vs',
  passageTitle: 'Historical context · {ref}',
  passageNote: '{book} passage. Dates are common scholarly estimates; religious traditions may date it differently.',
  studyTitle: '{ref} · how to study it',
  studyMore: 'More questions to explore: {questions}',
  studyRead: 'Read {ref} at {source}',
  torahSuffix: '{ref} (Torah)',
  surahRef: 'Surah {n} ({name})',
  // Credits for the reader
  'credit.tanakh': 'English: The Holy Scriptures (JPS 1917), public domain. Hebrew: Miqra according to the Masorah (CC BY-SA). Text served by Sefaria.org.',
  'credit.bible': 'World English Bible, public domain, in the books and order of the Eastern Orthodox Bible. Text served by bible-api.com. Not available from this free source: the Letter of Jeremiah, Psalm 151 and the Greek additions to Esther and Daniel.',
  'credit.quran': 'Arabic: Uthmani script. English: Marmaduke Pickthall (1930), public domain. Text served by alquran.cloud.',
};

let current = 'en';
let pack = null;                  // the loaded language module (null for English)
const packs = {};

export const lang = () => current;
export const langInfo = (code = current) => LANGS.find((l) => l.code === code) ?? LANGS[0];
export const languagePack = () => pack;

/** Switches language, loading its file if needed. Unknown codes fall back to English. */
export async function setLanguage(code) {
  if (!LANGS.some((l) => l.code === code)) code = 'en';
  if (code !== 'en' && !packs[code]) packs[code] = (await import(`./lang/${code}.js`)).default;
  current = code;
  pack = code === 'en' ? null : packs[code];
}

/** For tests and Node: use a language pack that is already loaded. */
export function useLanguage(code, languageModule) {
  current = code;
  pack = code === 'en' ? null : languageModule;
  if (languageModule) packs[code] = languageModule;
}

const fill = (text, vars = {}) => String(text).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

/** Page text for a key, in the current language. */
export function t(key, vars) {
  return fill(pack?.ui?.[key] ?? UI[key] ?? key, vars);
}

/** Translated content, e.g. tr('topics', 'age', 'bible', englishText). Falls back to the English text given. */
export function tr(group, id, field, english) {
  const value = pack?.[group]?.[id]?.[field];
  return value === undefined || value === '' ? english : value;
}

/** A Bible book's name in the current language ("Genesis" → "Génesis"). */
export const bookName = (english) => pack?.books?.[english] ?? english;

/**
 * Normalizes text for matching in any of the languages: lowercase, no accents, vowel points or
 * Arabic short vowels, Greek final sigma unified, and only letters, digits and single spaces left.
 */
export function fold(text) {
  return String(text).toLowerCase()
    .normalize('NFD').replace(/\p{M}/gu, '')
    .replace(/ς/g, 'σ')
    .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه')
    .replace(/ß/g, 'ss');
}
