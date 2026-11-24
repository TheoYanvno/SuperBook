// What a reader keeps on this device: where they stopped in each scripture, bookmarks, highlighted verses,
// notes, reading plan progress, a custom plan and light/dark preference. Everything is in localStorage, read
// defensively (bad or missing data gives the defaults). Pure helpers take a storage so tests can use a fake.

const KEY = 'superbook-data';
const EMPTY = () => ({ last: {}, bookmarks: [], highlights: {}, notes: {}, plans: {}, custom: null, theme: 'auto' });

export function load(storage = globalThis.localStorage) {
  try {
    const raw = JSON.parse(storage?.getItem(KEY) || '{}') || {};
    const d = EMPTY();
    if (raw.last && typeof raw.last === 'object') d.last = raw.last;
    if (Array.isArray(raw.bookmarks)) d.bookmarks = raw.bookmarks.filter((b) => b && b.read && b.section != null);
    if (raw.highlights && typeof raw.highlights === 'object') d.highlights = raw.highlights;
    if (raw.notes && typeof raw.notes === 'object') d.notes = raw.notes;
    if (raw.plans && typeof raw.plans === 'object') d.plans = raw.plans;
    if (raw.custom && Array.isArray(raw.custom.items)) d.custom = raw.custom;
    if (['auto', 'light', 'dark'].includes(raw.theme)) d.theme = raw.theme;
    return d;
  } catch { return EMPTY(); }
}

export function save(data, storage = globalThis.localStorage) {
  try { storage?.setItem(KEY, JSON.stringify(data)); return true; } catch { return false; }
}

/** A chapter's key: "bible|Genesis|1". */
export const chapterKey = (read, section, chapter) => `${read}|${section}|${chapter}`;

export function setLast(data, read, section, chapter, at = Date.now()) {
  return { ...data, last: { ...data.last, [read]: { section, chapter, at } } };
}

export function toggleBookmark(data, read, section, chapter, label) {
  const k = chapterKey(read, section, chapter);
  const has = data.bookmarks.some((b) => chapterKey(b.read, b.section, b.chapter) === k);
  return { ...data, bookmarks: has ? data.bookmarks.filter((b) => chapterKey(b.read, b.section, b.chapter) !== k) : [{ read, section, chapter, label, at: Date.now() }, ...data.bookmarks] };
}
export const isBookmarked = (data, read, section, chapter) => data.bookmarks.some((b) => chapterKey(b.read, b.section, b.chapter) === chapterKey(read, section, chapter));

/** Highlight or un-highlight one verse of a chapter. */
export function toggleHighlight(data, key, verse) {
  const now = new Set(data.highlights[key] || []);
  if (now.has(verse)) now.delete(verse); else now.add(verse);
  const highlights = { ...data.highlights };
  if (now.size) highlights[key] = [...now].sort((a, b) => a - b); else delete highlights[key];
  return { ...data, highlights };
}

export function setNote(data, key, text) {
  const notes = { ...data.notes };
  const clean = String(text ?? '').slice(0, 4000);
  if (clean.trim()) notes[key] = clean; else delete notes[key];
  return { ...data, notes };
}

/** Mark a reading of a plan done or not. */
export function togglePlanItem(data, planId, index) {
  const done = new Set(data.plans[planId] || []);
  if (done.has(index)) done.delete(index); else done.add(index);
  return { ...data, plans: { ...data.plans, [planId]: [...done].sort((a, b) => a - b) } };
}
