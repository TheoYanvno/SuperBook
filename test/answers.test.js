import test from 'node:test';
import assert from 'node:assert';
import { answer, findBooks, findPassage, stem, normalize, TOPICS, BOOKS } from '../src/answers.js';
import { PASSAGES } from '../src/passages.js';
import { FACTS } from '../src/facts.js';
import { BIBLE, TANAKH, ORTHODOX_EXTRA, BOOKS as LIBRARY } from '../src/books.js';
import { findChapter, questionType } from '../src/study.js';
import { CHAPTERS, QUESTIONS, FIT, GUIDANCE } from '../src/studydata.js';

// [question, expected topic, expected books (default: all three)]
const CASES = [
// [question, topic, books?]
['How old is each book?','age'],['Which book is the oldest?','age'],['When was the Quran written?','age','quran'],['When was the New Testament written?','age','bible'],
['How are they different?','differences'],["What's the difference between the books?",'differences'],['Compare the Bible and the Quran','differences','bible,quran'],
['What is the difference between Judaism and Islam?','differences','tanakh,quran'],['Bible vs Torah','differences','tanakh,bible'],
['What language was the Koran written in?','language','quran'],['Was the New Testament written in Greek?','language','bible'],['What is the Septuagint?','language'],
['Who wrote the Bible?','contributors','bible'],['Who wrote the Torah?','contributors','tanakh'],['Who compiled the Quran?','contributors','quran'],
['Where were they written?','region'],['What is the difference between Meccan and Medinan surahs?','region'],
['What are the Dead Sea Scrolls?','manuscripts'],['Has the Quran been changed?','manuscripts','quran'],
['What is the Quran about?','themes','quran'],['What is the main message of the Bible?','themes','bible'],
['How was the world created?','creation'],['Who were Adam and Eve?','creation'],['Is Noah in all three?','noah'],['Tell me about the flood','noah'],
['How many Muslims are there?','followers','quran'],['What is the difference between Sunni and Shia?','followers'],['Which religion is the largest?','followers'],
['How is the Torah read?','reading','tanakh'],['How do Muslims recite the Quran?','reading','quran'],
['What is the golden rule?','ethics'],['What does Quran mean?','names','quran'],['Why is it called the Tanakh?','names','tanakh'],
['How do the Bible and the Quran see Jesus?','jesus','bible,quran'],['What does the Quran say about Jesus?','jesus','quran'],['Did Jesus die on the cross?','jesus'],
['What is the Trinity?','god'],['Do they worship the same God?','god'],['What are the 99 names of Allah?','godnames'],
['What is the Holy Spirit?','spirit'],['Who was Muhammad?','muhammad'],['Do Christians believe Mohammed was a prophet?','muhammad','bible'],
['How many prophets are there?','prophets'],['Who was Abraham?','abraham'],['Which son did Abraham sacrifice?','sacrifice'],['Who was Moses?','moses'],
['Tell me about Joseph and his brothers','joseph'],['Who was King David?','david'],['Jonah and the whale','jonah'],['Who was John the Baptist?','john'],
['What does Islam say about Mary?','mary','quran'],['Which women are in the Bible?','women','bible'],['Who is Satan?','satan'],['Do they believe in angels?','angels'],['What are jinn?','angels'],
['What miracles did Jesus do?','miracles'],['Who is the Messiah?','messiah'],['What happens at the end of the world?','judgment'],['What happens after we die?','afterlife'],
['Is there a heaven and hell?','afterlife'],['How do you get saved?','salvation'],['What is original sin?','salvation'],['How do you repent?','repentance'],
['Do we have free will?','freewill'],['Why do good people suffer?','suffering'],['Why are Jews the chosen people?','covenant','tanakh'],
['What do they say about war?','peace'],['What is jihad?','peace'],['How do they view other religions?','interfaith'],
['What are the Five Pillars?','law'],['What is Sharia?','law'],['What are the Ten Commandments?','commandments'],['How many times a day do Muslims pray?','worship','quran'],
['What is a rabbi?','houses'],['Who leads prayers in a mosque?','houses'],['What holidays do they celebrate?','holidays'],['What is Passover?','holidays'],
['What day is the Sabbath?','sabbath'],['Why do Christians go to church on Sunday?','sabbath','bible'],['When is Ramadan?','fasting'],['Do Christians fast?','fasting','bible'],
['What is zakat?','charity'],['What is the Hajj?','pilgrimage'],['Why is Jerusalem important?','places'],['Where is the holiest place?','places'],
['Can Muslims eat pork?','food','quran'],['Can Christians drink alcohol?','food','bible'],['Is kosher the same as halal?','food'],['Can Muslims charge interest?','money','quran'],
['What do they say about marriage?','marriage'],['Is divorce allowed?','marriage'],['What happens at a Jewish funeral?','death','tanakh'],['Can Muslims be cremated?','death','quran'],
['Why are Jewish boys circumcised?','circumcision','tanakh'],['What is baptism?','circumcision'],['How do I become a Muslim?','conversion','quran'],['Can you convert to Judaism?','conversion','tanakh'],
['Why do Muslim women wear hijab?','dress','quran'],['Why do Jews wear a kippah?','dress','tanakh'],['Why are there no pictures in mosques?','art'],['What calendar do they use?','calendar'],
['How do they say hello?','greetings'],['What does shalom mean?','greetings'],['What is the Talmud?','oral','tanakh'],['What is a hadith?','oral'],['What is tafsir?','interpretation'],
['What is the longest chapter?','extremes'],['What is the shortest surah?','extremes'],['What are the first words of the Bible?','firstlast','bible'],['What is the most famous verse?','famous'],
['Why does the Catholic Bible have more books?','canon','bible'],['How many chapters does each have?','structure'],['What is the Old Testament?','profile','bible'],['How many verses are in the Quran?','structure','quran'],
['Tell me about the Torah','profile','tanakh'],['What is Islam?','profile','quran'],['Tell me about Judaism and Christianity','differences','tanakh,bible'],['Tell me about the three books','overview'],
['Is the Bible the word of God?','revelation','bible'],['How was the Quran revealed?','revelation','quran'],
['What books were removed from the Bible that are in the Torah?','canondiff','tanakh,bible'],['Why does the Tanakh have 24 books and the Old Testament 39?','canondiff','tanakh,bible'],
['Are the five books of Moses in the Bible?','canondiff','bible'],['What is the Injil?','canondiff'],
['What are the changes from the Bible and Quran stories?','storydiff','bible,quran'],['How do the stories differ between the books?','storydiff'],['Does the Quran retell Bible stories?','storydiff','bible,quran'],
['What is the historical context of the passages?','context'],['What was the historical background of the Quran?','context','quran'],
['what is the capital of France','unknown'],['',"unknown"],
]

test('routes 120+ sample questions to the right topic and books', () => {
  for (const [question, id, books] of CASES) {
    const a = answer(question);
    assert.strictEqual(a.id, id, question);
    if (id !== 'unknown') assert.deepStrictEqual(a.books, books ? books.split(',') : BOOKS, question);
  }
});

test('answers only the books a question names', () => {
  const one = answer("What does the Qur'an say about Jesus?");
  assert.deepStrictEqual(one.books, ['quran']);
  assert.ok(one.answer[0].startsWith('Islam:'));
  const two = answer('How do Jews and Christians see Jesus?');
  assert.deepStrictEqual(two.books, ['tanakh', 'bible']);
  assert.match(two.title, /Judaism vs Christianity/);
});

test('finds books by many names', () => {
  assert.deepStrictEqual(findBooks('What does the Koran say?'), ['quran']);
  assert.deepStrictEqual(findBooks('the Hebrew Bible'), ['tanakh']);     // not the Christian Bible
  assert.deepStrictEqual(findBooks('Torah, Gospels and Islam'), ['tanakh', 'bible', 'quran']);
  assert.deepStrictEqual(findBooks('Who was Moses?'), []);
});

test('matches plurals, verb forms and other spellings', () => {
  assert.strictEqual(stem('prophets'), stem('prophet'));
  assert.strictEqual(stem('praying'), stem('pray'));
  assert.strictEqual(stem('miracles'), stem('miracle'));
  assert.strictEqual(stem('cremated'), stem('cremate'));
  assert.strictEqual(normalize("Mohammed's Qur'an"), ' muhammads quran ');
  assert.strictEqual(answer('What did the prophet Mohammed teach?').id, 'muhammad');
});

test('a general word does not outweigh a specific one', () => {
  assert.strictEqual(answer('difference between Meccan and Medinan').id, 'region');
  assert.strictEqual(answer('When is Ramadan?').id, 'fasting');
});

test('every topic answers for all three books, with unique ids', () => {
  const ids = TOPICS.map((t) => t.id);
  assert.strictEqual(new Set(ids).size, ids.length);
  assert.ok(TOPICS.length >= 70);
  for (const t of TOPICS) {
    for (const book of BOOKS) assert.ok(t[book] && t[book].length > 20, `${t.id} is missing ${book}`);
    assert.ok(['book', 'faith'].includes(t.kind), t.id);
  }
});

test('comparison table has a value for every book', () => {
  for (const row of FACTS) for (const book of BOOKS) assert.ok(row[book], `${row.label} ${book}`);
});

test('book tables have the expected size', () => {
  // Eastern Orthodox Bible: 48 of its 49 Old Testament books (no Letter of Jeremiah on bible-api.com),
  // plus the Prayer of Manasseh, Susanna, Bel and the Dragon and 4 Maccabees as their own entries, and 27 NT books
  assert.strictEqual(BIBLE.length, 79);
  assert.strictEqual(BIBLE.slice(-27)[0][0], 'Matthew');
  for (const id of ORTHODOX_EXTRA) assert.ok(BIBLE.some(([b]) => b === id), id);
  const ids = BIBLE.map(([id]) => id);
  assert.strictEqual(new Set(ids).size, ids.length);
  assert.deepStrictEqual(LIBRARY.bible.sections.find((s) => s.id === '1 Kings'), { id: '1 Kings', label: '3 Kingdoms (1 Kings)', chapters: 22 });
  assert.deepStrictEqual(LIBRARY.bible.sections.find((s) => s.id === 'sus'), { id: 'sus', label: 'Susanna', chapters: 1 });
  assert.ok(ids.indexOf('Tobit') < ids.indexOf('Psalms') && ids.indexOf('Malachi') < ids.indexOf('Isaiah'));   // Orthodox order
  assert.strictEqual(TANAKH.length, 39);   // 39 books as Sefaria lists them = the traditional 24
});

test('ambience uses the D Hijaz scale and correct pitches', async () => {
  const { frequency, scaleNote, HIJAZ, PROGRESSION } = await import('../src/music.js');
  assert.strictEqual(frequency(69), 440);
  assert.strictEqual(Math.round(frequency(50) * 100) / 100, 146.83);     // D3
  assert.deepStrictEqual([0, 1, 2, 3, 4, 5, 6, 7].map((n) => scaleNote(n) - 50), [0, 1, 4, 5, 7, 8, 10, 12]);
  assert.strictEqual(HIJAZ.length, 7);
  for (const chord of PROGRESSION) assert.ok(chord.every((d) => Number.isInteger(d)));
});

test('gives the historical context of a named passage', () => {
  const cases = [
    ['What is the historical context of Psalm 137?', 'Psalm 137'],
    ['What was happening when John 3:16 was written?', 'John 3:16'],
    ['Explain the context of Quran 9:5', 'Surah 9 (At-Tawbah), including 9:5'],
    ['Why was Surah 96 revealed?', 'Surah 96 (Al-Alaq), verses 1–5'],
    ['What does 1 Corinthians 13 mean?', '1 Corinthians 13'],
    ['What is the background of the rivers of Babylon?', 'Psalm 137'],
    ['Who is the suffering servant in Isaiah 53?', 'Isaiah 53'],
  ];
  for (const [question, ref] of cases) {
    const a = answer(question);
    assert.strictEqual(a.id, 'passage', question);
    assert.ok(a.title.endsWith(ref), `${question} → ${a.title}`);
    assert.ok(a.answer.length >= 3);
  }
});

test('named passages without a reference number only count when the question asks about them', () => {
  assert.strictEqual(findPassage('What is the context of the suffering servant?').ref, 'Isaiah 53');
  assert.strictEqual(findPassage('suffering servant'), null);
  assert.strictEqual(answer('What does the Quran say about Mary?').id, 'mary');
});

test('every passage is complete', () => {
  for (const p of PASSAGES) {
    assert.ok(p.ref && BOOKS.includes(p.book) && p.match.length && p.context.length >= 3, p.ref);
  }
});

test('study guide covers 100 chapters from each scripture, with a fitting answer for every question', () => {
  assert.deepStrictEqual([CHAPTERS.bible.length, CHAPTERS.tanakh.length, CHAPTERS.quran.length], [100, 100, 100]);
  assert.deepStrictEqual(CHAPTERS.quran.map(([n]) => n), Array.from({ length: 100 }, (_, i) => i + 1));
  for (const book of ['bible', 'tanakh', 'quran']) {
    assert.strictEqual(QUESTIONS[book].length, 10);
    assert.ok(FIT[book].every((g) => g.length && g.every((i) => GUIDANCE[i])), book);
  }
  // Questions are routed to the guidance that answers them, not just the one in the same position
  assert.deepStrictEqual(FIT.quran[1], [2]);      // God's attributes → how the passage portrays divine action
  assert.deepStrictEqual(FIT.tanakh[4], [1]);     // family, leadership, community → the people in the passage
});

test('answers study questions about a named chapter or surah', () => {
  const cases = [
    // [question, title, first words of the answer, link]
    ['What ethical choices arise in Genesis 12?', 'Genesis 12 · how to study it', 'Identify a concrete choice', 'biblegateway.com/passage/?search=Genesis%2012&version=WEB'],
    ['Who are the key people in Exodus 3 in the Torah?', 'Exodus 3 (Torah) · how to study it', 'Name the people', 'sefaria.org/Exodus.3'],
    ['What are the main themes of Surah Al-Mulk?', 'Surah 67 (Al-Mulk) · how to study it', 'Identify the main', 'quran.com/67'],
    ['How does surah baqarah describe God?', 'Surah 2 (Al-Baqarah) · how to study it', 'Examine how Surah 2', 'quran.com/2'],
    ['What Hebrew words stand out in Leviticus 19?', 'Leviticus 19 (Torah) · how to study it', 'Look for repeated terms', 'sefaria.org/Leviticus.19'],
    ['How does 1 Corinthians 13 connect with other passages?', '1 Corinthians 13 · how to study it', 'Compare the major themes', '1%20Corinthians%2013'],
    ['chapter 12 of genesis', 'Genesis 12 · how to study it', 'Identify the main', 'Genesis%2012'],
    ['What tafsir helps with surah 18?', 'Surah 18 (Al-Kahf) · how to study it', 'Read Surah 18', 'quran.com/18'],
  ];
  for (const [question, title, start, link] of cases) {
    const a = answer(question);
    assert.strictEqual(a.id, 'study', question);
    assert.strictEqual(a.title, title, question);
    assert.ok(a.answer[0].startsWith(start), `${question}: ${a.answer[0]}`);
    assert.ok(a.source.url.includes(link), a.source.url);
    assert.ok(a.answer.some((p) => p.startsWith('More questions to explore:')));
  }
});

test('study guide stays out of the way of other answers', () => {
  assert.strictEqual(findChapter('What is in 1 John 1?'), null);         // not read as John 1
  assert.strictEqual(findChapter('How old is the Bible?'), null);
  assert.strictEqual(findChapter('Genesis 2'), null);                    // not one of the workbook's chapters
  assert.strictEqual(findChapter('Genesis 6').book, 'tanakh');           // only in the Torah part
  assert.strictEqual(findChapter('Genesis 1').book, 'bible');            // in both: Bible unless the question is Jewish
  assert.strictEqual(findChapter('Genesis 1 in Jewish tradition').book, 'tanakh');
  assert.strictEqual(answer('What does 1 Corinthians 13 mean?').id, 'passage');      // curated historical context wins
  assert.strictEqual(answer('What is the historical context of Psalm 137?').id, 'passage');
  assert.strictEqual(questionType('Who are the people in it?').type, 1);
  assert.strictEqual(findChapter('Who was Muhammad?'), null);              // a person, not Surah 47
  assert.strictEqual(findChapter('What are the themes of Surah Yusuf?').ref, 'Surah 12 (Yusuf)');
});
