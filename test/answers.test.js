import test from 'node:test';
import assert from 'node:assert';
import { answer, findBooks, stem, normalize, TOPICS, BOOKS } from '../src/answers.js';
import { FACTS } from '../src/facts.js';
import { BIBLE, TANAKH } from '../src/books.js';

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
  assert.strictEqual(BIBLE.length, 66);
  assert.strictEqual(BIBLE.reduce((n, [, c]) => n + c, 0), 1189);
  assert.strictEqual(TANAKH.length, 39);   // 39 books as Sefaria lists them = the traditional 24
});
