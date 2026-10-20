import { BOOKS } from './books.js';
import { answer } from './answers.js';
import { SandWriter } from './sand.js';
import { DesertAmbience } from './music.js';
import { FACTS } from './facts.js';
import { LANGS, setLanguage, t, tr, lang, langInfo } from './i18n.js';

const $ = (id) => document.getElementById(id);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const cache = new Map();

// ---------- Reader ----------
let current = { key: null, section: null, chapter: 1 };

async function openBook(key) {
  const book = BOOKS[key];
  current = { key, section: null, chapter: 1 };
  const dialog = $('reader');
  dialog.className = `reader ${key}`;
  $('verses').innerHTML = `<p class="loading">${t('opening')}</p>`;
  readerLabels();
  dialog.showModal();
  if (!book.sections) book.sections = await book.loadSections();
  fillSections();
  await goTo(book.sections[0].id, 1);
}

/** Reader title, credit and pickers in the current language. */
function readerLabels() {
  const key = current.key;
  if (!key) return;
  $('readerTitle').textContent = t(`book.${key}`);
  $('readerFaith').textContent = `${t(`subtitle.${key}`)} · ${t(`faith.${key}`)}`;
  $('credit').textContent = t(`credit.${key}`);
  $('sectionLabel').textContent = t(BOOKS[key].sectionWord);
}

function fillSections() {
  const book = BOOKS[current.key];
  if (!book.sections) return;
  $('section').innerHTML = book.sections.map((s) => `<option value="${s.id}">${escape(book.label(s))}</option>`).join('');
  if (current.section) $('section').value = current.section;
}

function fillChapters() {
  const book = BOOKS[current.key];
  const sec = book.sections.find((s) => String(s.id) === String(current.section));
  $('chapterWrap').hidden = sec.chapters === 1 && current.key === 'quran';
  $('chapter').innerHTML = Array.from({ length: sec.chapters }, (_, i) => `<option>${i + 1}</option>`).join('');
  $('chapter').value = current.chapter;
}

async function goTo(section, chapter) {
  const book = BOOKS[current.key];
  current.section = section;
  current.chapter = chapter;
  $('section').value = section;
  fillChapters();
  const id = `${lang()}|${current.key}|${section}|${chapter}`;
  $('verses').innerHTML = `<p class="loading">${t('turning')}</p>`;
  try {
    if (!cache.has(id)) cache.set(id, await book.load(section, chapter));
    const verses = cache.get(id);
    if (id !== `${lang()}|${current.key}|${current.section}|${current.chapter}`) return;   // user moved on
    const showOriginal = $('original').checked;
    const note = verses.fallback ? `<p class="fallback-note">${escape(t('inEnglish', { language: langInfo().name }))}</p>` : '';
    $('verses').innerHTML = note + verses.map((v) => `
      <p class="verse"${!v.original && v.dir ? ` dir="${v.dir}"` : ''}><sup>${v.n}</sup> ${escape(v.text)}
        ${showOriginal && v.original ? `<span class="original" dir="${v.dir}" lang="${current.key === 'quran' ? 'ar' : 'he'}">${escape(v.original)}</span>` : ''}
      </p>`).join('');
    $('verses').scrollTop = 0;
    $('originalWrap').hidden = !verses.some((v) => v.original);
  } catch (err) {
    cache.delete(id);
    $('verses').innerHTML = `<p class="loading">${escape(err.message || t('loadError'))} ${escape(t('checkConnection'))}</p>`;
  }
}

function step(dir) {
  const book = BOOKS[current.key];
  const i = book.sections.findIndex((s) => String(s.id) === String(current.section));
  const sec = book.sections[i];
  let chapter = current.chapter + dir;
  let index = i;
  if (chapter < 1) { index = i - 1; if (index < 0) return; chapter = book.sections[index].chapters; }
  else if (chapter > sec.chapters) { index = i + 1; if (index >= book.sections.length) return; chapter = 1; }
  goTo(book.sections[index].id, chapter);
}

const escape = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

document.querySelectorAll('.book').forEach((el) => el.addEventListener('click', () => openBook(el.dataset.book)));
$('section').onchange = (e) => goTo(e.target.value, 1);
$('chapter').onchange = (e) => goTo(current.section, Number(e.target.value));
$('prev').onclick = () => step(-1);
$('next').onclick = () => step(1);
$('original').onchange = () => goTo(current.section, current.chapter);
$('close').onclick = () => $('reader').close();
$('reader').addEventListener('click', (e) => { if (e.target === $('reader')) $('reader').close(); });

// ---------- Ask the sand ----------
const writer = new SandWriter($('sand'));

let lastTopic = null;
let lastQuestion = null;

function ask(question) {
  const topic = answer(question);
  lastTopic = topic;
  lastQuestion = question;
  $('spoken').textContent = `${topic.title}. ${topic.answer.join(' ')}`;   // for screen readers
  $('sourceLink').hidden = !topic.source;            // study answers link to the passage itself
  if (topic.source) { $('sourceLink').href = topic.source.url; $('sourceLink').textContent = `${topic.source.label} ↗`; }
  $('sandWrap').hidden = false;          // must be visible so the canvas has a width
  writer.write(topic.title, topic.answer, { reducedMotion, dir: langInfo().dir });
  $('sandWrap').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
}

$('askForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const q = $('question').value.trim();
  if (q) ask(q);
});
$('smooth').onclick = () => { lastTopic = null; lastQuestion = null; writer.smooth(); setTimeout(() => { $('sandWrap').hidden = true; }, 450); };

// Redraw the writing at the new width when the window is resized or the phone is rotated
let resizeTimer;
addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { if (lastTopic) writer.write(lastTopic.title, lastTopic.answer, { reducedMotion: true, dir: langInfo().dir }); }, 200);
});

// ---------- Compare the books side by side ----------

function renderFacts() {
  const books = [...document.querySelectorAll('.pick input:checked')].map((b) => b.value);
  const facts = $('facts');
  facts.style.setProperty('--cols', books.length);
  const name = (b) => t(`short.${b}`);
  facts.innerHTML = '<div class="corner" role="columnheader"></div>'
    + books.map((b) => `<div class="head ${b}" role="columnheader">${escape(name(b))}</div>`).join('')
    + FACTS.map((row, i) => `<div class="row-label" role="rowheader">${escape(tr('facts', i, 'label', row.label))}</div>`
      + books.map((b) => `<div role="cell" aria-label="${escape(name(b))}">${escape(tr('facts', i, b, row[b]))}</div>`).join('')).join('');
}

document.querySelector('.pick').addEventListener('change', (e) => {
  if (document.querySelectorAll('.pick input:checked').length < 2) e.target.checked = true;   // compare at least two
  renderFacts();
});

$('compareToggle').onclick = () => {
  const open = $('compare').hidden;
  $('compare').hidden = !open;
  $('compareToggle').setAttribute('aria-expanded', String(open));
  if (open) { renderFacts(); $('compare').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' }); }
};

// ---------- Background music (generated in the browser, off until you turn it on) ----------
const ambience = new DesertAmbience();
const PREF = 'superbook-music';
const remember = (on) => { try { localStorage.setItem(PREF, on ? 'on' : 'off'); } catch { /* storage may be blocked */ } };
const wanted = () => { try { return localStorage.getItem(PREF) === 'on'; } catch { return false; } };

function setMusic(on) {
  $('music').setAttribute('aria-pressed', String(on));
  $('music').querySelector('.label').textContent = t(on ? 'musicOn' : 'musicOff');
  if (on) ambience.start(); else ambience.stop();
}
$('music').onclick = () => {
  const on = $('music').getAttribute('aria-pressed') !== 'true';
  remember(on);
  setMusic(on);
};
// Browsers only allow sound after a click or key press, so a returning listener's music
// starts on their first interaction with the page.
if (wanted()) {
  const resume = (e) => { if (!e.target.closest?.('#music')) setMusic(true); };
  addEventListener('pointerdown', resume, { once: true });
  addEventListener('keydown', resume, { once: true });
}

// ---------- Language ----------
const LANG_PREF = 'superbook-lang';
const savedLanguage = () => { try { return localStorage.getItem(LANG_PREF); } catch { return null; } };

/** Puts every piece of page text in the current language and redraws what is on screen. */
function applyLanguage() {
  const { code, dir } = langInfo();
  document.documentElement.lang = code;
  document.documentElement.dir = dir;
  document.title = t('pageTitle');
  document.querySelector('meta[name="description"]').content = t('pageDescription');
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel)));
  document.querySelectorAll('[data-i18n-title]').forEach((el) => { el.title = t(el.dataset.i18nTitle); });
  document.querySelectorAll('.book').forEach((el) => el.setAttribute('aria-label', t('openBook', { book: t(`book.${el.dataset.book}`) })));
  $('lang').setAttribute('aria-label', t('language'));
  $('music').querySelector('.label').textContent = t($('music').getAttribute('aria-pressed') === 'true' ? 'musicOn' : 'musicOff');
  if (!$('compare').hidden) renderFacts();
  if (lastQuestion) {                                    // rewrite the current answer in the new language
    const topic = answer(lastQuestion);
    lastTopic = topic;
    $('spoken').textContent = `${topic.title}. ${topic.answer.join(' ')}`;
    $('sourceLink').hidden = !topic.source;
    if (topic.source) { $('sourceLink').href = topic.source.url; $('sourceLink').textContent = `${topic.source.label} ↗`; }
    writer.write(topic.title, topic.answer, { reducedMotion: true, dir });
  }
  if ($('reader').open) { readerLabels(); fillSections(); goTo(current.section, current.chapter); }
}

$('lang').innerHTML = LANGS.map((l) => `<option value="${l.code}" lang="${l.code}">${l.name}</option>`).join('');
$('lang').onchange = async (e) => {
  await setLanguage(e.target.value);
  try { localStorage.setItem(LANG_PREF, lang()); } catch { /* storage may be blocked */ }
  applyLanguage();
};
await setLanguage(savedLanguage() ?? 'en').catch(() => setLanguage('en'));
$('lang').value = lang();
applyLanguage();
