import test from 'node:test';
import assert from 'node:assert';
import * as store from '../src/store.js';
import { PLANS, customPlan, planPercent, TERMS, PLACES, TIMELINE } from '../src/tools.js';
import { TANAKH, BIBLE } from '../src/books.js';
import { LEARN, PEOPLE, BELIEFS, PRACTICES, COMPARE_TABS } from '../src/learn.js';
import { TOPICS } from '../src/answers.js';
import { FACTS } from '../src/facts.js';

const mem = () => { const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) }; };

test('saved reading data is checked on load and survives a round trip', () => {
  const s = mem();
  assert.deepStrictEqual(store.load(s).bookmarks, []);
  let d = store.load(s);
  d = store.setLast(d, 'bible', 'John', 3, 5);
  d = store.toggleBookmark(d, 'bible', 'John', 3, 'John 3');
  d = store.toggleHighlight(d, 'bible|John|3', 16);
  d = store.setNote(d, 'bible|John|3', 'For God so loved the world');
  d = store.togglePlanItem(d, 'foundations', 2);
  store.save(d, s);
  const back = store.load(s);
  assert.deepStrictEqual(back.last.bible, { section: 'John', chapter: 3, at: 5 });
  assert.ok(store.isBookmarked(back, 'bible', 'John', 3));
  assert.deepStrictEqual(back.highlights['bible|John|3'], [16]);
  assert.deepStrictEqual(back.plans.foundations, [2]);
  const off = store.toggleHighlight(store.toggleBookmark(back, 'bible', 'John', 3), 'bible|John|3', 16);
  assert.ok(!store.isBookmarked(off, 'bible', 'John', 3));
  assert.strictEqual(off.highlights['bible|John|3'], undefined);
  assert.strictEqual(store.setNote(off, 'bible|John|3', '  ').notes['bible|John|3'], undefined);
  s.setItem('superbook-data', '{oops');
  assert.deepStrictEqual(store.load(s).theme, 'auto');
});

test('every reading in every plan is a real chapter', () => {
  const ok = ([k, s, c]) => (k === 'quran' ? Number.isInteger(s) && s >= 1 && s <= 114 && c === 1
    : (k === 'tanakh' ? TANAKH : BIBLE).some(([id, n]) => id === s && c >= 1 && c <= n));
  for (const p of PLANS) {
    assert.ok(p.readings.length > 0 && p.readings.every(ok), p.id);
    if (p.themes) assert.strictEqual(p.themes.length, p.readings.length, p.id);
  }
  assert.strictEqual(PLANS.find((p) => p.id === 'overview30').readings.length, 30);
  assert.strictEqual(PLANS.find((p) => p.id === 'deep90').readings.length, 90);
  const c = customPlan('bible', 'Mark', 16, 3);
  assert.strictEqual(c.readings.length, 16);
  assert.strictEqual(c.days.length, 6);
  assert.strictEqual(planPercent(c, [0, 1, 2, 3]), 25);
});

test('Learn sections, people and compare tabs point at real topics and facts', () => {
  const ids = new Set(TOPICS.map((x) => x.id));
  for (const id of [...LEARN.flatMap((s) => s.topics), ...PEOPLE, ...BELIEFS, ...PRACTICES]) assert.ok(ids.has(id), id);
  for (const tab of COMPARE_TABS) assert.ok(tab.rows.every((i) => FACTS[i]), tab.id);
  assert.ok(TERMS.length >= 25 && TERMS.every(([term, k, def]) => term && ['tanakh', 'bible', 'quran', 'all'].includes(k) && def.length > 20));
  assert.ok(PLACES.every(([n, lat, lon, by]) => n && Math.abs(lat) <= 90 && Math.abs(lon) <= 180 && Object.keys(by).length));
  assert.ok(TIMELINE.every(([label, y, text]) => label && Number.isFinite(y) && text));
});
