import { t, lang, bookName } from './i18n.js';

// Table of contents for each book. Texts are loaded at runtime from free public APIs,
// using public-domain translations (World English Bible, JPS 1917, Pickthall 1930).

// [name, chapters] in the Jewish order: Torah, Nevi'im (Prophets), Ketuvim (Writings).
// Names match Sefaria's API. Chapter numbers follow the Hebrew text (e.g. Joel has 4, Malachi 3).
export const TANAKH = [
  ['Genesis', 50], ['Exodus', 40], ['Leviticus', 27], ['Numbers', 36], ['Deuteronomy', 34],
  ['Joshua', 24], ['Judges', 21], ['I Samuel', 31], ['II Samuel', 24], ['I Kings', 22], ['II Kings', 25],
  ['Isaiah', 66], ['Jeremiah', 52], ['Ezekiel', 48], ['Hosea', 14], ['Joel', 4], ['Amos', 9], ['Obadiah', 1],
  ['Jonah', 4], ['Micah', 7], ['Nahum', 3], ['Habakkuk', 3], ['Zephaniah', 3], ['Haggai', 2], ['Zechariah', 14], ['Malachi', 3],
  ['Psalms', 150], ['Proverbs', 31], ['Job', 42], ['Song of Songs', 8], ['Ruth', 4], ['Lamentations', 5],
  ['Ecclesiastes', 12], ['Esther', 10], ['Daniel', 12], ['Ezra', 10], ['Nehemiah', 13], ['I Chronicles', 29], ['II Chronicles', 36],
];

// Eastern Orthodox Bible: the Old Testament in Orthodox order (following the Septuagint), with the books
// Protestant Bibles leave out, then the 27 books of the New Testament.
// [id for bible-api.com, chapters, label]. The id is what the API understands; the label is what readers see.
// The World English Bible on bible-api.com has every Orthodox book except the Letter of Jeremiah,
// Psalm 151, the Prayer of Azariah and the Greek additions to Esther.
export const BIBLE = [
  ['Genesis', 50], ['Exodus', 40], ['Leviticus', 27], ['Numbers', 36], ['Deuteronomy', 34], ['Joshua', 24], ['Judges', 21],
  ['Ruth', 4], ['1 Samuel', 31, '1 Kingdoms (1 Samuel)'], ['2 Samuel', 24, '2 Kingdoms (2 Samuel)'],
  ['1 Kings', 22, '3 Kingdoms (1 Kings)'], ['2 Kings', 25, '4 Kingdoms (2 Kings)'],
  ['1 Chronicles', 29], ['2 Chronicles', 36], ['Prayer of Manasses', 1, 'Prayer of Manasseh'],
  ['1 Esdras', 9], ['Ezra', 10, '2 Esdras (Ezra)'], ['Nehemiah', 13], ['Tobit', 14], ['Judith', 16], ['Esther', 10],
  ['1 Maccabees', 16], ['2 Maccabees', 15], ['3 Maccabees', 7],
  ['Psalms', 150], ['Job', 42], ['Proverbs', 31], ['Ecclesiastes', 12], ['Song of Solomon', 8, 'Song of Songs'],
  ['Wisdom', 19, 'Wisdom of Solomon'], ['Sirach', 51],
  ['Hosea', 14], ['Amos', 9], ['Micah', 7], ['Joel', 3], ['Obadiah', 1], ['Jonah', 4], ['Nahum', 3], ['Habakkuk', 3],
  ['Zephaniah', 3], ['Haggai', 2], ['Zechariah', 14], ['Malachi', 4],
  ['Isaiah', 66], ['Jeremiah', 52], ['Baruch', 5], ['Lamentations', 5], ['Ezekiel', 48], ['Daniel', 12],
  ['sus', 1, 'Susanna'], ['Bel and the Dragon', 1], ['4 Maccabees', 18, '4 Maccabees (appendix)'],
  ['Matthew', 28], ['Mark', 16], ['Luke', 24], ['John', 21], ['Acts', 28], ['Romans', 16], ['1 Corinthians', 16],
  ['2 Corinthians', 13], ['Galatians', 6], ['Ephesians', 6], ['Philippians', 4], ['Colossians', 4], ['1 Thessalonians', 5],
  ['2 Thessalonians', 3], ['1 Timothy', 6], ['2 Timothy', 4], ['Titus', 3], ['Philemon', 1], ['Hebrews', 13], ['James', 5],
  ['1 Peter', 5], ['2 Peter', 3], ['1 John', 5], ['2 John', 1], ['3 John', 1], ['Jude', 1], ['Revelation', 22],
];

/** Books found in Orthodox Bibles but not in Protestant ones (the deuterocanonical books, or "readable" books). */
export const ORTHODOX_EXTRA = ['Prayer of Manasses', '1 Esdras', 'Tobit', 'Judith', '1 Maccabees', '2 Maccabees', '3 Maccabees',
  'Wisdom', 'Sirach', 'Baruch', 'sus', 'Bel and the Dragon', '4 Maccabees'];

// The 66 books shared by every Christian Bible, in the order Bible APIs number them (Genesis = 1, Revelation = 66).
const NUMBERED = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes',
  'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah',
  'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans',
  '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'];

// Public-domain Bibles in other languages, served by getbible.net (by book number). Where a language has no
// free translation of a book (the extra Orthodox books, the Hebrew New Testament, Arabic), the World English Bible is shown.
const GETBIBLE = {
  es: { ot: 'valera', nt: 'valera' },          // Reina-Valera 1909
  fr: { ot: 'ls1910', nt: 'ls1910' },          // Louis Segond 1910
  de: { ot: 'elberfelder', nt: 'elberfelder' }, // Elberfelder 1871
  la: { ot: 'vulgate', nt: 'vulgate' },        // Clementine Vulgate
  el: { ot: 'lxx', nt: 'tischendorf' },        // Septuagint (Psalms in its numbering) and Tischendorf's New Testament
  he: { ot: 'codex' },                         // Westminster Leningrad Codex (Old Testament only)
};

// Free Tanakh translations on Sefaria, by language. Hebrew readers get the Hebrew text itself.
const SEFARIA = {
  en: 'english|The Holy Scriptures: A New Translation (JPS 1917)',
  fr: 'french|Bible du Rabbinat 1899 [fr]',
  de: 'german|Die vier und zwanzig Bücher der Heiligen Schrift. Unter der Redaction von Dr. Zunz übersetzt von H. Arnheim, Dr. Julius Fürst, Dr. M. Sachs. Berlin 1838 [de]',
};

// Sefaria's Tanakh names → the English names used for translating book names
const TANAKH_NAMES = { 'I Samuel': '1 Samuel', 'II Samuel': '2 Samuel', 'I Kings': '1 Kings', 'II Kings': '2 Kings',
  'I Chronicles': '1 Chronicles', 'II Chronicles': '2 Chronicles' };

/** A Bible book's label in the current language, keeping the Orthodox names ("3 Kingdoms (1 Kings)"). */
function bibleLabel([id, , label = id]) {
  const kingdoms = label.match(/^(\d) Kingdoms \((.+)\)$/);
  if (kingdoms) return `${t('kingdoms', { n: kingdoms[1] })} (${bookName(kingdoms[2])})`;
  const extra = label.match(/^(.+) \((.+)\)$/);                 // "2 Esdras (Ezra)", "4 Maccabees (appendix)"
  if (extra) return `${bookName(extra[1])} (${extra[2] === 'appendix' ? t('appendix') : bookName(extra[2])})`;
  return bookName(label);
}

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.status === 429 ? t('tooFast') : t('loadError'));
  return res.json();
};

/** Marks verses shown in English because the current language has no free translation of them. */
const inEnglish = (verses) => Object.assign(verses, { fallback: lang() !== 'en' });

export const BOOKS = {
  tanakh: {
    key: 'tanakh',
    sections: TANAKH.map(([name, chapters]) => ({ id: name, label: name, chapters })),
    label: (s) => bookName(TANAKH_NAMES[s.id] ?? s.id),
    sectionWord: 'sectionBook',
    async load(section, chapter) {
      const ref = encodeURIComponent(`${section}.${chapter}`);
      const code = lang();
      const data = await fetchJson(`https://www.sefaria.org/api/v3/texts/${ref}?version=${encodeURIComponent(SEFARIA[code] ?? SEFARIA.en)}&version=hebrew`);
      const hebrew = data.versions.find((v) => v.actualLanguage === 'he' || v.language === 'he')?.text ?? [];
      if (code === 'he') return hebrew.map((text, i) => ({ n: i + 1, text: clean(text), dir: 'rtl' }));
      const translation = data.versions.find((v) => v.actualLanguage !== 'he' && v.language !== 'he')?.text ?? [];
      const verses = translation.map((text, i) => ({ n: i + 1, text: clean(text), original: clean(hebrew[i] ?? ''), dir: 'rtl' }));
      return SEFARIA[code] ? verses : inEnglish(verses);
    },
  },
  bible: {
    key: 'bible',
    sections: BIBLE.map(([id, chapters, label = id]) => ({ id, label, chapters })),
    label: (s) => bibleLabel(BIBLE.find(([id]) => id === s.id)),
    sectionWord: 'sectionBook',
    async load(section, chapter) {
      const nr = NUMBERED.indexOf(section) + 1;
      const source = GETBIBLE[lang()];
      const key = nr && source && (nr <= 39 ? source.ot : source.nt);
      if (key) {
        try {
          const data = await fetchJson(`https://api.getbible.net/v2/${key}/${nr}/${chapter}.json`);
          const dir = data.direction === 'RTL' ? 'rtl' : undefined;
          return data.verses.map((v) => ({ n: v.verse, text: v.text.replace(/\s+/g, ' ').trim(), dir }));
        } catch {
          // Some chapters are numbered differently in the Hebrew and Greek texts (e.g. Malachi 4, Joel 3);
          // show the English chapter rather than nothing
        }
      }
      const data = await fetchJson(`https://bible-api.com/${encodeURIComponent(`${section} ${chapter}`)}?translation=web`);
      return inEnglish(data.verses.map((v) => ({ n: v.verse, text: v.text.replace(/\s+/g, ' ').trim() })));
    },
  },
  quran: {
    key: 'quran',
    sections: null,            // loaded from the API (114 surahs)
    label: (s) => (lang() === 'ar' ? `${s.id}. ${s.arabic}` : lang() === 'en' ? `${s.id}. ${s.english} (${s.meaning})` : `${s.id}. ${s.english}`),
    sectionWord: 'sectionSurah',
    async loadSections() {
      const data = await fetchJson('https://api.alquran.cloud/v1/surah');
      return data.data.map((s) => ({ id: s.number, arabic: s.name, english: s.englishName, meaning: s.englishNameTranslation, chapters: 1 }));
    },
    async load(section) {
      const [arabic, english] = (await fetchJson(`https://api.alquran.cloud/v1/surah/${section}/editions/quran-uthmani,en.pickthall`)).data;
      const original = (i) => arabic.ayahs[i].text.replace(/^﻿/, '');
      if (lang() === 'ar') return english.ayahs.map((a, i) => ({ n: a.numberInSurah, text: original(i), dir: 'rtl' }));
      return inEnglish(english.ayahs.map((a, i) => ({ n: a.numberInSurah, text: a.text, original: original(i), dir: 'rtl' })));
    },
  },
};

// Sefaria returns light HTML (footnotes, <big>, <br>); keep plain text only.
function clean(html) {
  return String(html)
    .replace(/<sup[^>]*>.*?<\/sup>/g, '')
    .replace(/<i class="footnote">.*?<\/i>/g, '')
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&thinsp;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
