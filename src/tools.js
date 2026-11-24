// Study tools data: key terms, places, a timeline and reading plans. Written for SuperBook. Dates follow
// common scholarly estimates; where tradition dates something differently, the entry says so.

/** Key terms and definitions. faith: which tradition the term belongs to (or 'all'). */
export const TERMS = [
  ['Torah', 'tanakh', 'The first five books of the Tanakh (Genesis to Deuteronomy), also called the Five Books of Moses. More broadly, all Jewish teaching.'],
  ["Nevi'im", 'tanakh', 'The Prophets: the second part of the Tanakh, from Joshua and Kings to Isaiah, Jeremiah, Ezekiel and the Twelve.'],
  ['Ketuvim', 'tanakh', 'The Writings: the third part of the Tanakh, including Psalms, Proverbs, Job, the five scrolls, Daniel and Chronicles.'],
  ['Talmud', 'tanakh', 'The central text of rabbinic Judaism: the Mishnah (written about 200 CE) and the Gemara, centuries of discussion of it.'],
  ['Midrash', 'tanakh', 'Rabbinic interpretation of scripture, explaining laws and filling gaps in stories.'],
  ['Shema', 'tanakh', '"Hear, O Israel: the Lord our God, the Lord is one" (Deuteronomy 6:4), Judaism\'s central declaration of faith.'],
  ['Gospel', 'bible', '"Good news": the message about Jesus, and the four books (Matthew, Mark, Luke, John) that tell of his life, death and resurrection.'],
  ['Epistle', 'bible', 'A letter. Most of the New Testament after Acts is letters by Paul and other apostles to churches and individuals.'],
  ['Septuagint', 'bible', 'The Greek translation of the Hebrew scriptures made from the 3rd century BCE. It is the Old Testament of the Orthodox Church.'],
  ['Deuterocanonical books', 'bible', 'Books such as Tobit, Judith, Wisdom and Maccabees, found in the Septuagint and kept in Orthodox and Catholic Bibles but not Protestant ones.'],
  ['Trinity', 'bible', 'The Christian belief in one God in three persons: the Father, the Son and the Holy Spirit.'],
  ['Eucharist', 'bible', 'The Christian rite of bread and wine recalling the Last Supper, also called Holy Communion or the Divine Liturgy\'s offering.'],
  ['Surah', 'quran', 'A chapter of the Qur\'an. There are 114, arranged roughly from longest to shortest after the opening surah.'],
  ['Ayah', 'quran', 'A verse of the Qur\'an; the word also means "sign." The Qur\'an has 6,236.'],
  ['Juz', 'quran', 'One of 30 equal parts of the Qur\'an, used to read it all in a month, especially during Ramadan.'],
  ['Hadith', 'quran', 'A report of what the Prophet Muhammad said or did. Collections of hadith guide Islamic law and practice alongside the Qur\'an.'],
  ['Sunnah', 'quran', 'The example and way of life of the Prophet Muhammad, known through the hadith.'],
  ['Tafsir', 'quran', 'Commentary on the Qur\'an explaining its meaning, context and language.'],
  ['Tawhid', 'quran', 'The oneness of God, the central teaching of Islam.'],
  ['Shahada', 'quran', 'The Islamic declaration of faith: there is no god but God, and Muhammad is the messenger of God.'],
  ['Covenant', 'all', 'A binding agreement between God and people, such as with Noah, Abraham and Israel at Sinai; Christians also speak of a new covenant in Jesus.'],
  ['Prophet', 'all', 'Someone through whom God speaks to people. All three traditions honor prophets such as Abraham and Moses, though they count them differently.'],
  ['Messiah', 'all', '"Anointed one." Jews await the Messiah; Christians believe Jesus is the Messiah (Christ); the Qur\'an also calls Jesus al-Masih.'],
  ['Canon', 'all', 'The list of books a community accepts as scripture. The Jewish, Christian and Islamic canons differ.'],
  ['Revelation', 'all', 'God making himself or his will known. Each tradition understands how its scripture was revealed differently.'],
  ['Sabbath', 'all', 'The day of rest: Saturday in Judaism, Sunday (the Lord\'s Day) for most Christians; Islam has Friday congregational prayer instead.'],
  ['Kosher and halal', 'all', 'Food that is permitted under Jewish law (kosher) or Islamic law (halal), covering which animals may be eaten and how they are prepared.'],
  ['Rabbi, priest and imam', 'all', 'Religious teachers and leaders: a rabbi teaches Jewish law, a priest leads Christian worship and sacraments, an imam leads Muslim prayer.'],
  ['Pilgrimage', 'all', 'A sacred journey: to Jerusalem in ancient Judaism and Christianity, and the Hajj to Mecca, required once in a lifetime of Muslims who are able.'],
  ['Abrahamic', 'all', 'The faiths that trace their belief in one God back to Abraham: Judaism, Christianity and Islam.'],
];

/** Places important to the scriptures: [name, lat, lon, what it means in each tradition]. */
export const PLACES = [
  ['Jerusalem', 31.778, 35.235, { tanakh: 'City of David and site of the Temple, the center of Jewish worship and longing.', bible: 'Where Jesus taught, was crucified and rose, and where the church began at Pentecost.', quran: 'Al-Quds; the first direction of prayer and the place of the Night Journey, with the Al-Aqsa Mosque.' }],
  ['Mecca', 21.4225, 39.8262, { quran: 'Birthplace of Muhammad and site of the Kaaba, the direction of prayer and goal of the Hajj.' }],
  ['Medina', 24.4672, 39.6111, { quran: 'The city Muhammad moved to in 622 (the Hijra), where the first Muslim community formed. His mosque and tomb are here.' }],
  ['Hebron', 31.5245, 35.1105, { tanakh: 'Where Abraham bought the cave of Machpelah to bury Sarah; the patriarchs are buried there.', quran: 'Al-Khalil, "the Friend," named for Abraham, the friend of God.' }],
  ['Bethlehem', 31.7054, 35.2024, { tanakh: 'Home of Ruth and Boaz and birthplace of King David.', bible: 'Birthplace of Jesus.', quran: 'Not named, but tradition links Surah 19\'s account of Mary giving birth under a palm tree to it.' }],
  ['Nazareth', 32.6996, 35.3035, { bible: 'Where Mary received the annunciation and Jesus grew up.' }],
  ['Mount Sinai', 28.5394, 33.9750, { tanakh: 'Where God gave Moses the Torah and the Ten Commandments.', bible: 'Remembered as the mountain of the law and covenant.', quran: 'Mount Tur, where God spoke to Moses.' }],
  ['Ur', 30.9625, 46.1031, { tanakh: 'Ur of the Chaldees, where Abraham\'s family came from.' }],
  ['Babylon', 32.5364, 44.4208, { tanakh: 'Where the people of Judah were exiled after 586 BCE; Psalm 137 and Daniel are set there.', bible: 'A symbol of a proud, oppressive power in Revelation.', quran: 'Named in Surah 2:102 with the angels Harut and Marut.' }],
  ['The Nile and Egypt', 30.0444, 31.2357, { tanakh: 'Where Joseph rose to power and Israel was enslaved before the Exodus.', bible: 'Where the holy family fled from Herod.', quran: 'The land of Pharaoh in the stories of Joseph and Moses.' }],
  ['Damascus', 33.5138, 36.2765, { bible: 'Paul was converted on the road to Damascus.', quran: 'Tradition links the region of Sham (greater Syria) to many prophets.' }],
  ['Rome', 41.9028, 12.4964, { bible: 'Capital of the empire; Paul wrote to the church there and Peter and Paul were martyred there.' }],
];

/** Key dates. [year label, sort year (negative is BCE), event, scripture or 'all']. */
export const TIMELINE = [
  ['c. 1800 BCE', -1800, 'Traditional time of Abraham, ancestor in faith of all three traditions.', 'all'],
  ['c. 1250 BCE', -1250, 'The most common proposed date of the Exodus and Sinai (dates are debated).', 'tanakh'],
  ['c. 1000 BCE', -1000, 'David becomes king; Jerusalem becomes Israel\'s capital.', 'tanakh'],
  ['586 BCE', -586, 'Babylon destroys the First Temple; exile to Babylon.', 'tanakh'],
  ['538 BCE', -538, 'Cyrus of Persia lets the exiles return; the Temple is rebuilt.', 'tanakh'],
  ['c. 250 BCE', -250, 'The Septuagint translation into Greek begins in Alexandria.', 'bible'],
  ['c. 250 BCE', -249, 'The oldest Dead Sea Scrolls are copied.', 'tanakh'],
  ['c. 4 BCE', -4, 'Jesus is born (most estimates fall between 6 and 4 BCE).', 'bible'],
  ['c. 30 CE', 30, 'Jesus is crucified in Jerusalem; Christians proclaim his resurrection.', 'bible'],
  ['c. 50–100 CE', 50, 'The New Testament is written, beginning with Paul\'s letters.', 'bible'],
  ['70 CE', 70, 'Rome destroys the Second Temple.', 'tanakh'],
  ['c. 200 CE', 200, 'The Mishnah is written down.', 'tanakh'],
  ['325 CE', 325, 'The Council of Nicaea.', 'bible'],
  ['c. 500 CE', 500, 'The Babylonian Talmud is completed.', 'tanakh'],
  ['c. 570 CE', 570, 'Muhammad is born in Mecca.', 'quran'],
  ['610 CE', 610, 'The first revelation of the Qur\'an to Muhammad, in the cave of Hira.', 'quran'],
  ['622 CE', 622, 'The Hijra: Muhammad and his followers move to Medina; year 1 of the Islamic calendar.', 'quran'],
  ['632 CE', 632, 'Muhammad dies; the revelation is complete.', 'quran'],
  ['c. 650 CE', 650, 'Caliph Uthman has a standard written copy of the Qur\'an made.', 'quran'],
  ['691 CE', 691, 'The Dome of the Rock is completed in Jerusalem.', 'quran'],
  ['1008 CE', 1008, 'The Leningrad Codex, the oldest complete Hebrew Bible, is copied.', 'tanakh'],
  ['1947 CE', 1947, 'The Dead Sea Scrolls are discovered at Qumran.', 'all'],
];

// ---------- Reading plans ----------
// A reading is [scripture, section, chapter]: the Tanakh by Sefaria's book name, the Bible by book id,
// the Qur'an by surah number (chapter 1).
const T = (section, chapter) => ['tanakh', section, chapter];
const B = (section, chapter) => ['bible', section, chapter];
const Q = (surah) => ['quran', surah, 1];

const TANAKH_30 = [T('Genesis', 1), T('Genesis', 2), T('Genesis', 3), T('Genesis', 6), T('Genesis', 12), T('Genesis', 15), T('Genesis', 22), T('Genesis', 28), T('Genesis', 37), T('Genesis', 45),
  T('Exodus', 3), T('Exodus', 14), T('Exodus', 20), T('Leviticus', 19), T('Numbers', 6), T('Deuteronomy', 6), T('Deuteronomy', 30), T('Joshua', 1), T('Judges', 6), T('Ruth', 1),
  T('I Samuel', 3), T('I Samuel', 17), T('II Samuel', 7), T('I Kings', 18), T('Psalms', 1), T('Psalms', 23), T('Psalms', 51), T('Isaiah', 6), T('Isaiah', 40), T('Jeremiah', 31)];
const BIBLE_30 = [B('Matthew', 1), B('Matthew', 5), B('Matthew', 6), B('Matthew', 7), B('Matthew', 13), B('Matthew', 25), B('Matthew', 28), B('Mark', 1), B('Mark', 16),
  B('Luke', 1), B('Luke', 2), B('Luke', 10), B('Luke', 15), B('Luke', 24), B('John', 1), B('John', 3), B('John', 11), B('John', 15), B('John', 20), B('Acts', 2), B('Acts', 9),
  B('Romans', 8), B('Romans', 12), B('1 Corinthians', 13), B('1 Corinthians', 15), B('Galatians', 5), B('Ephesians', 2), B('Hebrews', 11), B('James', 2), B('Revelation', 21)];
const QURAN_30 = [1, 2, 3, 12, 18, 19, 20, 24, 31, 36, 49, 55, 56, 59, 67, 71, 76, 78, 87, 89, 93, 94, 96, 97, 103, 107, 108, 112, 113, 114].map(Q);

// Interleave readings from each list, one scripture per day in turn.
const weave = (lists, n) => Array.from({ length: n }, (_, i) => lists[i % lists.length][Math.floor(i / lists.length)]);

export const PLANS = [
  { id: 'foundations', title: 'Foundations Plan', blurb: 'Explore the Tanakh, Bible and Qur\'an', icon: 'book',
    readings: [T('Genesis', 1), B('John', 1), Q(1), T('Genesis', 12), B('Matthew', 5), Q(112), T('Exodus', 20), B('Luke', 15), Q(55), T('Deuteronomy', 6), B('Acts', 2), Q(19), T('Psalms', 23), B('1 Corinthians', 13)] },
  { id: 'comparison', title: 'Comparison Plan', blurb: 'Read key passages across all three', icon: 'scales',
    readings: [T('Genesis', 1), B('John', 1), Q(41), T('Genesis', 6), Q(71), T('Genesis', 22), B('Hebrews', 11), Q(37), T('Genesis', 37), Q(12),
      T('Exodus', 3), Q(20), B('Luke', 1), B('Luke', 2), Q(19), T('Jonah', 1), B('Matthew', 12), Q(10), T('Deuteronomy', 6), B('Mark', 12), Q(112)],
    themes: ['Creation', 'Creation', 'Creation', 'Noah', 'Noah', 'Abraham\'s sacrifice', 'Abraham\'s sacrifice', 'Abraham\'s sacrifice', 'Joseph', 'Joseph',
      'Moses at the burning bush', 'Moses at the burning bush', 'Mary and Jesus', 'Mary and Jesus', 'Mary and Jesus', 'Jonah', 'Jonah', 'Jonah', 'One God', 'One God', 'One God'] },
  { id: 'overview30', title: '30-Day Overview', blurb: 'A high-level study of each text', icon: 'calendar',
    readings: weave([TANAKH_30.filter((_, i) => i % 3 === 0), BIBLE_30.filter((_, i) => i % 3 === 0), QURAN_30.filter((_, i) => i % 3 === 0)], 30) },
  { id: 'deep90', title: '90-Day Deep Study', blurb: 'A structured, in-depth reading plan', icon: 'chart',
    readings: weave([TANAKH_30, BIBLE_30, QURAN_30], 90) },
];

/** A custom plan: every chapter of one book, split into days of `perDay` chapters. */
export function customPlan(read, section, chapters, perDay = 1) {
  const per = Math.max(1, Math.min(10, Math.floor(perDay) || 1));
  const all = read === 'quran' ? [Q(section)] : Array.from({ length: chapters }, (_, i) => [read, section, i + 1]);
  const days = [];
  for (let i = 0; i < all.length; i += per) days.push(all.slice(i, i + per));
  return { id: 'custom', title: 'Custom Plan', blurb: `${section}, ${per} chapter${per > 1 ? 's' : ''} a day`, icon: 'sliders', days, readings: all, perDay: per, read, section };
}

/** Percent of a plan's readings done. */
export const planPercent = (plan, done = []) => (plan.readings.length ? Math.round((new Set(done.filter((i) => i < plan.readings.length)).size / plan.readings.length) * 100) : 0);
