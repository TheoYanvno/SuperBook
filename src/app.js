// SuperBook: read the Tanakh, the Bible and the Qur'an, compare them, learn and study. Pages are hash links
// (#home, #read/bible, #reader/bible/Genesis/1, #compare/beliefs, #learn/origins, #topic/jesus, #tools/terms,
// #plans/foundations, #languages, #favorites, #ask/<question>) so the back button and shared links work.
import { BOOKS, TANAKH, BIBLE } from './books.js';
import { answer, compose, TOPICS } from './answers.js';
import { SandWriter } from './sand.js';
import { DesertAmbience } from './music.js';
import { FACTS } from './facts.js';
import { PASSAGES } from './passages.js';
import { CHAPTERS as STUDY_CHAPTERS } from './studydata.js';
import { LANGS, UI, setLanguage, t, tr, lang, langInfo } from './i18n.js';
import { parseLink } from './links.js';
import { MORE_UI } from './ui-text.js';
import { LEARN, PEOPLE, BELIEFS, PRACTICES, COMPARE_TABS } from './learn.js';
import { TERMS, PLACES, TIMELINE, PLANS, customPlan, planPercent } from './tools.js';
import * as store from './store.js';

Object.assign(UI, MORE_UI);
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const icon = (name, cls = '') => `<svg class="${cls}" aria-hidden="true"><use href="#${name}"/></svg>`;
const sym = (key) => `<svg class="emblem" aria-hidden="true"><use href="#s-${key}"/></svg>`;
const KEYS = ['tanakh', 'bible', 'quran'];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let data = store.load();
const keep = (next) => { data = next; store.save(data); };

// ---------- navigation ----------
const SIDE = [['home', 'i-home', 'nav.home'], ['read', 'i-book', 'nav.read'], ['compare', 'i-scales', 'nav.compare'], ['learn', 'i-cap', 'nav.learn'],
  ['tools/places', 'i-map', 'nav.maps'], ['people', 'i-people', 'nav.people'], ['practices', 'i-temple', 'nav.practices'],
  ['languages', 'i-globe', 'nav.languages'], ['plans', 'i-calendar', 'nav.plans'], ['favorites', 'i-bookmark', 'nav.favorites']];
const BOTTOM = [['home', 'i-home', 'tab.home'], ['read', 'i-book', 'tab.read'], ['learn', 'i-learn', 'tab.learn'], ['tools', 'i-tools', 'tab.tools'], ['favorites', 'i-user', 'tab.profile']];
const FLAGS = { en: '🇺🇸', es: '🇪🇸', fr: '🇫🇷', de: '🇩🇪', he: '🇮🇱', ar: '🇸🇦', el: '🇬🇷', la: 'SPQR' };
const flag = (code) => (code === 'la' ? '<span class="flag spqr">SPQR</span>' : `<span class="flag" aria-hidden="true">${FLAGS[code]}</span>`);
const langLabel = (l) => `${l.name} (${l.code.toUpperCase()})`;

function navs(route) {
  const top = route.split('/')[0];
  const sideActive = { reader: 'read', topic: 'learn', ask: 'home' }[top] ?? (route.startsWith('tools/places') || route.startsWith('tools/timeline') ? 'tools/places' : top === 'tools' ? 'learn' : top);
  $('sideNav').innerHTML = SIDE.map(([to, ic, key]) => `<a href="#${to}"${to === sideActive ? ' aria-current="page"' : ''}>${icon(ic)}<span>${esc(t(key))}</span></a>`).join('');
  const bottomActive = { reader: 'read', compare: 'learn', topic: 'learn', people: 'learn', practices: 'learn', plans: 'tools', languages: 'favorites', ask: 'home' }[top] ?? top;
  $('bottomNav').innerHTML = BOTTOM.map(([to, ic, key]) => `<a href="#${to}"${to === bottomActive ? ' aria-current="page"' : ''}>${icon(ic)}<span>${esc(t(key))}</span></a>`).join('');
}

function daily() {
  const day = Math.floor(Date.now() / 86400000);
  const p = PASSAGES[day % PASSAGES.length];
  const ref = tr('passages', p.ref, 'ref', p.ref);
  $('daily').href = `#ask/${encodeURIComponent(`historical context of ${p.match[0]}`)}`;
  $('daily').innerHTML = `${icon('i-book')}<b>${esc(t('dailyTitle'))}</b><small>${esc(t('dailyText', { ref }))}</small>`;
}

function langMenu() {
  $('langName').textContent = langLabel(langInfo());
  $('langList').innerHTML = LANGS.map((l) => `<li><button role="option" aria-selected="${l.code === lang()}" data-lang="${l.code}" lang="${l.code}">${flag(l.code)}<span>${esc(langLabel(l))}</span>${l.code === lang() ? '<span class="check">✓</span>' : ''}</button></li>`).join('');
}

async function pickLanguage(code) {
  await setLanguage(code);
  try { localStorage.setItem('superbook-lang', lang()); } catch { /* blocked */ }
  const { dir } = langInfo();
  document.documentElement.lang = lang();
  document.documentElement.dir = dir;
  staticText();
  langMenu();
  route();
}

function staticText() {
  document.title = t('pageTitle');
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel)));
  daily();
}

// ---------- helpers for scriptures ----------
const sectionsOf = async (key) => { const b = BOOKS[key]; if (!b.sections) b.sections = await b.loadSections(); return b.sections; };
const findSec = (key, id) => BOOKS[key].sections?.find((s) => String(s.id) === String(id));
function refLabel(key, section, chapter) {
  const s = findSec(key, section);
  if (key === 'quran') return s ? BOOKS.quran.label(s) : t('surahRef', { n: section, name: '' }).replace(' ()', '');
  return `${s ? BOOKS[key].label(s) : section} ${chapter}`;
}
const readerHref = (key, section, chapter = 1) => `#reader/${key}/${encodeURIComponent(section)}/${chapter}`;
/** How far through a scripture a chapter is, 0 to 100. */
function percentThrough(key, section, chapter) {
  const list = key === 'tanakh' ? TANAKH.map(([id, n]) => [id, n]) : key === 'bible' ? BIBLE.map(([id, n]) => [id, n]) : Array.from({ length: 114 }, (_, i) => [i + 1, 1]);
  const total = list.reduce((a, [, n]) => a + n, 0);
  let before = 0;
  for (const [id, n] of list) { if (String(id) === String(section)) return Math.round(((before + chapter) / total) * 100); before += n; }
  return 0;
}

// ---------- pages ----------
const PAGES = {
  home, read, reader, compare, learn, topic, people, practices, tools, plans, languages, favorites, ask,
};

function setTitle(text) { $('pageTitle').textContent = text; document.title = `${text} · SuperBook`; }

function home() {
  setTitle('SuperBook');
  const cards = KEYS.map((k) => `
    <a class="scripture ${k}" href="#read/${k}">
      ${sym(k)}
      <h3>${esc(t(`short.${k}`))}</h3>
      <p>${esc(t(`card.${k}`))}<br>${esc(t(`cardSub.${k}`))}</p>
      <span class="btn gold">${esc(t(`read.${k}`))} ${icon('i-right')}</span>
    </a>`).join('');
  const tiles = [['compare', 'i-scales', 'compare'], ['learn/origins', 'i-scroll', 'origins'], ['learn/beliefs', 'i-leaf', 'beliefs'],
    ['people', 'i-people', 'people'], ['tools/places', 'i-map', 'maps'], ['plans', 'i-calendar', 'plans']]
    .map(([to, ic, k]) => `<a class="tile" href="#${to}"><span class="ic">${icon(ic)}</span><b>${esc(t(`ex.${k}`))}</b><small>${esc(t(`exText.${k}`))}</small>${icon('i-right', 'chev')}</a>`).join('');
  const rows = [3, 11, 10, 2].map((i) => `<tr><th scope="row">${esc(tr('facts', i, 'label', FACTS[i].label))}</th>${KEYS.map((k) => `<td>${esc(tr('facts', i, k, FACTS[i][k]))}</td>`).join('')}</tr>`).join('');
  const glance = KEYS.map((k) => `<div class="glance-row"><span class="sym ${k}"><svg aria-hidden="true"><use href="#s-${k}"/></svg></span><span><b>${esc(t(`glance.${k}`))}</b><small>${esc(t(`glanceText.${k}`))}</small></span></div>`).join('');
  const cont = KEYS.filter((k) => data.last[k]).sort((a, b) => data.last[b].at - data.last[a].at).map((k) => {
    const l = data.last[k];
    const pct = percentThrough(k, l.section, l.chapter);
    return `<a class="cont-row" href="${readerHref(k, l.section, l.chapter)}"><span class="sym ${k} glance-row" style="padding:0;border:0;background:none"><span class="sym ${k}"><svg aria-hidden="true"><use href="#s-${k}"/></svg></span></span>
      <span><b data-ref="${k}|${esc(l.section)}|${l.chapter}">${esc(refLabel(k, l.section, l.chapter))}</b><small>${esc(t(`short.${k}`))}</small><span class="bar"><span style="width:${pct}%"></span></span></span><span class="muted small">${pct}%</span></a>`;
  }).join('') || `<p class="empty">${esc(t('continueEmpty'))}</p>`;
  return `
    <form class="search mobile-search" data-search>${icon('i-search')}<input type="search" placeholder="${esc(t('searchPlaceholder'))}" aria-label="${esc(t('searchLabel'))}"></form>
    <section class="hero">${skyline()}<div class="hero-text"><h2>SuperBook</h2><p>${esc(t('heroSub'))}</p></div></section>
    <div class="home-grid">
      <div>
        <div class="scriptures">${cards}</div>
        <h2 class="section-h">${icon('i-globe')}${esc(t('explore'))}</h2>
        <div class="explore">${tiles}</div>
        <h2 class="section-h">${icon('i-book')}${esc(t('keyDiff'))}</h2>
        <table class="diff-table"><thead><tr><th>${esc(t('topic'))}</th>${KEYS.map((k) => `<th class="${k}">${esc(t(`short.${k}`))} <small>(${esc(t(`faith.${k}`))})</small></th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>
        <p><a href="#compare">${esc(t('fullCompare'))} ›</a></p>
      </div>
      <div>
        <section class="card"><h2 class="section-h" style="margin-top:0">${icon('i-book')}${esc(t('glanceTitle'))}</h2><div class="glance">${glance}</div>
          <p style="text-align:center;margin:14px 0 0"><a class="btn maroon" href="#compare">${icon('i-scales')} ${esc(t('compareDetail'))} ${icon('i-right')}</a></p></section>
        <section class="card" style="margin-top:18px"><h2 class="section-h" style="margin-top:0">${icon('i-book')}${esc(t('continueTitle'))}</h2><div class="continue">${cont}</div></section>
      </div>
    </div>`;
}

// An original skyline of an ancient walled city at sunset: walls, towers, a golden dome and other domes.
function skyline() {
  return `<svg class="sky" viewBox="0 0 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true" style="stroke:none">
    <defs><linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfd6dc"/><stop offset=".45" stop-color="#f2dcae"/><stop offset="1" stop-color="#f0c27a"/></linearGradient>
    <linearGradient id="goldDome" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0b0"/><stop offset=".5" stop-color="#e2b043"/><stop offset="1" stop-color="#9a6a17"/></linearGradient></defs>
    <rect width="1200" height="260" fill="url(#dusk)"/>
    <circle cx="930" cy="150" r="48" fill="#fff4cf" opacity=".7"/>
    <path fill="#c9a575" opacity=".55" d="M0 200 Q150 170 300 190 T600 180 T900 188 T1200 176 V260H0z"/>
    <g fill="#a98455">
      <path d="M0 214h1200v46H0z"/>
      ${Array.from({ length: 60 }, (_, i) => `<rect x="${i * 20}" y="206" width="12" height="10"/>`).join('')}
      <rect x="90" y="150" width="36" height="66"/><rect x="84" y="144" width="48" height="10"/>
      <rect x="300" y="166" width="70" height="50"/><path d="M300 166h70l-35-26z"/>
      <rect x="470" y="128" width="20" height="88"/><path d="M466 128h28l-14-26z"/>
      <rect x="760" y="140" width="16" height="76"/><path d="M756 140h24l-12-24z"/>
      <rect x="980" y="160" width="60" height="56"/><rect x="1080" y="150" width="34" height="66"/><rect x="1074" y="144" width="46" height="10"/>
    </g>
    <g fill="#8e6b40"><rect x="540" y="168" width="130" height="48"/><path d="M548 168h114l-8-10h-98z"/></g>
    <path fill="url(#goldDome)" d="M560 158a45 45 0 0 1 90 0z"/><rect x="603" y="96" width="4" height="18" fill="#9a6a17"/>
    <path fill="#8e6b40" d="M240 196a32 32 0 0 1 64 0zM840 192a26 26 0 0 1 52 0z"/>
    <g fill="#6f5530"><path d="M190 214c-6-30 0-60 6-74 6 14 12 44 6 74z"/><path d="M700 214c-5-26 0-52 5-64 5 12 10 38 5 64z"/><path d="M1150 214c-6-30 0-56 6-70 6 14 12 40 6 70z"/></g>
  </svg>`;
}

async function read(arg) {
  const key = KEYS.includes(arg) ? arg : 'bible';
  setTitle(t('readTitle'));
  const tabs = `<div class="tabs" role="tablist">${KEYS.map((k) => `<a href="#read/${k}"${k === key ? ' aria-current="page"' : ''}>${esc(t(`short.${k}`))}</a>`).join('')}</div>`;
  const html = (list) => `${tabs}<p class="muted">${esc(t('readHint'))}</p><ul class="list">${list}</ul>`;
  if (!BOOKS[key].sections) {
    render(html(`<li class="empty">${esc(t('loadingBooks'))}</li>`));
    try { await sectionsOf(key); } catch { return html(`<li class="empty">${esc(t('loadError'))} ${esc(t('checkConnection'))}</li>`); }
  }
  const last = data.last[key];
  return html(BOOKS[key].sections.map((s) => {
    const ch = last && String(last.section) === String(s.id) ? last.chapter : 1;
    return `<li><a class="row" href="${readerHref(key, s.id, ch)}">${icon('i-book')}<span><b>${esc(BOOKS[key].label(s))}</b>${key === 'quran' ? '' : `<small>${esc(t('chaptersN', { n: s.chapters }))}</small>`}</span>${icon('i-right', 'chev')}</a></li>`;
  }).join(''));
}

// --- the reader ---
const cache = new Map();
let size = 2;
try { size = Number(localStorage.getItem('superbook-size')) || 2; } catch { /* blocked */ }
let speaking = false;
let fromPlan = null;   // { planId, index } when opened from a reading plan

async function reader(arg) {
  const [key, rawSection, rawChapter] = (arg || '').split('/');
  if (!KEYS.includes(key)) return read();
  await sectionsOf(key).catch(() => null);
  const book = BOOKS[key];
  if (!book.sections) return `<p class="empty">${esc(t('loadError'))} ${esc(t('checkConnection'))}</p>`;
  const sec = findSec(key, decodeURIComponent(rawSection || '')) || book.sections[0];
  const chapter = Math.min(Math.max(1, Number(rawChapter) || 1), sec.chapters);
  const ref = refLabel(key, sec.id, chapter);
  setTitle(ref);
  keep(store.setLast(data, key, sec.id, chapter));
  const ck = store.chapterKey(key, sec.id, chapter);
  const marked = store.isBookmarked(data, key, sec.id, chapter);
  const planNote = fromPlan ? `<p><button class="btn gold" id="markRead">${esc((data.plans[fromPlan.planId] || []).includes(fromPlan.index) ? t('planDone') : t('markRead'))}</button></p>` : '';
  render(`
    <div class="reader-head">
      <a class="icon-btn" href="#read/${key}" aria-label="${esc(t('back'))}">${icon('i-left')}</a>
      <h2>${esc(ref)}</h2>
      <button class="icon-btn" id="sizeBtn" aria-label="${esc(t('textSize'))}">${icon('i-text')}</button>
      <button class="icon-btn${marked ? ' on' : ''}" id="markBtn" aria-pressed="${marked}" aria-label="${esc(t('bookmark'))}">${icon('i-bookmark')}</button>
    </div>
    <div class="reader-pick">
      <label><span class="sr-only">${esc(t(book.sectionWord))}</span><select id="secPick">${book.sections.map((s) => `<option value="${esc(s.id)}"${s.id === sec.id ? ' selected' : ''}>${esc(book.label(s))}</option>`).join('')}</select></label>
      ${key === 'quran' ? '' : `<label>${esc(t('chapter'))} <select id="chPick">${Array.from({ length: sec.chapters }, (_, i) => `<option${i + 1 === chapter ? ' selected' : ''}>${i + 1}</option>`).join('')}</select></label>`}
      <label id="origWrap" hidden><input type="checkbox" id="orig" checked> ${esc(t('original'))}</label>
      <span class="muted small">${esc(t('tapToHighlight'))}</span>
    </div>
    ${planNote}
    <article class="card verses size-${size}" id="verses"><p class="muted">${esc(t('turning'))}</p></article>
    <div class="reader-bar">
      <button id="prevBtn" aria-label="${esc(t('previous'))}">${icon('i-left')}</button>
      <button id="speakBtn" aria-label="${esc(t('readAloud'))}">${icon('i-play')}</button>
      <button id="copyBtn" aria-label="${esc(t('copyChapter'))}">${icon('i-copy')}</button>
      <button id="nextBtn" aria-label="${esc(t('next'))}">${icon('i-right')}</button>
    </div>
    <section class="card note-box" style="margin-top:14px"><h3>${esc(t('notes'))}</h3><textarea id="note" aria-label="${esc(t('notes'))}">${esc(data.notes[ck] || '')}</textarea><p class="muted small">${esc(t('notesHint'))}</p></section>
    <p class="credit">${esc(t(`credit.${key}`))}</p>`);

  const go = (s, c) => { location.hash = readerHref(key, s, c); };
  $('secPick').onchange = (e) => go(e.target.value, 1);
  if ($('chPick')) $('chPick').onchange = (e) => go(sec.id, Number(e.target.value));
  const i = book.sections.indexOf(sec);
  $('prevBtn').onclick = () => (chapter > 1 ? go(sec.id, chapter - 1) : i > 0 && go(book.sections[i - 1].id, book.sections[i - 1].chapters));
  $('nextBtn').onclick = () => (chapter < sec.chapters ? go(sec.id, chapter + 1) : i < book.sections.length - 1 && go(book.sections[i + 1].id, 1));
  $('sizeBtn').onclick = () => { size = size % 4 + 1; try { localStorage.setItem('superbook-size', size); } catch { /* blocked */ } $('verses').className = `card verses size-${size}`; };
  $('markBtn').onclick = () => { keep(store.toggleBookmark(data, key, sec.id, chapter, ref)); const on = store.isBookmarked(data, key, sec.id, chapter); $('markBtn').classList.toggle('on', on); $('markBtn').setAttribute('aria-pressed', on); };
  $('note').oninput = (e) => keep(store.setNote(data, ck, e.target.value));
  if ($('markRead')) $('markRead').onclick = () => { keep(store.togglePlanItem(data, fromPlan.planId, fromPlan.index)); $('markRead').textContent = (data.plans[fromPlan.planId] || []).includes(fromPlan.index) ? t('planDone') : t('markRead'); };

  const id = `${lang()}|${ck}`;
  try {
    if (!cache.has(id)) cache.set(id, await book.load(sec.id, chapter));
  } catch (err) {
    cache.delete(id);
    if ($('verses')) $('verses').innerHTML = `<p class="muted">${esc(err.message || t('loadError'))} ${esc(t('checkConnection'))}</p>`;
    return null;
  }
  if (location.hash !== readerHref(key, sec.id, chapter) && decodeURIComponent(location.hash) !== decodeURIComponent(readerHref(key, sec.id, chapter))) return null;
  const verses = cache.get(id);
  const draw = () => {
    const hl = new Set(data.highlights[ck] || []);
    const showOrig = $('orig').checked;
    $('origWrap').hidden = !verses.some((v) => v.original);
    $('verses').innerHTML = (verses.fallback ? `<p class="fallback-note">${esc(t('inEnglish', { language: langInfo().name }))}</p>` : '')
      + verses.map((v) => `<p class="verse${hl.has(v.n) ? ' hl' : ''}" data-n="${v.n}" tabindex="0"${!v.original && v.dir ? ` dir="${v.dir}"` : ''}><sup>${v.n}</sup>${esc(v.text)}${showOrig && v.original ? `<span class="original" dir="${v.dir}" lang="${key === 'quran' ? 'ar' : 'he'}">${esc(v.original)}</span>` : ''}</p>`).join('');
  };
  draw();
  $('orig').onchange = draw;
  const toggle = (el) => { keep(store.toggleHighlight(data, ck, Number(el.dataset.n))); el.classList.toggle('hl'); };
  $('verses').onclick = (e) => { const el = e.target.closest('.verse'); if (el) toggle(el); };
  $('verses').onkeydown = (e) => { const el = e.target.closest('.verse'); if (el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(el); } };
  const text = () => `${ref}\n\n${verses.map((v) => `${v.n} ${v.text}`).join('\n')}`;
  $('copyBtn').onclick = async () => { try { await navigator.clipboard.writeText(text()); $('copyBtn').setAttribute('aria-label', t('copied')); } catch { /* clipboard blocked */ } };
  $('speakBtn').onclick = () => {
    if (!('speechSynthesis' in window)) return;
    if (speaking) { speechSynthesis.cancel(); speaking = false; $('speakBtn').innerHTML = icon('i-play'); return; }
    const u = new SpeechSynthesisUtterance(verses.map((v) => v.text).join(' '));
    u.lang = verses.fallback ? 'en' : (key === 'quran' && lang() === 'ar') ? 'ar' : lang();
    u.onend = () => { speaking = false; if ($('speakBtn')) $('speakBtn').innerHTML = icon('i-play'); };
    speechSynthesis.speak(u); speaking = true; $('speakBtn').innerHTML = icon('i-stop'); $('speakBtn').setAttribute('aria-label', t('stopReading'));
  };
  return null;
}

function compare(arg) {
  const tab = COMPARE_TABS.find((x) => x.id === arg) || COMPARE_TABS[0];
  setTitle(t('compareTitle2'));
  const head = KEYS.map((k) => `<th class="${k}"><span class="symhead"><svg aria-hidden="true"><use href="#s-${k}"/></svg>${esc(t(`short.${k}`))}</span></th>`).join('');
  const rows = tab.rows.map((i) => `<tr><th scope="row">${esc(tr('facts', i, 'label', FACTS[i].label))}</th>${KEYS.map((k) => `<td>${esc(tr('facts', i, k, FACTS[i][k]))}</td>`).join('')}</tr>`).join('');
  const topicIds = { overview: ['differences', 'overview'], beliefs: ['god', 'messiah', 'afterlife'], structure: ['structure', 'canondiff'], history: ['age', 'manuscripts'] }[tab.id];
  return `
    <div class="tabs" role="tablist">${COMPARE_TABS.map((x) => `<a href="#compare/${x.id}"${x.id === tab.id ? ' aria-current="page"' : ''}>${esc(t(`tab.${x.id}`) === `tab.${x.id}` ? x.title : t(`tab.${x.id}`))}</a>`).join('')}</div>
    <h2 class="section-h">${icon('i-scales')}${esc(t('atGlance'))}</h2>
    <table class="diff-table cmp"><thead><tr><th></th>${head}</tr></thead><tbody>${rows}</tbody></table>
    <p class="muted small">${esc(t('compareNote'))}</p>
    <h2 class="section-h">${icon('i-learn')}${esc(t('learnTitle'))}</h2>
    <ul class="list">${topicIds.map((id) => topicRow(id)).join('')}</ul>
    <p style="text-align:center"><a class="btn gold" href="#ask">${esc(t('askCompare'))} ${icon('i-right')}</a></p>`;
}

const topicById = (id) => TOPICS.find((x) => x.id === id);
const topicRow = (id) => { const tp = topicById(id); return tp ? `<li><a class="row" href="#topic/${id}">${icon('i-scroll')}<span><b>${esc(tr('topics', id, 'title', tp.title))}</b></span>${icon('i-right', 'chev')}</a></li>` : ''; };
const ARTS = { origins: 'linear-gradient(120deg,#7a5a2a,#c99a4f)', beliefs: 'linear-gradient(120deg,#5a3f22,#b98c45)', differences: 'linear-gradient(120deg,#6e1d24,#c9a24c)', similarities: 'linear-gradient(120deg,#30406b,#c9a24c)', today: 'linear-gradient(120deg,#1f5236,#c9a24c)' };

function learn(arg) {
  const sec = LEARN.find((x) => x.id === arg);
  if (sec) {
    setTitle(t(`learn.${sec.id}`) === `learn.${sec.id}` ? sec.title : t(`learn.${sec.id}`));
    return `<p><a href="#learn">‹ ${esc(t('learnTitle'))}</a></p><h2>${esc(sec.title)}</h2><p class="muted">${esc(sec.blurb)}</p><ul class="list">${sec.topics.map(topicRow).join('')}</ul>`;
  }
  setTitle(t('learnTitle'));
  return `<div class="learn-cards">${LEARN.map((x) => `<a class="learn-card" href="#learn/${x.id}" style="--art:${ARTS[x.id]}"><span>${esc(x.title)}<small>${esc(x.blurb)}</small></span></a>`).join('')}</div>
    <h2 class="section-h">${icon('i-tools')}${esc(t('toolsTitle'))}</h2>${toolGrid()}`;
}

function topic(id) {
  const tp = topicById(id);
  if (!tp) return learn();
  const c = compose(tp);
  setTitle(c.title);
  const kind = tp.kind ?? 'faith';
  const parts = [];
  if (tp.shared) parts.push(`<div class="topic-part"><h4>${esc(t('inCommon'))}</h4><p>${esc(tr('topics', id, 'shared', tp.shared))}</p></div>`);
  for (const k of KEYS) parts.push(`<div class="topic-part ${k}"><h4>${esc(t(`${kind === 'book' ? 'short' : 'faith'}.${k}`))}</h4><p>${esc(tr('topics', id, k, tp[k]))}</p></div>`);
  if (tp.note) parts.push(`<p class="muted">${esc(tr('topics', id, 'note', tp.note))}</p>`);
  return `<p><a href="javascript:history.back()">‹ ${esc(t('back'))}</a></p><h2>${esc(c.title)}</h2><div class="topic">${parts.join('')}</div><p class="muted small">${esc(t('sandNote'))}</p>`;
}

function people() { setTitle(t('peopleTitle')); return `<h2>${esc(t('peopleTitle'))}</h2><ul class="list">${PEOPLE.map(topicRow).join('')}</ul>`; }
function practices() {
  setTitle(t('practicesTitle'));
  return `<h2>${esc(t('beliefsTitle'))}</h2><ul class="list">${BELIEFS.map(topicRow).join('')}</ul><h2 class="section-h">${icon('i-temple')}${esc(t('practiceTitle'))}</h2><ul class="list">${PRACTICES.map(topicRow).join('')}</ul>`;
}

const TOOLS = [['commentary', 'i-book'], ['places', 'i-pin'], ['timeline', 'i-timeline'], ['terms', 'i-az'], ['people', 'i-people'], ['context', 'i-temple']];
const toolGrid = () => `<div class="tool-grid">${TOOLS.map(([id, ic]) => `<a class="tool" href="#tools/${id}">${icon(ic)}<span>${esc(t(`tool.${id === 'places' ? 'maps' : id}`))}</span></a>`).join('')}</div>`;

function tools(arg) {
  const back = `<p><a href="#tools">‹ ${esc(t('toolsTitle'))}</a></p>`;
  if (arg === 'terms') {
    setTitle(t('tool.terms'));
    return `${back}<h2>${esc(t('tool.terms'))}</h2><div class="list">${TERMS.map(([term, k, def]) => `<div class="term"><b>${esc(term)}</b><span class="tag ${k}">${esc(k === 'all' ? 'All three' : t(`short.${k}`))}</span><p style="margin:4px 0 0">${esc(def)}</p></div>`).join('')}</div>`;
  }
  if (arg === 'places') {
    setTitle(t('tool.maps'));
    return `${back}<h2>${esc(t('tool.maps'))}</h2><p class="muted">${esc(t('mapsHint'))}</p><div class="list">${PLACES.map(([name, lat, lon, by]) => `<div class="term"><b>${esc(name)}</b>${KEYS.filter((k) => by[k]).map((k) => `<p style="margin:6px 0 0"><span class="tag ${k}">${esc(t(`short.${k}`))}</span> ${esc(by[k])}</p>`).join('')}<p style="margin:8px 0 0"><a href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=11/${lat}/${lon}" target="_blank" rel="noopener">${esc(t('openMap'))} ↗</a></p></div>`).join('')}</div>
      <h2 class="section-h">${icon('i-timeline')}${esc(t('tool.timeline'))}</h2>${timelineHtml()}`;
  }
  if (arg === 'timeline') { setTitle(t('tool.timeline')); return `${back}<h2>${esc(t('tool.timeline'))}</h2>${timelineHtml()}`; }
  if (arg === 'people') { setTitle(t('tool.people')); return `${back}${people()}<h2 class="section-h">${icon('i-pin')}${esc(t('tool.maps'))}</h2><ul class="list">${PLACES.map(([name]) => `<li><a class="row" href="#tools/places">${icon('i-pin')}<span><b>${esc(name)}</b></span></a></li>`).join('')}</ul>`; }
  if (arg === 'context') {
    setTitle(t('tool.context'));
    return `${back}<h2>${esc(t('tool.context'))}</h2><p class="muted">${esc(t('contextHint'))}</p><ul class="list">${PASSAGES.map((p) => `<li><a class="row" href="#ask/${encodeURIComponent(`historical context of ${p.match[0]}`)}">${icon('i-scroll')}<span><b>${esc(tr('passages', p.ref, 'ref', p.ref))}</b><small>${esc(t(`short.${p.book}`))}</small></span>${icon('i-right', 'chev')}</a></li>`).join('')}</ul>`;
  }
  if (arg === 'commentary') {
    setTitle(t('tool.commentary'));
    const groups = Object.entries(STUDY_CHAPTERS || {});
    return `${back}<h2>${esc(t('tool.commentary'))}</h2><p class="muted">${esc(t('commentaryHint'))}</p>${groups.map(([k, list]) => `<h3>${esc(t(`short.${k}`))}</h3><div class="tool-grid" style="grid-template-columns:repeat(auto-fill,minmax(130px,1fr))">${list.map((c) => { const ref = Array.isArray(c) ? `Surah ${c[0]}` : c; const label = Array.isArray(c) ? `${c[0]}. ${c[1]}` : c; return `<a class="tool" style="padding:10px;font-size:1rem" href="#ask/${encodeURIComponent(`main idea of ${ref}${k === 'tanakh' ? ' in the Torah' : ''}`)}">${esc(label)}</a>`; }).join('')}</div>`).join('')}`;
  }
  setTitle(t('toolsTitle'));
  return `<h2>${esc(t('toolsTitle'))}</h2>${toolGrid()}`;
}
const timelineHtml = () => `<ol class="timeline">${[...TIMELINE].sort((a, b) => a[1] - b[1]).map(([label, , text, k]) => `<li><b>${esc(label)}</b><span class="tag ${k}">${esc(k === 'all' ? 'All three' : t(`short.${k}`))}</span><br>${esc(text)}</li>`).join('')}</ol>`;

function plans(arg) {
  const custom = data.custom ? customPlan(data.custom.read, data.custom.section, data.custom.chapters, data.custom.perDay) : null;
  const all = custom ? [...PLANS, custom] : PLANS;
  const plan = all.find((p) => p.id === arg);
  if (plan) {
    setTitle(plan.title);
    const done = new Set(data.plans[plan.id] || []);
    const items = plan.readings.map(([k, s, c], i) => `<li class="reading"><input type="checkbox" data-plan="${plan.id}" data-i="${i}"${done.has(i) ? ' checked' : ''} aria-label="${esc(t('markRead'))}">
      <a href="${readerHref(k, s, c)}" data-from="${plan.id}|${i}"><span class="tag ${k}">${esc(t(`short.${k}`))}</span> ${esc(k === 'quran' ? `${t('sectionSurah')} ${s}` : `${s} ${c}`)}${plan.themes ? ` <small class="muted">· ${esc(plan.themes[i])}</small>` : ''}</a><span class="muted small">${esc(t('dayN', { n: i + 1 }))}</span></li>`).join('');
    return `<p><a href="#plans">‹ ${esc(t('plansTitle'))}</a></p><h2>${esc(plan.title)}</h2><p class="muted">${esc(plan.blurb)} · ${planPercent(plan, data.plans[plan.id])}%</p><ol class="list">${items}</ol>`;
  }
  setTitle(t('plansTitle'));
  const rows = all.map((p) => `<a class="row plan-row" href="#plans/${p.id}">${icon(`i-${p.icon}`)}<span><b>${esc(p.title)}</b><small>${esc(p.blurb)}</small><span class="bar" style="display:block;margin-top:6px"><span style="width:${planPercent(p, data.plans[p.id])}%"></span></span></span>${icon('i-right', 'chev')}</a>`).join('');
  const bookOpts = (k) => (k === 'tanakh' ? TANAKH.map(([id]) => id) : k === 'bible' ? BIBLE.map(([id, , label]) => [id, label ?? id]) : []).map((b) => (Array.isArray(b) ? `<option value="${esc(b[0])}">${esc(b[1])}</option>` : `<option>${esc(b)}</option>`)).join('');
  return `<h2>${esc(t('plansTitle'))}</h2><div class="list">${rows}</div>
    <section class="card" style="margin-top:18px"><h3>${icon('i-sliders')} ${esc(t('customTitle'))}</h3><p class="muted">${esc(t('customText'))}</p>
      <form id="customForm" class="form-row">
        <label>${esc(t('scripture'))}<select id="cRead"><option value="bible">${esc(t('short.bible'))}</option><option value="tanakh">${esc(t('short.tanakh'))}</option></select></label>
        <label>${esc(t('book'))}<select id="cBook">${bookOpts('bible')}</select></label>
        <label>${esc(t('perDay'))}<input id="cPer" type="number" min="1" max="10" value="1"></label>
        <button class="btn gold" type="submit">${esc(t('customMake'))}</button>
      </form></section>`;
}

function languages() {
  setTitle(t('languagesTitle'));
  return `<h2>${esc(t('languagesTitle'))}</h2><div class="list" role="radiogroup">${LANGS.map((l) => `<button class="row lang-row" role="radio" aria-checked="${l.code === lang()}" data-lang="${l.code}" lang="${l.code}">${flag(l.code)}<span>${esc(langLabel(l))}</span><span class="check">${l.code === lang() ? '☑' : '☐'}</span></button>`).join('')}</div>`;
}

let clearArmed = false;
function favorites() {
  setTitle(t('favoritesTitle'));
  const bm = data.bookmarks.map((b) => `<li><a class="row" href="${readerHref(b.read, b.section, b.chapter)}">${icon('i-bookmark')}<span><b>${esc(b.label)}</b><small>${esc(t(`short.${b.read}`))}</small></span>${icon('i-right', 'chev')}</a></li>`).join('') || `<li class="empty">${esc(t('noBookmarks'))}</li>`;
  const label = (key) => { const [k, s, c] = key.split('|'); return [k, s, c, k === 'quran' ? `${t('sectionSurah')} ${s}` : `${s} ${c}`]; };
  const hl = Object.entries(data.highlights).map(([key, vs]) => { const [k, s, c, l] = label(key); return `<li><a class="row" href="${readerHref(k, s, c)}">${icon('i-leaf')}<span><b>${esc(l)}</b><small>${esc(t('highlights'))}: ${vs.join(', ')}</small></span></a></li>`; }).join('') || `<li class="empty">${esc(t('noHighlights'))}</li>`;
  const notes = Object.entries(data.notes).map(([key, text]) => { const [k, s, c, l] = label(key); return `<li><a class="row" href="${readerHref(k, s, c)}">${icon('i-scroll')}<span><b>${esc(l)}</b><small>${esc(text.slice(0, 140))}</small></span></a></li>`; }).join('') || `<li class="empty">${esc(t('noNotes'))}</li>`;
  return `<h2>${esc(t('favoritesTitle'))}</h2>
    <h3 class="section-h">${icon('i-bookmark')}${esc(t('bookmarks'))}</h3><ul class="list">${bm}</ul>
    <h3 class="section-h">${icon('i-leaf')}${esc(t('highlights'))}</h3><ul class="list">${hl}</ul>
    <h3 class="section-h">${icon('i-scroll')}${esc(t('notesTitle'))}</h3><ul class="list">${notes}</ul>
    <h3 class="section-h">${icon('i-sun')}${esc(t('settings'))}</h3>
    <section class="card"><div class="form-row">
      <label>${esc(t('theme'))}<select id="themePick">${['auto', 'light', 'dark'].map((v) => `<option value="${v}"${data.theme === v ? ' selected' : ''}>${esc(t(`theme${v[0].toUpperCase()}${v.slice(1)}`))}</option>`).join('')}</select></label>
      <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="musicPick"${musicOn() ? ' checked' : ''}> ${esc(t('ambience'))}</label>
      <a class="btn" href="#languages">${icon('i-globe')} ${esc(t('languagesTitle'))}</a>
    </div><button class="btn" id="clearBtn">${esc(t('clearAll'))}</button></section>`;
}

// --- ask the sand (the search box) ---
const writer = { w: null };
let lastAsk = null;
function ask(arg) {
  const q = decodeURIComponent(arg || '').trim();
  setTitle(t('askTitle2'));
  render(`<h2>${esc(t('askTitle2'))}</h2>
    <form class="search" id="askForm" style="display:flex;max-width:none;margin:0 0 14px">${icon('i-search')}<input id="askInput" type="search" value="${esc(q)}" placeholder="${esc(t('askPlaceholder'))}" aria-label="${esc(t('askLabel'))}"></form>
    <div id="hits"></div>
    <div class="sand-wrap" ${q ? '' : 'hidden'}><canvas id="sand" aria-hidden="true"></canvas></div>
    <p id="spoken" class="sr-only" aria-live="polite"></p>
    <div class="sand-actions"><a id="sourceLink" class="btn" target="_blank" rel="noopener" hidden></a><button class="btn" id="smoothBtn" ${q ? '' : 'hidden'}>${esc(t('smooth'))}</button></div>
    <p class="muted small">${esc(t('sandNote'))}</p>`);
  $('askForm').onsubmit = (e) => { e.preventDefault(); const v = $('askInput').value.trim(); if (v) location.hash = `#ask/${encodeURIComponent(v)}`; };
  if (!q) return null;
  // Book and chapter names typed into the search go straight to the reader too.
  $('hits').innerHTML = scriptureHits(q);
  const topicAns = answer(q);
  lastAsk = { q, topic: topicAns };
  writer.w = new SandWriter($('sand'));
  $('spoken').textContent = `${topicAns.title}. ${topicAns.answer.join(' ')}`;
  if (topicAns.source) { $('sourceLink').hidden = false; $('sourceLink').href = topicAns.source.url; $('sourceLink').textContent = `${topicAns.source.label} ↗`; }
  writer.w.write(topicAns.title, topicAns.answer, { reducedMotion, dir: langInfo().dir });
  $('smoothBtn').onclick = () => { writer.w.smooth(); lastAsk = null; };
  return null;
}

/** Links to books or chapters named in a search, like "Genesis 1", "John 3" or "Surah 36". */
export function scriptureHits(q) {
  const m = q.trim().match(/^(.*?)(?:\s+(\d+))?$/);
  const name = (m?.[1] || '').trim().toLowerCase();
  const n = Number(m?.[2]) || 1;
  const hits = [];
  const surah = q.match(/^(?:surah|sura|sūrah)\s+(\d{1,3})$/i);
  if (surah && Number(surah[1]) >= 1 && Number(surah[1]) <= 114) hits.push(['quran', Number(surah[1]), 1, `${t('sectionSurah')} ${surah[1]}`]);
  if (name.length >= 3) {
    for (const [id, ch, label = id] of BIBLE) if (label.toLowerCase().includes(name) || id.toLowerCase() === name) hits.push(['bible', id, Math.min(n, ch), `${label} ${Math.min(n, ch)}`]);
    for (const [id, ch] of TANAKH) if (id.toLowerCase() === name) hits.push(['tanakh', id, Math.min(n, ch), `${id} ${Math.min(n, ch)}`]);
  }
  if (!hits.length) return '';
  return `<h3>${esc(t('results'))}</h3><ul class="list" style="margin-bottom:14px">${hits.slice(0, 6).map(([k, s, c, l]) => `<li><a class="row" href="${readerHref(k, s, c)}">${icon('i-book')}<span><b>${esc(l)}</b><small>${esc(t(`short.${k}`))}</small></span>${icon('i-right', 'chev')}</a></li>`).join('')}</ul>`;
}

// ---------- routing ----------
function render(html) { if (html != null) $('view').innerHTML = html; }

async function route() {
  const hash = location.hash.replace(/^#/, '') || 'home';
  const [page, ...rest] = hash.split('/');
  const fn = PAGES[page] || home;
  navs(hash);
  closeMenu();
  if (speaking) { speechSynthesis.cancel(); speaking = false; }
  const out = await fn(rest.join('/'));
  render(out);
  wire();
  if (!hash.startsWith('reader')) fromPlan = null;
}

function wire() {
  document.querySelectorAll('[data-search]').forEach((f) => { f.onsubmit = (e) => { e.preventDefault(); const v = f.querySelector('input').value.trim(); if (v) location.hash = `#ask/${encodeURIComponent(v)}`; }; });
  document.querySelectorAll('[data-plan]').forEach((el) => { el.onchange = () => keep(store.togglePlanItem(data, el.dataset.plan, Number(el.dataset.i))); });
  document.querySelectorAll('[data-from]').forEach((el) => { el.onclick = () => { const [planId, i] = el.dataset.from.split('|'); fromPlan = { planId, index: Number(i) }; }; });
  document.querySelectorAll('#view [data-lang]').forEach((el) => { el.onclick = () => pickLanguage(el.dataset.lang); });
  if ($('cRead')) {
    const fill = () => { const k = $('cRead').value; $('cBook').innerHTML = (k === 'tanakh' ? TANAKH.map(([id]) => `<option>${esc(id)}</option>`) : BIBLE.map(([id, , l = id]) => `<option value="${esc(id)}">${esc(l)}</option>`)).join(''); };
    $('cRead').onchange = fill;
    $('customForm').onsubmit = (e) => {
      e.preventDefault();
      const k = $('cRead').value; const s = $('cBook').value;
      const ch = (k === 'tanakh' ? TANAKH : BIBLE).find(([id]) => id === s)?.[1] ?? 1;
      keep({ ...data, custom: { read: k, section: s, chapters: ch, perDay: Number($('cPer').value) || 1, items: [] }, plans: { ...data.plans, custom: [] } });
      location.hash = '#plans/custom';
    };
  }
  if ($('themePick')) $('themePick').onchange = (e) => { keep({ ...data, theme: e.target.value }); applyTheme(); };
  if ($('musicPick')) $('musicPick').onchange = (e) => setMusic(e.target.checked);
  if ($('clearBtn')) $('clearBtn').onclick = () => {
    if (!clearArmed) { clearArmed = true; $('clearBtn').textContent = t('confirmClear'); return; }
    clearArmed = false; keep({ ...store.load({ getItem: () => null }), theme: data.theme }); route();
  };
}

// ---------- theme, menu, music ----------
const darkQuery = matchMedia('(prefers-color-scheme: dark)');
function applyTheme() {
  const dark = data.theme === 'dark' || (data.theme === 'auto' && darkQuery.matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#0a0a0c' : '#14213d';
}
darkQuery.addEventListener?.('change', applyTheme);

function closeMenu() { $('sidebar').classList.remove('open'); $('scrim').hidden = true; $('menuBtn').setAttribute('aria-expanded', 'false'); }
$('menuBtn').onclick = () => { const open = !$('sidebar').classList.contains('open'); $('sidebar').classList.toggle('open', open); $('scrim').hidden = !open; $('menuBtn').setAttribute('aria-expanded', String(open)); };
$('scrim').onclick = closeMenu;
$('langBtn').onclick = () => { const open = $('langList').hidden; $('langList').hidden = !open; $('langBtn').setAttribute('aria-expanded', String(open)); };
$('langList').onclick = (e) => { const b = e.target.closest('[data-lang]'); if (b) { $('langList').hidden = true; pickLanguage(b.dataset.lang); } };
document.addEventListener('click', (e) => { if (!e.target.closest('.lang-menu')) $('langList').hidden = true; });
$('searchForm').onsubmit = (e) => { e.preventDefault(); const v = $('search').value.trim(); if (v) location.hash = `#ask/${encodeURIComponent(v)}`; };

const ambience = new DesertAmbience();
const musicOn = () => { try { return localStorage.getItem('superbook-music') === 'on'; } catch { return false; } };
function setMusic(on) { try { localStorage.setItem('superbook-music', on ? 'on' : 'off'); } catch { /* blocked */ } if (on) ambience.start(); else ambience.stop(); }

// Redraw the sand at the new width after a resize or rotation.
let resizeTimer;
addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { if (lastAsk && writer.w && $('sand')) writer.w.write(lastAsk.topic.title, lastAsk.topic.answer, { reducedMotion: true, dir: langInfo().dir }); }, 200); });

// ---------- start ----------
applyTheme();
let saved = null;
try { saved = localStorage.getItem('superbook-lang'); } catch { /* blocked */ }
await setLanguage(saved ?? 'en').catch(() => setLanguage('en'));
document.documentElement.lang = lang();
document.documentElement.dir = langInfo().dir;
staticText();
langMenu();
// Older links like ?book=Psalms&chapter=23 still open the reader at that chapter.
const link = parseLink(location.search);
if (link && !location.hash) location.replace(`${location.pathname}${readerHref(link.read, link.section ?? (link.read === 'quran' ? 1 : link.read === 'tanakh' ? 'Genesis' : 'Genesis'), link.chapter)}`);
addEventListener('hashchange', () => { route(); scrollTo(0, 0); });
route();
