// Text matching shared by the answers and the study guide, in any of the app's languages.
import { fold, languagePack } from './i18n.js';

const SPELLINGS = [
  [/qur['’ʾ]?an|koran|coran/g, 'quran'],
  [/mohammed|mohammad|muhammed|mohamed/g, 'muhammad'],
  [/judgement/g, 'judgment'],
  [/neighbour/g, 'neighbor'],
  [/['’ʾʿ]/g, ''],                      // what's → whats
];

export function normalize(text) {
  let s = fold(text);
  for (const [pattern, replacement] of SPELLINGS) s = s.replace(pattern, replacement);
  return ` ${s.replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim()} `;
}

// ---------- Book names in the current language ----------

let aliasCache = { pack: undefined, list: [] };
/** [localName, english] pairs for the current language, longest first. */
function aliases() {
  const pack = languagePack();
  if (aliasCache.pack === pack) return aliasCache.list;
  const list = [];
  if (pack) {
    for (const [english, local] of Object.entries(pack.books ?? {})) list.push([local.replace(/\s*\(.*\)$/, ''), english]);
    for (const [local, english] of Object.entries(pack.aliases ?? {})) list.push([local, english]);
  }
  const prepared = list
    .map(([local, english]) => [normalize(local).trim(), normalize(english).trim()])
    .filter(([local, english]) => local && local !== english)
    .sort((a, b) => b[0].length - a[0].length);
  aliasCache = { pack, list: prepared };
  return prepared;
}

/**
 * Hebrew and Arabic attach small words to the front of the next word ("בבראשית" = "in Genesis",
 * "والصلاة" = "and the prayer"). prefixes() lists the ones the current language strips when matching.
 */
const prefixes = () => languagePack()?.prefixes ?? [];

/** The word, plus the word without each prefix it starts with: "בבראשית" → ["בבראשית", "בראשית"]. */
export function wordForms(word) {
  const forms = [word];
  for (const p of prefixes()) if (word.startsWith(p) && word.length > p.length + 1) forms.push(word.slice(p.length));
  return forms;
}

/** Normalized question with the current language's book names replaced by English ones. */
export function localize(question) {
  let q = normalize(question);
  // "سورة الملك" → "surah 67": surah names in the language, only when the word for surah comes first
  const pack = languagePack();
  if (pack?.surahNames) {
    for (const word of pack.surahWords ?? []) {
      for (const [n, name] of Object.entries(pack.surahNames)) {
        const local = ` ${normalize(word).trim()} ${normalize(name).trim()} `;
        if (q.includes(local)) q = q.split(local).join(` surah ${n} `);
      }
    }
  }
  if (prefixes().length) {
    // Split known prefixes off words that are book names, so "בבראשית 12" reads as "בראשית 12"
    const starts = new Set(aliases().map(([local]) => local.split(' ')[0]));
    q = ` ${q.trim().split(' ').map((w) => (starts.has(w) ? w : wordForms(w).find((f) => starts.has(f)) ?? w)).join(' ')} `;
  }
  for (const [local, english] of aliases()) {
    if (q.includes(` ${local} `)) q = q.split(` ${local} `).join(` ${english} `);
  }
  return q;
}

// Words in the current language match as word beginnings, so "cristian" finds "cristianos" and "cristianismo".
// A keyword starting with "=" must match a whole word ("=حج" is Hajj, not the start of حجاب, hijab).
export const startsWords = (q, phrase) => {
  const exact = phrase.startsWith('=');
  const words = q.trim().split(' ');
  const parts = normalize(exact ? phrase.slice(1) : phrase).trim().split(' ');
  if (!parts[0]) return false;
  const fits = (word, part) => wordForms(word).some((w) => (exact ? w === part : w.startsWith(part)));
  for (let i = 0; i + parts.length <= words.length; i++) {
    if (parts.every((p, j) => fits(words[i + j], p))) return true;
  }
  return false;
};

