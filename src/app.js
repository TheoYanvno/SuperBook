import { BOOKS } from './books.js';
import { answer, SUGGESTIONS } from './answers.js';
import { SandWriter } from './sand.js';
import { DesertAmbience } from './music.js';
import { FACTS } from './facts.js';

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
  $('readerTitle').textContent = book.title;
  $('readerFaith').textContent = `${book.subtitle} · ${book.faith}`;
  $('credit').textContent = book.credit;
  $('sectionLabel').textContent = book.sectionWord;
  $('verses').innerHTML = '<p class="loading">Opening…</p>';
  dialog.showModal();
  if (!book.sections) book.sections = await book.loadSections();
  $('section').innerHTML = book.sections.map((s) => `<option value="${s.id}">${s.label}</option>`).join('');
  await goTo(book.sections[0].id, 1);
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
  const id = `${current.key}|${section}|${chapter}`;
  $('verses').innerHTML = '<p class="loading">Turning the page…</p>';
  try {
    if (!cache.has(id)) cache.set(id, await book.load(section, chapter));
    const verses = cache.get(id);
    if (id !== `${current.key}|${current.section}|${current.chapter}`) return;   // user moved on
    const showOriginal = $('original').checked;
    $('verses').innerHTML = verses.map((v) => `
      <p class="verse"><sup>${v.n}</sup> ${escape(v.text)}
        ${showOriginal && v.original ? `<span class="original" dir="${v.dir}" lang="${current.key === 'quran' ? 'ar' : 'he'}">${escape(v.original)}</span>` : ''}
      </p>`).join('');
    $('verses').scrollTop = 0;
    $('originalWrap').hidden = !verses.some((v) => v.original);
  } catch (err) {
    cache.delete(id);
    $('verses').innerHTML = `<p class="loading">${escape(err.message || 'Could not load this page.')} Check your internet connection and try again.</p>`;
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

function ask(question) {
  const topic = answer(question);
  lastTopic = topic;
  $('spoken').textContent = `${topic.title}. ${topic.answer.join(' ')}`;   // for screen readers
  $('sandWrap').hidden = false;          // must be visible so the canvas has a width
  writer.write(topic.title, topic.answer, { reducedMotion });
  $('sandWrap').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
}

$('askForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const q = $('question').value.trim();
  if (q) ask(q);
});
$('chips').innerHTML = SUGGESTIONS.map((s) => `<button type="button" class="chip">${s}</button>`).join('');
$('chips').addEventListener('click', (e) => {
  if (!e.target.matches('.chip')) return;
  $('question').value = e.target.textContent;
  ask(e.target.textContent);
});
$('smooth').onclick = () => { lastTopic = null; writer.smooth(); setTimeout(() => { $('sandWrap').hidden = true; }, 450); };

// Redraw the writing at the new width when the window is resized or the phone is rotated
let resizeTimer;
addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { if (lastTopic) writer.write(lastTopic.title, lastTopic.answer, { reducedMotion: true }); }, 200);
});

// ---------- Compare the books side by side ----------
const BOOK_NAMES = { tanakh: 'Tanakh', bible: 'Bible', quran: "Qur'an" };

function renderFacts() {
  const books = [...document.querySelectorAll('.pick input:checked')].map((b) => b.value);
  const facts = $('facts');
  facts.style.setProperty('--cols', books.length);
  facts.innerHTML = '<div class="corner" role="columnheader"></div>'
    + books.map((b) => `<div class="head ${b}" role="columnheader">${BOOK_NAMES[b]}</div>`).join('')
    + FACTS.map((row) => `<div class="row-label" role="rowheader">${escape(row.label)}</div>`
      + books.map((b) => `<div role="cell" aria-label="${BOOK_NAMES[b]}">${escape(row[b])}</div>`).join('')).join('');
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
  $('music').querySelector('.label').textContent = on ? 'Music on' : 'Music off';
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
