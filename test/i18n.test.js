import test from 'node:test';
import assert from 'node:assert';
import { readdirSync } from 'node:fs';
import { LANGS, UI, useLanguage, t } from '../src/i18n.js';
import { TOPICS, answer, findBooks } from '../src/answers.js';
import { PASSAGES } from '../src/passages.js';
import { FACTS } from '../src/facts.js';
import { BIBLE } from '../src/books.js';

const codes = LANGS.map((l) => l.code).filter((c) => c !== 'en');
const files = readdirSync(new URL('../src/lang/', import.meta.url)).map((f) => f.replace('.js', ''));

// Questions every language should route the same way: [topic id, question in each language]
export const SAMPLES = {
  fr: [['jesus', 'Que dit le Coran sur Jésus ?'], ['fasting', 'Comment jeûnent-ils ?'], ['passage', 'Quel est le contexte historique du Psaume 137 ?'], ['study', 'Quels choix éthiques apparaissent dans Genèse 12 ?'], ['study', 'Quels sont les thèmes principaux de la sourate Al-Mulk ?']],
  de: [['jesus', 'Was sagt der Koran über Jesus?'], ['fasting', 'Wie fasten sie?'], ['passage', 'Was ist der historische Hintergrund von Psalm 137?'], ['study', 'Welche ethischen Entscheidungen gibt es in Genesis 12?'], ['study', 'Was sind die Hauptthemen der Sure Al-Mulk?'], ['study', 'Wer sind die wichtigsten Personen in 2 Mose 3?']],
  he: [['jesus', 'מה אומר הקוראן על ישו?'], ['fasting', 'איך הם צמים?'], ['passage', 'מה ההקשר ההיסטורי של תהלים 137?'], ['study', 'אילו בחירות מוסריות עולות בבראשית 12?'], ['study', 'מהם הנושאים המרכזיים של סורה 67?'], ['noah', 'ספר לי על נח והמבול'], ['salvation', 'איך מגיעים לישועה?']],
  ar: [['jesus', 'ماذا يقول القرآن عن عيسى؟'], ['fasting', 'كيف يصومون؟'], ['passage', 'ما السياق التاريخي للمزمور 137؟'], ['study', 'ما الخيارات الأخلاقية في التكوين 12؟'], ['study', 'ما الموضوعات الرئيسية في سورة الملك؟'], ['pilgrimage', 'ما هو الحج؟'], ['dress', 'لماذا تلبس المسلمات الحجاب؟']],
  el: [['jesus', 'Τι λέει το Κοράνιο για τον Ιησού;'], ['fasting', 'Πώς νηστεύουν;'], ['passage', 'Ποιο είναι το ιστορικό πλαίσιο του Ψαλμού 137;'], ['study', 'Ποιες ηθικές επιλογές εμφανίζονται στη Γένεση 12;'], ['study', 'Ποια είναι τα κύρια θέματα της σούρας 67;'], ['noah', 'Πες μου για τον Νώε και τον κατακλυσμό'], ['pilgrimage', 'Τι είναι το Χατζ;']],
  la: [['jesus', 'Quid dicit Quranus de Iesu?'], ['fasting', 'Quomodo ieiunant?'], ['passage', 'Quis est contextus historicus Psalmi 137?'], ['study', 'Quae electiones morales in Genesi 12 apparent?'], ['study', 'Quae sunt themata praecipua surae 67?'], ['noah', 'Dic mihi de Noe et diluvio'], ['pilgrimage', 'Quid est Hajj?']],
  es: [['jesus', '¿Qué dice el Corán sobre Jesús?'], ['fasting', '¿Cómo ayunan?'], ['passage', '¿Cuál es el contexto histórico del Salmo 137?'], ['study', '¿Qué decisiones éticas surgen en Génesis 12?'], ['study', '¿Cuáles son los temas principales de la sura Al-Mulk?']],
};

for (const code of codes.filter((c) => files.includes(c))) {
  const pack = (await import(`../src/lang/${code}.js`)).default;

  test(`${code}: translates every page text, topic, passage, fact and study question`, () => {
    for (const key of Object.keys(UI)) if (key !== 'pageTitle') assert.ok(pack.ui[key], `${code} ui.${key}`);
    for (const topic of TOPICS) {
      const tr = pack.topics[topic.id];
      assert.ok(tr, `${code} topic ${topic.id}`);
      for (const field of ['title', 'tanakh', 'bible', 'quran', ...(topic.shared ? ['shared'] : []), ...(topic.note ? ['note'] : [])]) {
        assert.ok(tr[field] && tr[field].length > 1, `${code} ${topic.id}.${field}`);
      }
      assert.ok(Array.isArray(tr.keywords) && tr.keywords.length, `${code} ${topic.id}.keywords`);
    }
    for (const p of PASSAGES) {
      const tr = pack.passages[p.ref];
      assert.ok(tr?.ref && tr.context?.length === p.context.length, `${code} passage ${p.ref}`);
    }
    assert.strictEqual(pack.facts.length, FACTS.length);
    for (const row of pack.facts) for (const f of ['label', 'tanakh', 'bible', 'quran']) assert.ok(row[f], `${code} fact ${row.label}`);
    assert.strictEqual(pack.study.guidance.length, 10);
    for (const book of ['bible', 'tanakh', 'quran']) assert.strictEqual(pack.study.questions[book].length, 10, `${code} ${book}`);
    for (const g of pack.study.guidance) assert.ok(g.includes('{ref}'), `${code} guidance needs {ref}: ${g}`);
    for (const [id, , label = id] of BIBLE) {
      for (const name of label.replace(/^\d Kingdoms /, '').replace(/[()]/g, '|').split('|').map((s) => s.trim()).filter((s) => s && s !== 'appendix')) {
        assert.ok(pack.books[name], `${code} book name ${name}`);
      }
    }
    assert.strictEqual(pack.studyTypeWords.length, 10);
  });

  test(`${code}: answers questions asked in the language, in the language`, () => {
    useLanguage(code, pack);
    try {
      for (const [id, question] of SAMPLES[code] ?? []) {
        const a = answer(question);
        assert.strictEqual(a.id, id, `${code}: ${question} → ${a.id} (${a.title})`);
      }
      assert.strictEqual(answer('Who was Moses?').title, pack.topics.moses.title);     // English questions still work
      assert.ok(answer('xyzzy plugh').title === pack.fallback.title);
      assert.strictEqual(t('askButton'), pack.ui.askButton);
    } finally {
      useLanguage('en', null);
    }
  });
}
