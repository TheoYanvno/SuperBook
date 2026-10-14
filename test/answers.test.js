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
  assert.strictEqual(answer("What's the difference between the books?").id, 'overview');
});

test('unknown questions get a helpful fallback', () => {
  assert.strictEqual(answer('what is the capital of France').id, 'unknown');
  assert.strictEqual(answer('').id, 'unknown');
});

test('every topic covers the faiths fairly', () => {
  for (const t of TOPICS) assert.ok(t.answer.length >= 2, `${t.id} needs at least two parts`);
});

test('book tables have the expected size', () => {
  assert.strictEqual(BIBLE.length, 66);
  assert.strictEqual(BIBLE.reduce((n, [, c]) => n + c, 0), 1189);
  assert.strictEqual(TANAKH.length, 39);   // 39 books as Sefaria lists them = the traditional 24
});
