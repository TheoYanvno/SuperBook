// "Ask the sand": short, neutral comparisons of the three scriptures and faiths.
// Each topic has keywords; the question is matched to the topic with the most keyword hits.
// A keyword starting with ~ is "weak": all weak matches together count 1 point, so a general word ("difference",
// "Torah") doesn't outweigh a specific one ("Medinan", "synagogue") in the same question.
// Wording describes what each tradition believes; beliefs also vary within each tradition.

export const TOPICS = [
  {
    id: 'differences',
    title: 'How the books differ',
    keywords: ['~difference', '~differences', '~difference between', '~different', '~differ', '~compare', '~comparison', '~contrast', '~versus', '~vs', '~distinguish', '~unique'],
    answer: [
      "Who is speaking: the Tanakh and the Bible are mostly narrative, law, poetry, prophecy and letters written by people about God. The Qur'an speaks almost entirely as God addressing Muhammad and humanity, often using the royal \"We.\"",
      "Scope: the Tanakh tells the story of creation and of God's covenant with the people of Israel. The Christian Bible keeps those books as the Old Testament and adds the New Testament about Jesus and the early church. The Qur'an retells many of the same figures briefly to draw lessons, instead of telling one continuous history.",
      "How they relate: the Christian Bible contains the Hebrew scriptures. The Qur'an affirms the Torah (Tawrat), the Psalms (Zabur) and the Gospel (Injil) as earlier revelations, but Muslims believe their texts changed over time and that the Qur'an is the final, preserved revelation.",
      "Time span: the Tanakh was written over roughly a thousand years, the New Testament within about 50 years, and the Qur'an over 23 years.",
    ],
  },
  {
    id: 'overview',
    title: 'The three books',
    keywords: ['overview', '~books', '~what are', 'summary', '~all three', 'tell me about', 'introduce', 'introduction'],
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
    keywords: ['how many', 'chapters', 'verses', 'surah', 'surahs', 'structure', 'organized', 'order', '~testament', '~old testament', '~new testament', 'canon', 'length', 'longest'],
    answer: [
      "The Tanakh has 24 books (by the traditional Jewish count): Torah (5 books), Nevi'im (Prophets) and Ketuvim (Writings). The name Tanakh comes from those three initials.",
      'The Protestant Bible has 66 books: 39 in the Old Testament and 27 in the New. Catholic Bibles have 73, and Eastern Orthodox Bibles include a few more.',
      "The Qur'an has 114 surahs (chapters) and 6,236 verses (ayat). After the short opening surah, the surahs are arranged roughly from longest to shortest, not in the order they were revealed.",
    ],
  },
  {
    id: 'language',
    title: 'Original languages',
    keywords: ['language', 'languages', 'hebrew', 'greek', 'arabic', 'aramaic', 'latin', 'translation', 'translations', 'translated', 'original', 'koine', 'septuagint', 'vulgate', 'king james'],
    answer: [
      'The Tanakh was written in Biblical Hebrew, with a few parts in Aramaic: about half of Daniel (2:4–7:28), parts of Ezra (4:8–6:18 and 7:12–26) and one verse of Jeremiah (10:11).',
      'Around the 3rd–2nd centuries BCE, Jews in Alexandria translated the Hebrew scriptures into Greek. That translation, the Septuagint, became the Old Testament of the early church.',
      'The New Testament was written in Koine (common) Greek, though Jesus himself most likely spoke Aramaic. Famous translations include the Latin Vulgate (c. 400 CE) and the English King James Version (1611).',
      "The Qur'an is in Classical Arabic. The earliest copies had no vowel marks and few dots, which were added within the next century. Muslims see translations as interpretations of its meaning and recite it in Arabic in prayer.",
    ],
  },
  {
    id: 'revelation',
    title: 'How each faith sees its scripture',
    keywords: ['revealed', 'revelation', 'inspired', 'inspiration', 'word of god', 'came from', 'origin', 'origins', 'sinai', 'sacred text'],
    answer: [
      'Jewish tradition holds that God gave the Torah to Moses at Mount Sinai, along with an Oral Torah later written down in the Mishnah and Talmud. The Prophets and Writings are seen as inspired, but at a lower level than the Torah.',
      'Christians see the whole Bible as inspired by God through human authors, who wrote in their own styles and settings.',
      "Muslims believe the Qur'an is the literal, uncreated word of God, revealed word for word to Muhammad through the angel Gabriel (Jibril). The first revelation came in the cave of Hira near Mecca in 610 CE.",
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
    keywords: ['moses', 'musa', 'exodus', 'pharaoh', 'egypt', '~torah'],
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
    keywords: ['pray', 'prayer', 'prayers', 'worship', '~synagogue', '~church', '~mosque', 'service', 'salah'],
    answer: [
      'Jews traditionally pray three times a day and gather in synagogues, especially on the Sabbath, when the Torah is read aloud from a scroll.',
      "Christians gather in churches, usually on Sunday, for worship that often includes Bible readings, prayer, songs and communion. The Lord's Prayer is shared by nearly all Christians.",
      'Muslims pray five times a day (salah) facing Mecca, and gather in mosques for the Friday congregational prayer (Jumu\'ah).',
    ],
  },
  {
    id: 'holidays',
    title: 'Holy days',
    keywords: ['holiday', 'holidays', 'holy day', 'holy days', 'sabbath', 'shabbat', 'sunday', 'friday', 'passover', 'easter', 'christmas', 'ramadan', 'eid', 'yom kippur', 'fast', 'fasting'],
    answer: [
      'Judaism: the Sabbath (Shabbat) from Friday sunset to Saturday nightfall, plus Passover, Rosh Hashanah (New Year) and Yom Kippur (Day of Atonement).',
      'Christianity: Sunday worship, Christmas (the birth of Jesus) and Easter (his resurrection), with Lent as a season of fasting.',
      'Islam: Friday prayer, the fasting month of Ramadan, Eid al-Fitr at its end, and Eid al-Adha during the Hajj pilgrimage.',
    ],
  },
  {
    id: 'places',
    title: 'Holy places',
    keywords: ['jerusalem', 'mecca', 'makkah', 'medina', 'bethlehem', 'holy land', 'holy city', 'temple', 'kaaba', 'pilgrimage', 'hajj', 'places', 'place', 'holy place', 'holy places', 'holiest', 'sacred places'],
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
  {
    id: 'manuscripts',
    title: 'Oldest copies and how they were preserved',
    keywords: ['manuscript', 'manuscripts', 'oldest copy', 'oldest copies', 'dead sea scrolls', 'scrolls', 'scroll', 'codex', 'preserved', 'preservation', 'copies', 'copied', 'memorize', 'memorized', 'hafiz', 'changed', 'accurate', 'reliable'],
    answer: [
      'Tanakh: the oldest known biblical text is the Priestly Blessing (Numbers 6:24–26) on two tiny silver scrolls from Ketef Hinnom, Jerusalem, from about 600 BCE. The Dead Sea Scrolls (about 250 BCE–68 CE) include parts of every book except Esther. The oldest complete Hebrew Bible is the Leningrad Codex (1008 CE). Jewish scribes, the Masoretes, copied the text with strict letter-counting rules.',
      'New Testament: the oldest fragment is a scrap of the Gospel of John (Papyrus 52) from the 2nd century. The oldest complete New Testament is in Codex Sinaiticus (mid-4th century). Over 5,000 Greek manuscripts survive, more than for any other ancient book.',
      "Qur'an: it was memorized by many of Muhammad's companions and written on parchment, bone and palm leaves. The Birmingham Qur'an manuscript has been radiocarbon dated to between 568 and 645 CE. Millions of Muslims today, called hafiz, have memorized the whole Qur'an.",
    ],
  },
  {
    id: 'age',
    title: 'How old each book is',
    keywords: ['how old', 'how many years', '~old', 'oldest', 'older', 'age', 'ages', 'ancient', 'when', 'date', 'dates', 'dated', 'century', 'centuries', 'years ago', 'newest', 'first written', 'timeline'],
    answer: [
      'Tanakh (oldest): Jewish tradition dates the giving of the Torah at Sinai to more than 3,000 years ago. Scholars date the oldest parts, such as early poems, to around 1000 BCE or before, with most books written and edited between about 800 and 400 BCE. Daniel was finished around 165 BCE, and the list of books was settled by about the 2nd century CE.',
      "New Testament (about 1,900–2,000 years old): Paul's letters are the earliest books, starting around 50 CE. The Gospels followed between about 65 and 100 CE, and Revelation around 95 CE. The 27-book list was first given in full by Athanasius in 367 CE.",
      "Qur'an (about 1,400 years old, the newest of the three): revealed from 610 to 632 CE and gathered into one standard text under Caliph Uthman around 650 CE.",
    ],
  },
  {
    id: 'contributors',
    title: 'Who wrote them',
    keywords: ['who wrote', 'wrote', 'write', 'author', 'authors', 'writer', 'writers', 'contributor', 'contributors', 'scribe', 'scribes', 'compiled', 'compile', 'collected', 'put together', 'editor', 'editors'],
    answer: [
      'Tanakh: Jewish tradition credits Moses with the Torah, David with many of the Psalms, Solomon with Proverbs, Ecclesiastes and the Song of Songs, and the prophets with their own books, such as Isaiah, Jeremiah and Ezekiel. Ezra and the "Men of the Great Assembly" are said to have gathered the scriptures after the Babylonian exile. Most scholars see many authors and editors working over centuries.',
      'New Testament: the four Gospels are traditionally credited to Matthew, Mark, Luke and John. Luke also wrote Acts. Paul wrote the largest number of books: 13 letters carry his name, and scholars agree he wrote at least seven. James, Peter and Jude wrote shorter letters, and Revelation is credited to John on the island of Patmos.',
      "Qur'an: Muslims believe God is its only author and Muhammad, who tradition says could not read or write, was the messenger who received it. Companions such as Zayd ibn Thabit wrote it down. The first collected copy was made under Caliph Abu Bakr, and Caliph Uthman sent out a standard copy around 650 CE.",
    ],
  },
  {
    id: 'region',
    title: 'Where they were written',
    keywords: ['where were', 'where was', 'where did', 'where is it from', 'region', 'regions', 'geography', 'location', 'map', 'country', 'arabia', 'middle east', 'babylon', 'galilee', 'judea', 'canaan', 'meccan', 'medinan'],
    answer: [
      'Tanakh: mostly in the Land of Israel (ancient Canaan), in the kingdoms of Israel and Judah. Some books come from exile: Ezekiel and parts of Daniel were set in Babylon (modern Iraq), and Esther in Persia (modern Iran).',
      'New Testament: Jesus lived in Galilee and Judea under Roman rule. The books themselves were written across the Roman Mediterranean: Paul wrote letters to churches in Greece, Asia Minor (modern Turkey) and Rome, and Revelation was written on the Greek island of Patmos.',
      "Qur'an: the Hijaz region of western Arabia (modern Saudi Arabia). Surahs revealed before 622 CE are called Meccan (traditionally 86 of them) and focus on faith and the afterlife. Those revealed after the move to Medina are called Medinan (28) and include more laws for the new community.",
    ],
  },
  {
    id: 'themes',
    title: 'Main message',
    keywords: ['message', 'main message', 'theme', 'themes', 'main idea', 'main point', 'purpose', '~teach', '~teaches', '~teachings', 'lesson', 'lessons', 'central', 'bible about', 'tanakh about', "qur'an about", 'quran about', 'books about', '~story', '~stories'],
    answer: [
      "Tanakh: the covenant between God and the people of Israel, told through creation, the patriarchs, the Exodus from Egypt, the giving of the Law, the kings, exile and return. The prophets call the people back to faithfulness and justice.",
      "New Testament: the life, teaching, death and resurrection of Jesus, God's love and forgiveness offered to all people through him, and how the first Christians formed the church.",
      "Qur'an: the oneness of God, guidance for how to live, stories of earlier prophets as lessons, God's mercy and justice, and every person's accountability on the Day of Judgment.",
    ],
  },
  {
    id: 'creation',
    title: 'Creation, Adam and Noah',
    keywords: ['creation', 'created', 'create', 'adam', 'eve', 'hawwa', 'garden', 'eden', 'universe', 'beginning', 'genesis', 'first man', 'first woman', 'noah', 'nuh', 'flood', 'ark', 'world'],
    answer: [
      'The Tanakh opens with Genesis: God creates the world in six days and rests on the seventh, forms Adam and Eve, and places them in the Garden of Eden until they disobey and are sent out.',
      'Christians share the Genesis account, and the Gospel of John adds that all things were made through the Word (Jesus). Many Christians believe the first disobedience passed on "original sin," which Judaism does not teach.',
      "The Qur'an also describes creation in six days (or periods) and tells of Adam and his wife in the Garden. In the Qur'an they repent and God forgives them, so Islam does not teach original sin.",
      'All three tell of Noah (Nuh in Arabic), the flood and the ark.',
    ],
  },
  {
    id: 'followers',
    title: 'Followers today',
    keywords: ['followers', 'how many people', 'how many followers', 'how many christians', 'how many muslims', 'how many jews', 'population', 'members', 'believers', 'adherents', 'denominations', 'branches', 'sects', 'sunni', 'shia', 'catholic', 'protestant', 'orthodox', 'reform', 'largest', 'biggest', 'popular'],
    answer: [
      'Christianity is the largest religion, with about 2.4 billion followers. Its main branches are Catholic (about 1.4 billion), Protestant and Eastern Orthodox.',
      'Islam is the second largest, with about 2 billion followers. About 85–90% are Sunni and most of the rest are Shia.',
      'Judaism has about 16 million followers, mostly in Israel and the United States. Its main movements include Orthodox, Conservative and Reform.',
      'These are rounded recent estimates; counts vary by source.',
    ],
  },
  {
    id: 'reading',
    title: 'How the books are read',
    keywords: ['read', 'reading', 'recite', 'recited', 'recitation', 'study', 'studied', 'chant', 'chanted', 'portion', 'lectionary', 'juz', 'tajwid', 'out loud', 'aloud'],
    answer: [
      "In synagogues, the Torah is read aloud in Hebrew from a handwritten scroll. It is divided into 54 weekly portions, so the whole Torah is read every year, and the cycle restarts on the holiday of Simchat Torah.",
      'Christians read the Bible in their own languages. Many churches follow a lectionary, a set schedule of readings, and many Christians read and study it at home.',
      "The Qur'an is recited in Arabic, following rules of pronunciation and melody called tajwid. It is divided into 30 parts (juz), and many Muslims recite the whole Qur'an during the month of Ramadan.",
    ],
  },
  {
    id: 'ethics',
    title: 'Treating others',
    keywords: ['ethics', 'moral', 'morals', 'morality', 'love', 'loving', 'neighbor', 'neighbour', 'golden rule', 'charity', 'kindness', 'justice', 'poor', 'treat others', 'good deeds', 'save a life'],
    answer: [
      'Tanakh: "Love your neighbor as yourself" (Leviticus 19:18). The sage Hillel summed up the Torah as: "What is hateful to you, do not do to your neighbor." The Mishnah teaches that whoever saves one life saves a whole world.',
      'New Testament: Jesus called loving God and loving your neighbor the greatest commandments, and taught the Golden Rule: "Do to others what you would have them do to you" (Matthew 7:12).',
      "Qur'an: charity (zakat) is one of the Five Pillars. Surah 5:32 teaches that saving one life is like saving all of humanity, and a well-known saying of Muhammad is that none of you truly believes until he wants for his brother what he wants for himself.",
    ],
  },
  {
    id: 'names',
    title: 'What the names mean',
    keywords: ['mean', 'meaning', 'meanings', 'name', 'names', 'named', 'called', 'stand for', 'stands for', 'word bible', 'word quran', 'word torah', 'gospel'],
    answer: [
      'Tanakh is an acronym of its three parts: Torah (teaching or instruction), Nevi\'im (Prophets) and Ketuvim (Writings).',
      'Bible comes from the Greek "ta biblia," meaning "the books." Testament means covenant, and Gospel means "good news," from the Greek euangelion (Injil in Arabic).',
      "Qur'an means \"the recitation\" in Arabic, from the first word revealed to Muhammad: \"Recite!\" (Surah 96:1). Its chapters are surahs and its verses are ayat, which also means \"signs.\"",
    ],
  },
];

const FALLBACK = {
  id: 'unknown',
  title: 'Ask me about…',
  answer: [
    "The sand doesn't know that one yet.",
    'Try asking how old each book is, who wrote them, where they were written, what languages they were written in, how they differ, or about God, Jesus, Muhammad, Moses, Mary, creation, the afterlife, law, prayer, holy days, holy places, food rules, followers today or the oldest manuscripts.',
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
    let score = 0, weakHit = 0;
    for (const k of topic.keywords) {
      const weak = k.startsWith('~');
      const word = weak ? k.slice(1) : k;
      if (!q.includes(` ${word} `)) continue;
      if (weak) weakHit = 1;                           // weak words add 1 point in total
      else score += word.split(' ').length + 1;
    }
    score += weakHit;
    if (score > bestScore) { best = topic; bestScore = score; }
  }
  return best ?? FALLBACK;
}

export const SUGGESTIONS = [
  'How are the books different?',
  'How old is each book?',
  'Who wrote them?',
  'Where were they written?',
  'How do they see Jesus?',
  'How many chapters does each have?',
  'What languages were they written in?',
  'What do they say about the afterlife?',
  'What do they have in common?',
];
