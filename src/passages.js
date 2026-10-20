// Historical context for well-known passages: who first heard them, when, and what was happening.
// Dates are the common scholarly estimates; religious traditions may date or attribute some texts differently,
// and both views are given where they differ.
//
// Each passage has `match` patterns (normalized text, see answers.js) and short context paragraphs.

/** Words that show a question is about a passage's background, not just mentioning it in passing. */
export const CONTEXT_WORDS = ['context', 'background', 'histor', 'setting', 'when was', 'why was', 'written', 'mean', 'about', 'explain', 'behind', 'situation', 'happening', 'audience', 'revealed', 'why did'];

export const PASSAGES = [
  {
    ref: 'Genesis 1',
    book: 'tanakh',
    match: ['genesis 1', 'genesis chapter 1'],
    context: [
      'Setting: the opening of the Torah, the story of God creating the world in six days and resting on the seventh.',
      'Jewish and Christian tradition credits the Torah to Moses. Many scholars think this chapter took its final form among priestly writers around the Babylonian exile (6th century BCE).',
      'Read against the myths of Israel’s neighbors, such as the Babylonian Enuma Elish, it makes a sharp point: the sun, moon and sea monsters are not gods but things one God made, and humans are made in God’s image rather than as servants of the gods.',
    ],
  },
  {
    ref: 'Exodus 20 (the Ten Commandments)',
    book: 'tanakh',
    match: ['exodus 20', 'exodus chapter 20', 'deuteronomy 5'],
    context: [
      'Setting: Mount Sinai, after Israel’s escape from slavery in Egypt. God gives the Ten Commandments as the heart of the covenant with Israel.',
      'The date of the Exodus is debated; the 13th century BCE is the most common proposal, and some scholars question whether it happened as described.',
      'Scholars note that the covenant follows the shape of ancient Near Eastern treaties between a great king and his people: who the king is, what he has done for them, and what they must do in return.',
    ],
  },
  {
    ref: 'Psalm 23',
    book: 'tanakh',
    match: ['psalm 23', 'psalms 23', 'the lord is my shepherd'],
    context: [
      'Setting: a short song of trust: "The Lord is my shepherd."',
      'Its heading attributes it to David, the shepherd who became king around 1000 BCE. Scholars agree the Psalms were collected over several centuries and used in worship at the Temple in Jerusalem.',
      'In the hill country of Judah, a shepherd led a flock to water and grazing and protected it from wild animals, so the image would have been familiar to everyone who sang it.',
    ],
  },
  {
    ref: 'Psalm 137',
    book: 'tanakh',
    match: ['psalm 137', 'psalms 137', 'rivers of babylon'],
    context: [
      'Setting: "By the rivers of Babylon, there we sat down and wept."',
      'In 586 BCE the Babylonian king Nebuchadnezzar destroyed Jerusalem and its Temple and took many of its people into exile in Babylon. This psalm is their lament, written during or soon after the exile.',
      'Its angry final verses show the raw grief of a people who had lost their city, and they have long troubled readers. Many explain them as honest prayer that hands vengeance over to God.',
    ],
  },
  {
    ref: 'Isaiah 53',
    book: 'tanakh',
    match: ['isaiah 53', 'suffering servant'],
    context: [
      'Setting: the "suffering servant" who is despised and wounded for others.',
      'Many scholars date Isaiah 40–55 to the end of the Babylonian exile (about 540 BCE), comforting exiles that they would go home. Tradition credits the whole book to the prophet Isaiah of the 8th century BCE.',
      'Jewish interpretation most often reads the servant as the people of Israel, suffering in exile. Christians read the chapter as a prophecy of Jesus’ death.',
    ],
  },
  {
    ref: 'Daniel 7',
    book: 'tanakh',
    match: ['daniel 7', 'book of daniel', 'son of man coming'],
    context: [
      'Setting: Daniel’s vision of four beasts and "one like a son of man" who receives an everlasting kingdom.',
      'The book is set in the Babylonian and Persian courts of the 6th century BCE. Most scholars date the visions to about 165 BCE, when the Greek king Antiochus IV outlawed Jewish practice and defiled the Temple, the crisis behind the Maccabean revolt and Hanukkah.',
      'Read that way, the beasts are empires and the vision promises that God will outlast them all. Jesus’ use of the title "Son of Man" draws on this chapter.',
    ],
  },
  {
    ref: 'The Book of Esther',
    book: 'tanakh',
    match: ['book of esther', 'esther and', 'queen esther', 'story of esther'],
    context: [
      'Setting: the Persian court of King Ahasuerus (usually identified with Xerxes I, 5th century BCE), where Esther, a Jewish queen, stops a plot to destroy her people.',
      'It reflects life for Jews who stayed in the Persian Empire after the exile, living as a minority under foreign kings. It is the origin of the festival of Purim.',
      'In the Hebrew text God is never named, which readers have long seen as a picture of God working behind the scenes.',
    ],
  },
  {
    ref: 'The Sermon on the Mount (Matthew 5–7)',
    book: 'bible',
    match: ['sermon on the mount', 'matthew 5', 'matthew 6', 'matthew 7', 'beatitudes', 'lords prayer'],
    context: [
      'Setting: Jesus teaching on a hillside in Galilee: the Beatitudes, "love your enemies," the Lord’s Prayer.',
      'Jesus taught around 30 CE, when Galilee was ruled by Herod Antipas under the Roman Empire and many Jews hoped for freedom from Rome.',
      'Matthew’s Gospel was written about 80–90 CE for a community of mostly Jewish followers of Jesus, which is why it shows Jesus explaining the Torah ("You have heard it said… but I say to you").',
    ],
  },
  {
    ref: 'John 3:16',
    book: 'bible',
    match: ['john 3', 'john 3 16', 'for god so loved the world'],
    context: [
      'Setting: Jesus’ night conversation with Nicodemus, a Pharisee and leader, about being "born again."',
      'John is usually dated about 90–110 CE, the latest of the four Gospels, for a community that had separated from the synagogue and wanted to explain who Jesus was.',
      'Its focus on believing in Jesus as God’s Son reflects that setting and has made the verse a summary of the Christian message.',
    ],
  },
  {
    ref: "Paul's Letter to the Romans",
    book: 'bible',
    match: ['letter to the romans', 'epistle to the romans', 'book of romans', 'romans 1', 'romans 3', 'romans 5', 'romans 8', 'romans 12'],
    context: [
      'Setting: Paul writes to the Christians in Rome, a church he had not yet visited.',
      'Written about 57 CE, probably from Corinth. The Roman church included both Jewish and Gentile believers, and some Jews had recently returned after Emperor Claudius expelled them from Rome around 49 CE.',
      'That mix explains the letter’s big question: how Jews and Gentiles stand before God together, through faith.',
    ],
  },
  {
    ref: '1 Corinthians 13',
    book: 'bible',
    match: ['1 corinthians 13', 'corinthians 13', 'love is patient'],
    context: [
      'Setting: "Love is patient, love is kind": the chapter often read at weddings.',
      'Paul wrote it around 53–55 CE to the church in Corinth, a busy Greek port city. The church was split into factions and arguing over which spiritual gifts made someone more important.',
      'In context it is a correction: without love, even the most impressive gifts are worth nothing.',
    ],
  },
  {
    ref: 'Revelation 13',
    book: 'bible',
    match: ['revelation 13', 'mark of the beast', '666', 'book of revelation'],
    context: [
      'Setting: the beast from the sea, and the number 666.',
      'Revelation was written by a prophet named John on the island of Patmos, most often dated about 95 CE under Emperor Domitian, when Christians who refused to honor the emperor as a god faced pressure.',
      'Many scholars read the beast as the Roman Empire and 666 as a code for "Nero Caesar" in Hebrew letters. Others read the book as describing the future end of the world.',
    ],
  },
  {
    ref: 'Surah 96 (Al-Alaq), verses 1–5',
    book: 'quran',
    match: ['surah 96', 'sura 96', 'al alaq', 'alaq', 'first revelation', 'first verses revealed', 'iqra'],
    context: [
      'Setting: "Read in the name of your Lord who created": by Muslim tradition, the very first verses revealed.',
      'In 610 CE, Muhammad was meditating in the cave of Hira near Mecca when the angel Gabriel commanded him to "read" or "recite." Mecca was a trading city whose leading tribe, the Quraysh, kept many idols at the Kaaba.',
      'The rest of the surah came later and answers a Meccan leader who tried to stop Muhammad from praying.',
    ],
  },
  {
    ref: 'Surah 1 (Al-Fatiha)',
    book: 'quran',
    match: ['surah 1', 'sura 1', 'al fatiha', 'fatiha'],
    context: [
      'Setting: the seven-verse opening prayer of the Qur’an.',
      'Most scholars place it in the Meccan period. Muslims recite it in every unit of every daily prayer, so it is the most often recited part of the Qur’an.',
      'It praises God as Lord of all worlds and Master of the Day of Judgment, and asks for guidance on the straight path.',
    ],
  },
  {
    ref: 'Surah 112 (Al-Ikhlas)',
    book: 'quran',
    match: ['surah 112', 'sura 112', 'al ikhlas', 'ikhlas'],
    context: [
      'Setting: "Say: He is God, the One… He neither begets nor is born."',
      'A short Meccan surah. Tradition says it answered people who asked Muhammad to describe his God.',
      'In a city of many gods, and next to Christian belief in God the Son, it states Islam’s core teaching of God’s absolute oneness (tawhid). The Prophet is reported to have said it equals a third of the Qur’an.',
    ],
  },
  {
    ref: 'Surah 9 (At-Tawbah), including 9:5',
    book: 'quran',
    match: ['surah 9', 'sura 9', 'at tawbah', 'tawbah', 'quran 9 5', '9 5', 'verse of the sword'],
    context: [
      'Setting: one of the last surahs revealed, in Medina around 630–631 CE, and the only one that doesn’t open with "In the name of God, the Merciful, the Compassionate."',
      'It deals with the end of the treaties between the Muslims and the polytheists of Arabia who had broken them, and with the Tabuk expedition against the Byzantines.',
      'Verse 9:5 ("kill the polytheists wherever you find them") is often quoted alone. Muslim and non-Muslim scholars stress its setting: it follows a four-month grace period, refers to treaty-breakers in a war of that time, and the next verse orders protection for any of them who ask for it. How it applies today is debated.',
    ],
  },
  {
    ref: 'Surah 5:32',
    book: 'quran',
    match: ['5 32', 'quran 5 32', 'surah 5', 'whoever kills a soul', 'killed all mankind'],
    context: [
      'Setting: "Whoever kills a soul… it is as if he had killed all mankind; and whoever saves one, it is as if he had saved all mankind."',
      'It comes in a Medinan surah right after the story of Adam’s two sons (Cain and Abel), and is addressed as a law given to the Children of Israel.',
      'The same teaching appears in the Jewish Mishnah (Sanhedrin 4:5), which says that whoever saves one life is considered to have saved a whole world.',
    ],
  },
  {
    ref: 'Surah 2:256 ("No compulsion in religion")',
    book: 'quran',
    match: ['2 256', 'no compulsion', 'quran 2 256'],
    context: [
      'Setting: "There is no compulsion in religion; the right way has become clear from the wrong."',
      'A Medinan verse. Commentators report it was revealed when some Medinan Muslims wanted to force their children, who had been raised Jewish, to become Muslim, and the verse forbade it.',
      'It is widely cited as the basis for freedom of belief in Islam, while scholars have long discussed how it fits with other verses.',
    ],
  },
  {
    ref: 'Surah 19 (Maryam)',
    book: 'quran',
    match: ['surah 19', 'sura 19', 'surah maryam', 'maryam'],
    context: [
      'Setting: the surah named after Mary, telling of the births of John the Baptist and Jesus.',
      'A Meccan surah. Muslim tradition says that when early Muslims fled persecution to Christian Abyssinia (about 615 CE), they recited it before the king, the Negus, who was moved to tears and protected them.',
      'It honors Mary and Jesus while teaching that Jesus is a prophet and servant of God, not God’s son.',
    ],
  },
  {
    ref: 'Surah 30 (Ar-Rum)',
    book: 'quran',
    match: ['surah 30', 'sura 30', 'ar rum'],
    context: [
      'Setting: "The Romans have been defeated in a nearby land, but after their defeat they will be victorious within a few years."',
      'Revealed in Mecca around 614–615 CE, when the Persian Empire had just taken Jerusalem and Syria from the Byzantine (Roman) Empire.',
      'The pagan Meccans sided with the Persians and Muslims with the Christian Byzantines, people of a scripture. The Byzantines did win back the territory in the 620s, which Muslims see as a fulfilled prophecy.',
    ],
  },
];
