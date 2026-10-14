// Table of contents for each book. Texts are loaded at runtime from free public APIs,
// using public-domain translations (KJV 1611, JPS 1917, Pickthall 1930).

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

// Protestant Bible, 66 books. Names match bible-api.com.
export const BIBLE = [
  ['Genesis', 50], ['Exodus', 40], ['Leviticus', 27], ['Numbers', 36], ['Deuteronomy', 34], ['Joshua', 24], ['Judges', 21],
  ['Ruth', 4], ['1 Samuel', 31], ['2 Samuel', 24], ['1 Kings', 22], ['2 Kings', 25], ['1 Chronicles', 29], ['2 Chronicles', 36],
  ['Ezra', 10], ['Nehemiah', 13], ['Esther', 10], ['Job', 42], ['Psalms', 150], ['Proverbs', 31], ['Ecclesiastes', 12],
  ['Song of Solomon', 8], ['Isaiah', 66], ['Jeremiah', 52], ['Lamentations', 5], ['Ezekiel', 48], ['Daniel', 12], ['Hosea', 14],
  ['Joel', 3], ['Amos', 9], ['Obadiah', 1], ['Jonah', 4], ['Micah', 7], ['Nahum', 3], ['Habakkuk', 3], ['Zephaniah', 3],
  ['Haggai', 2], ['Zechariah', 14], ['Malachi', 4],
  ['Matthew', 28], ['Mark', 16], ['Luke', 24], ['John', 21], ['Acts', 28], ['Romans', 16], ['1 Corinthians', 16],
  ['2 Corinthians', 13], ['Galatians', 6], ['Ephesians', 6], ['Philippians', 4], ['Colossians', 4], ['1 Thessalonians', 5],
  ['2 Thessalonians', 3], ['1 Timothy', 6], ['2 Timothy', 4], ['Titus', 3], ['Philemon', 1], ['Hebrews', 13], ['James', 5],
  ['1 Peter', 5], ['2 Peter', 3], ['1 John', 5], ['2 John', 1], ['3 John', 1], ['Jude', 1], ['Revelation', 22],
];

export const BOOKS = {
  tanakh: {
    title: 'Tanakh',
    subtitle: 'The Hebrew Bible',
    faith: 'Judaism',
    sections: TANAKH.map(([name, chapters]) => ({ id: name, label: name, chapters })),
    sectionWord: 'Book',
    credit: 'English: The Holy Scriptures (JPS 1917), public domain. Hebrew: Miqra according to the Masorah (CC BY-SA). Text served by Sefaria.org.',
    async load(section, chapter) {
      const ref = encodeURIComponent(`${section}.${chapter}`);
      const en = encodeURIComponent('english|The Holy Scriptures: A New Translation (JPS 1917)');
      const res = await fetch(`https://www.sefaria.org/api/v3/texts/${ref}?version=${en}&version=hebrew`);
      if (!res.ok) throw new Error('Could not load this chapter.');
      const data = await res.json();
      const english = data.versions.find((v) => v.actualLanguage === 'en' || v.language === 'en')?.text ?? [];
      const hebrew = data.versions.find((v) => v.actualLanguage === 'he' || v.language === 'he')?.text ?? [];
      return english.map((text, i) => ({ n: i + 1, text: clean(text), original: clean(hebrew[i] ?? ''), dir: 'rtl' }));
    },
  },
  bible: {
    title: 'Holy Bible',
    subtitle: 'Old and New Testaments',
    faith: 'Christianity',
    sections: BIBLE.map(([name, chapters]) => ({ id: name, label: name, chapters })),
    sectionWord: 'Book',
    credit: 'King James Version (1611), public domain. Text served by bible-api.com.',
    async load(section, chapter) {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(`${section} ${chapter}`)}?translation=kjv`);
      if (!res.ok) throw new Error(res.status === 429 ? 'Reading too fast: wait a few seconds and try again.' : 'Could not load this chapter.');
      const data = await res.json();
      return data.verses.map((v) => ({ n: v.verse, text: v.text.replace(/\s+/g, ' ').trim() }));
    },
  },
  quran: {
    title: "Qur'an",
    subtitle: 'القرآن الكريم',
    faith: 'Islam',
    sections: null,            // loaded from the API (114 surahs)
    sectionWord: 'Surah',
    credit: 'Arabic: Uthmani script. English: Marmaduke Pickthall (1930), public domain. Text served by alquran.cloud.',
    async loadSections() {
      const res = await fetch('https://api.alquran.cloud/v1/surah');
      const data = await res.json();
      return data.data.map((s) => ({ id: s.number, label: `${s.number}. ${s.englishName} (${s.englishNameTranslation})`, chapters: 1 }));
    },
    async load(section) {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${section}/editions/quran-uthmani,en.pickthall`);
      if (!res.ok) throw new Error('Could not load this surah.');
      const [arabic, english] = (await res.json()).data;
      return english.ayahs.map((a, i) => ({ n: a.numberInSurah, text: a.text, original: arabic.ayahs[i].text.replace(/^﻿/, ''), dir: 'rtl' }));
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
