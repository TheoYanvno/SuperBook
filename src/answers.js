// "Ask the sand": short, neutral comparisons of the three scriptures and faiths.
// Each topic has keywords; the question is matched to the topic with the most keyword hits.
// Wording describes what each tradition believes; beliefs also vary within each tradition.

export const TOPICS = [
  {
    id: 'overview',
    title: 'The three books',
    keywords: ['difference', 'differences', 'different', 'compare', 'comparison', 'overview', 'books', 'what are', 'summary', 'all three'],
    answer: [
      'The Tanakh is the Hebrew Bible of Judaism: 24 books in three parts, Torah, Prophets and Writings.',
      'The Christian Bible contains those same Hebrew scriptures as the Old Testament, plus the New Testament about Jesus and the early church.',
      "The Qur'an is the scripture of Islam: 114 surahs that Muslims believe were revealed by God to the Prophet Muhammad.",
      'All three trace their faith back to Abraham and worship one God, but they differ on Jesus, on Muhammad, and on which revelation is final.',
    ],
  },
  {
    id: 'god',
    title: 'God',
    keywords: ['god', 'allah', 'yahweh', 'hashem', 'trinity', 'monotheism', 'one god', 'father', 'holy spirit', 'divine', 'lord'],
    answer: [
      'All three are monotheistic and believe in the God of Abraham.',
      'Judaism stresses God\'s absolute oneness, expressed in the Shema: "Hear, O Israel: the LORD our God, the LORD is one."',
      'Most Christians believe in the Trinity: one God in three persons, the Father, the Son (Jesus) and the Holy Spirit.',
      "Islam stresses tawhid, God's absolute oneness. The Qur'an (Surah 112) teaches that God neither begets nor is begotten, so Islam rejects the Trinity. Allah is the Arabic word for God.",
    ],
  },
  {
    id: 'jesus',
    title: 'Jesus',
    keywords: ['jesus', 'christ', 'isa', 'son of god', 'crucifixion', 'crucified', 'cross', 'resurrection', 'resurrected'],
    answer: [
      'Judaism generally sees Jesus as a Jewish teacher of the first century, not the Messiah and not divine.',
      'Christianity teaches that Jesus is the Son of God and the Messiah, who died by crucifixion and rose from the dead.',
      "Islam honors Jesus (Isa) as one of the greatest prophets and as the Messiah, born of the virgin Mary, who performed miracles. Muslims do not believe he is divine, and the Qur'an (4:157) states he was not killed or crucified; most Muslims believe God raised him up and that he will return.",
    ],
  },
  {
    id: 'muhammad',
    title: 'Muhammad and the prophets',
    keywords: ['muhammad', 'mohammed', 'prophet', 'prophets', 'messenger', 'seal', 'last prophet', 'final prophet'],
    answer: [
      'All three honor many of the same prophets, including Abraham, Moses, David and Elijah.',
      'In Judaism, Moses is the greatest prophet, and the age of prophecy is considered to have ended in ancient times.',
      'Christianity sees the prophets as pointing toward Jesus, whom it regards as more than a prophet.',
      "Islam teaches that Muhammad (c. 570–632 CE) is the final prophet, the \"Seal of the Prophets,\" and that earlier prophets brought the same core message. Judaism and Christianity do not recognize Muhammad as a prophet.",
    ],
  },
  {
    id: 'structure',
    title: 'How the books are organized',
    keywords: ['how many', 'chapters', 'verses', 'surah', 'surahs', 'structure', 'organized', 'order', 'testament', 'old testament', 'new testament', 'canon', 'length', 'longest'],
    answer: [
      "The Tanakh has 24 books (by the traditional Jewish count): Torah (5 books), Nevi'im (Prophets) and Ketuvim (Writings). The name Tanakh comes from those three initials.",
      'The Protestant Bible has 66 books: 39 in the Old Testament and 27 in the New. Catholic Bibles have 73, and Eastern Orthodox Bibles include a few more.',
      "The Qur'an has 114 surahs (chapters) and 6,236 verses (ayat). After the short opening surah, the surahs are arranged roughly from longest to shortest, not in the order they were revealed.",
    ],
  },
  {
    id: 'language',
    title: 'Original languages',
    keywords: ['language', 'languages', 'hebrew', 'greek', 'arabic', 'aramaic', 'translation', 'translated', 'original'],
    answer: [
      'The Tanakh was written mostly in Hebrew, with some chapters of Daniel and Ezra in Aramaic.',
      'The Christian Old Testament comes from those same Hebrew and Aramaic texts; the New Testament was written in Greek.',
      "The Qur'an is in Arabic. Muslims regard translations as interpretations of its meaning, and recite it in Arabic in prayer.",
    ],
  },
  {
    id: 'revelation',
    title: 'Where the books came from',
    keywords: ['written', 'wrote', 'author', 'authors', 'revealed', 'revelation', 'came from', 'origin', 'sinai', 'compiled', 'when'],
    answer: [
      'Jewish tradition holds that God gave the Torah to Moses at Mount Sinai, along with an Oral Torah later written down in the Mishnah and Talmud. The rest of the Tanakh was written over many centuries.',
      'Christians see the Bible as inspired by God through many human authors; the New Testament books were written in the first century CE.',
      "Muslims believe the Qur'an was revealed word for word by God to Muhammad through the angel Gabriel (Jibril) over about 23 years, from 610 to 632 CE, and it was compiled into one standard text under Caliph Uthman around 650 CE.",
    ],
  },
  {
    id: 'afterlife',
    title: 'Afterlife',
    keywords: ['afterlife', 'heaven', 'hell', 'paradise', 'jannah', 'judgment', 'judgement', 'death', 'die', 'olam haba', 'soul'],
    answer: [
      "Judaism focuses mainly on living rightly in this world. Traditional belief includes the World to Come (Olam Ha-Ba) and the resurrection of the dead, but views vary widely.",
      'Christianity teaches resurrection, a final judgment, and eternal life with God in heaven, with hell as separation from God.',
      "Islam teaches a Day of Judgment when all people are resurrected and judged by God, followed by Paradise (Jannah) or Hell (Jahannam), with great emphasis on God's mercy.",
    ],
  },
  {
    id: 'salvation',
    title: 'Sin and salvation',
    keywords: ['sin', 'sins', 'salvation', 'saved', 'forgiveness', 'forgive', 'original sin', 'grace', 'repent', 'repentance', 'atonement'],
    answer: [
      'Judaism teaches that people are born with both good and bad inclinations, and that sin is answered through repentance (teshuvah), prayer and good deeds; Yom Kippur is the Day of Atonement.',
      'Most Christian traditions teach original sin, inherited from Adam, and that salvation comes through God\'s grace and faith in Jesus\'s death and resurrection.',
      'Islam rejects inherited sin: every person is born pure and is responsible for their own deeds. Forgiveness comes through sincere repentance (tawbah) to a merciful God.',
    ],
  },
  {
    id: 'law',
    title: 'Religious law',
    keywords: ['law', 'laws', 'commandments', 'ten commandments', 'rules', 'halakha', 'sharia', 'mitzvot', 'pillars', 'five pillars'],
    answer: [
      'Judaism counts 613 commandments (mitzvot) in the Torah. Jewish law, halakha, guides daily life, from prayer to food to the Sabbath.',
      'Most Christians believe the ritual laws of Moses were fulfilled in Jesus, while moral teachings such as the Ten Commandments and the command to love God and neighbor remain central.',
      "Islamic law, Sharia, is drawn from the Qur'an and the Sunnah (Muhammad's example). Core practice is summed up in the Five Pillars: faith, prayer, charity, fasting in Ramadan and pilgrimage to Mecca.",
    ],
  },
  {
    id: 'abraham',
    title: 'Abraham and shared roots',
    keywords: ['abraham', 'ibrahim', 'isaac', 'ishmael', 'abrahamic', 'shared', 'common', 'similar', 'similarities', 'same', 'roots'],
    answer: [
      'All three are called Abrahamic faiths because they look to Abraham as a father of faith in one God.',
      'Jews trace their ancestry through Abraham\'s son Isaac and grandson Jacob (Israel). Christians see Abraham as a model of faith for all believers.',
      "Islamic tradition emphasizes Abraham's son Ishmael as an ancestor of the Arabs and of Muhammad, and teaches that Abraham and Ishmael built the Kaaba in Mecca.",
      'They share many stories and figures, including Adam, Noah, Moses, David, Solomon and the angel Gabriel.',
    ],
  },
  {
    id: 'mary',
    title: 'Mary',
    keywords: ['mary', 'maryam', 'virgin', 'mother of jesus'],
    answer: [
      'Mary does not have a role in Jewish scripture or belief.',
      'Christians honor Mary as the mother of Jesus; Catholic and Orthodox Christians give her special veneration.',
      "The Qur'an honors Mary (Maryam) highly: she is the only woman named in it, Surah 19 is named after her, and it affirms the virgin birth of Jesus.",
    ],
  },
  {
    id: 'moses',
    title: 'Moses',
    keywords: ['moses', 'musa', 'exodus', 'pharaoh', 'egypt', 'torah'],
    answer: [
      'In Judaism, Moses is the greatest prophet, who led the Israelites out of Egypt and received the Torah at Sinai.',
      'Christians honor Moses as the lawgiver of the Old Testament and see him as foreshadowing Jesus.',
      "In Islam, Moses (Musa) is a major prophet who received the Tawrat (Torah); he is the prophet mentioned by name most often in the Qur'an.",
    ],
  },
  {
    id: 'messiah',
    title: 'The Messiah',
    keywords: ['messiah', 'mashiach', 'second coming', 'return', 'end times', 'end of days'],
    answer: [
      'Judaism awaits a future Messiah, a human descendant of King David who will bring peace and restore Israel.',
      'Christians believe Jesus is the Messiah (Christ means "anointed one") and that he will come again.',
      'Islam also calls Jesus the Messiah (al-Masih) and teaches that he will return before the Day of Judgment.',
    ],
  },
  {
    id: 'worship',
    title: 'Prayer and worship',
    keywords: ['pray', 'prayer', 'prayers', 'worship', 'synagogue', 'church', 'mosque', 'service', 'salah'],
    answer: [
      'Jews traditionally pray three times a day and gather in synagogues, especially on the Sabbath, when the Torah is read aloud from a scroll.',
      "Christians gather in churches, usually on Sunday, for worship that often includes Bible readings, prayer, songs and communion. The Lord's Prayer is shared by nearly all Christians.",
      'Muslims pray five times a day (salah) facing Mecca, and gather in mosques for the Friday congregational prayer (Jumu\'ah).',
    ],
  },
  {
    id: 'holidays',
    title: 'Holy days',
    keywords: ['holiday', 'holidays', 'holy day', 'sabbath', 'shabbat', 'sunday', 'friday', 'passover', 'easter', 'christmas', 'ramadan', 'eid', 'yom kippur', 'fast', 'fasting'],
    answer: [
      'Judaism: the Sabbath (Shabbat) from Friday sunset to Saturday nightfall, plus Passover, Rosh Hashanah (New Year) and Yom Kippur (Day of Atonement).',
      'Christianity: Sunday worship, Christmas (the birth of Jesus) and Easter (his resurrection), with Lent as a season of fasting.',
      'Islam: Friday prayer, the fasting month of Ramadan, Eid al-Fitr at its end, and Eid al-Adha during the Hajj pilgrimage.',
    ],
  },
  {
    id: 'places',
    title: 'Holy places',
    keywords: ['jerusalem', 'mecca', 'makkah', 'medina', 'bethlehem', 'holy land', 'holy city', 'temple', 'kaaba', 'pilgrimage', 'hajj', 'places'],
    answer: [
      'Jerusalem is holy to all three faiths.',
      'For Jews, it is the site of the ancient Temple; the Western Wall is the holiest place where Jews pray today.',
      'For Christians, it is where Jesus was crucified and rose, marked by the Church of the Holy Sepulchre; Bethlehem and Nazareth are also important.',
      "For Muslims, Mecca (with the Kaaba) and Medina are the holiest cities, and Jerusalem's Al-Aqsa Mosque is the third holiest site.",
    ],
  },
  {
    id: 'food',
    title: 'Food rules',
    keywords: ['food', 'eat', 'eating', 'diet', 'kosher', 'halal', 'pork', 'alcohol', 'wine', 'meat'],
    answer: [
      'Judaism keeps kosher laws from the Torah: no pork or shellfish, meat and dairy kept separate, and animals slaughtered in a prescribed way.',
      'Most Christians follow no religious food laws, though many observe fasts such as Lent.',
      'Islam follows halal rules: no pork, no alcohol, and meat slaughtered in God\'s name.',
    ],
  },
  {
    id: 'angels',
    title: 'Angels',
    keywords: ['angel', 'angels', 'gabriel', 'jibril', 'michael', 'satan', 'devil', 'iblis', 'demons', 'jinn'],
    answer: [
      'All three believe in angels as messengers of God, and Gabriel appears in all three: in the Book of Daniel, announcing the birth of Jesus in the Gospel of Luke, and bringing the Qur\'an to Muhammad.',
      'In the Tanakh, "the satan" is an accuser who serves within God\'s court; Christianity sees Satan as the devil, a fallen angel; Islam teaches that Iblis, one of the jinn, refused to bow to Adam.',
    ],
  },
];

const FALLBACK = {
  id: 'unknown',
  title: 'Ask me about…',
  answer: [
    "The sand doesn't know that one yet.",
    'Try asking about God, Jesus, Muhammad, Moses, Abraham, Mary, how the books are organized, original languages, the afterlife, religious law, prayer, holy days, holy places or food rules.',
  ],
};

export const normalize = (text) => ` ${text.toLowerCase().replace(/[^a-z0-9'\s]/g, ' ').replace(/\s+/g, ' ').trim()} `;

/** Picks the topic whose keywords best match the question. */
export function answer(question) {
  const q = normalize(question);
  if (q.trim().length < 2) return FALLBACK;
  let best = null, bestScore = 0;
  for (const topic of TOPICS) {
    // whole-word matches; longer phrases count more ("son of god" beats "god")
    const score = topic.keywords.reduce((sum, k) => sum + (q.includes(` ${k} `) ? k.split(' ').length + 1 : 0), 0);
    if (score > bestScore) { best = topic; bestScore = score; }
  }
  return best ?? FALLBACK;
}

export const SUGGESTIONS = [
  'What is the difference between the books?',
  'How do they see Jesus?',
  'How many chapters does each have?',
  'What languages were they written in?',
  'What do they say about the afterlife?',
  'What do they have in common?',
];
