// Links that open the reader at one chapter, so other projects can say "Read this in SuperBook":
//   ?book=Psalms&chapter=23                 the Bible (the default)
//   ?read=tanakh&book=Genesis&chapter=1     the Tanakh
//   ?read=quran&book=36                     the Quran, by surah number
// A Bible book can be named by its id (1 Samuel), its label (1 Kingdoms (1 Samuel)) or either name in the
// label (1 Kingdoms). Bad or missing parts fall back: chapter 1, the first book, or no link at all.
import { BIBLE, TANAKH } from './books.js';

const norm = (s) => String(s ?? '').replace(/\s+/g, ' ').trim().toLowerCase();

function names([id, , label = id]) {
  const out = [id, label];
  const m = label.match(/^(.*) \((.*)\)$/);
  if (m) out.push(m[1], m[2]);
  return out.map(norm);
}

const ALSO = { psalm: 'Psalms', 'song of songs': 'Song of Solomon', 'wisdom of solomon': 'Wisdom', susanna: 'sus', revelations: 'Revelation' };

export function findSection(read, book) {
  const want = norm(book);
  if (!want) return null;
  if (read === 'quran') { const n = Number(want); return Number.isInteger(n) && n >= 1 && n <= 114 ? [n, 1] : null; }
  const list = read === 'tanakh' ? TANAKH : BIBLE;
  const hit = list.find((b) => names(b).includes(want)) ?? (read === 'bible' && ALSO[want] ? list.find(([id]) => id === ALSO[want]) : null);
  return hit ? [hit[0], hit[1]] : null;
}

/** { read, section, chapter } for a link like "?book=Psalms&chapter=23", or null when it names nothing. */
export function parseLink(search) {
  const q = new URLSearchParams(search);
  const read = ['bible', 'tanakh', 'quran'].includes(q.get('read')) ? q.get('read') : 'bible';
  if (!q.has('book') && !q.has('read')) return null;
  const found = findSection(read, q.get('book'));
  if (!found) return { read, section: null, chapter: 1 };
  const [section, chapters] = found;
  const n = Number(q.get('chapter'));
  const chapter = read === 'quran' ? 1 : Number.isInteger(n) && n >= 1 && n <= chapters ? n : 1;
  return { read, section, chapter };
}

/** The link back to a chapter, for sharing or for another project to build. */
export function linkFor(read, section, chapter, base = '') {
  const q = new URLSearchParams();
  if (read !== 'bible') q.set('read', read);
  q.set('book', String(section));
  if (read !== 'quran') q.set('chapter', String(chapter));
  return `${base}?${q}`;
}
