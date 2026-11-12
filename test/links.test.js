import test from 'node:test';
import assert from 'node:assert';
import { parseLink, linkFor, findSection } from '../src/links.js';

test('a Bible link opens that book and chapter, by any of its names', () => {
  assert.deepStrictEqual(parseLink('?book=Psalms&chapter=23'), { read: 'bible', section: 'Psalms', chapter: 23 });
  assert.deepStrictEqual(parseLink('?book=1%20Kingdoms&chapter=3'), { read: 'bible', section: '1 Samuel', chapter: 3 });
  assert.deepStrictEqual(parseLink('?book=1+samuel&chapter=3').section, '1 Samuel');
  assert.deepStrictEqual(parseLink('?book=Wisdom of Solomon&chapter=7').section, 'Wisdom');
  assert.deepStrictEqual(parseLink('?book=Susanna').section, 'sus');
  assert.deepStrictEqual(parseLink('?book=Tobit&chapter=13'), { read: 'bible', section: 'Tobit', chapter: 13 });
});

test('bad parts fall back instead of breaking the page', () => {
  assert.strictEqual(parseLink(''), null);
  assert.strictEqual(parseLink('?lang=fr'), null);
  assert.deepStrictEqual(parseLink('?book=Genesis&chapter=99'), { read: 'bible', section: 'Genesis', chapter: 1 });
  assert.deepStrictEqual(parseLink('?book=Genesis&chapter=two'), { read: 'bible', section: 'Genesis', chapter: 1 });
  assert.deepStrictEqual(parseLink('?book=Hezekiah&chapter=1'), { read: 'bible', section: null, chapter: 1 });
  assert.deepStrictEqual(parseLink('?read=nope&book=John&chapter=3'), { read: 'bible', section: 'John', chapter: 3 });
});

test('Tanakh and Quran links', () => {
  assert.deepStrictEqual(parseLink('?read=tanakh&book=I Samuel&chapter=2'), { read: 'tanakh', section: 'I Samuel', chapter: 2 });
  assert.deepStrictEqual(parseLink('?read=quran&book=36'), { read: 'quran', section: 36, chapter: 1 });
  assert.strictEqual(findSection('quran', '115'), null);
});

test('links round-trip', () => {
  assert.strictEqual(linkFor('bible', '1 Samuel', 3), '?book=1+Samuel&chapter=3');
  assert.deepStrictEqual(parseLink(linkFor('bible', 'Song of Solomon', 2)), { read: 'bible', section: 'Song of Solomon', chapter: 2 });
  assert.deepStrictEqual(parseLink(linkFor('quran', 2, 1)), { read: 'quran', section: 2, chapter: 1 });
  assert.deepStrictEqual(parseLink(linkFor('tanakh', 'Psalms', 23)), { read: 'tanakh', section: 'Psalms', chapter: 23 });
});
