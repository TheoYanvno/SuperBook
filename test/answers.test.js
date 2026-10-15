import test from 'node:test';
import assert from 'node:assert';
import { answer, TOPICS } from '../src/answers.js';
import { BIBLE, TANAKH } from '../src/books.js';

test('matches questions to topics', () => {
  assert.strictEqual(answer('How do they see Jesus?').id, 'jesus');
  assert.strictEqual(answer('Is Jesus the son of God?').id, 'jesus');
  assert.strictEqual(answer('What is the Trinity?').id, 'god');
  assert.strictEqual(answer('how many chapters are in each book').id, 'structure');
  assert.strictEqual(answer('What language was the Quran written in?').id, 'language');
  assert.strictEqual(answer('what do they say about heaven and hell').id, 'afterlife');
  assert.strictEqual(answer('Can Muslims eat pork?').id, 'food');
  assert.strictEqual(answer("What's the difference between the books?").id, 'differences');
  assert.strictEqual(answer('Tell me about the three books').id, 'overview');
});

test('answers questions about age, authors, region and more', () => {
  const cases = {
    'How old is each book?': 'age',
    'When was the New Testament written?': 'age',
    'Who wrote the Bible?': 'contributors',
    'Who compiled the Quran?': 'contributors',
    'Where were they written?': 'region',
    'What is the difference between Meccan and Medinan surahs?': 'region',
    'Was the New Testament written in Greek?': 'language',
    'What are the Dead Sea Scrolls?': 'manuscripts',
    'What is the Quran about?': 'themes',
    'Is Noah in all three?': 'creation',
    'What is the difference between Sunni and Shia?': 'followers',
    'How is the Torah read in synagogue?': 'reading',
    'What is the golden rule?': 'ethics',
    'What does Quran mean?': 'names',
    'What is the Old Testament?': 'structure',
  };
  for (const [question, id] of Object.entries(cases)) assert.strictEqual(answer(question).id, id, question);
});

test('a general word does not outweigh a specific one', () => {
  // "difference" is weak, "Medinan" is specific
  assert.strictEqual(answer('difference between Meccan and Medinan').id, 'region');
  // several weak words still count as one point, so "when" (2 points) wins
  assert.strictEqual(answer('when was the new testament written').id, 'age');
});

test('unknown questions get a helpful fallback', () => {
  assert.strictEqual(answer('what is the capital of France').id, 'unknown');
  assert.strictEqual(answer('').id, 'unknown');
});

test('every topic covers the faiths fairly', () => {
  for (const t of TOPICS) assert.ok(t.answer.length >= 2, `${t.id} needs at least two parts`);
  const ids = TOPICS.map((t) => t.id);
  assert.strictEqual(new Set(ids).size, ids.length, 'topic ids are unique');
});

test('book tables have the expected size', () => {
  assert.strictEqual(BIBLE.length, 66);
  assert.strictEqual(BIBLE.reduce((n, [, c]) => n + c, 0), 1189);
  assert.strictEqual(TANAKH.length, 39);   // 39 books as Sefaria lists them = the traditional 24
});
