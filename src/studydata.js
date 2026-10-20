// Study guide data from the "3,000 Scripture Study Questions" workbook (Bible, Torah, Qur'an):
// 100 chapters or surahs from each scripture, ten study questions for each, and suggested ways to answer them.
// The workbook's suggested answers are study methods, not summaries of each chapter, so SuperBook answers
// with the method for the kind of question asked and a link to read the passage itself.
//
// The workbook repeats the same ten suggested answers, in the same order, in all three parts. They fit the
// Bible questions; for the Torah and Qur'an questions, FIT pairs each question with the guidance that matches it.

/** The ten ways to study a passage. {ref} is replaced with the chapter, e.g. "Genesis 1" or "Surah 2 (Al-Baqarah)". */
export const GUIDANCE = ["Identify the main narrative development, command, prayer, or teaching in {ref}; summarize it using the passage itself. The chapter, rather than a later interpretation, is the primary evidence.", "Name the people or communities actually mentioned in {ref}, and distinguish their stated actions from motives inferred by a reader.", "Examine how {ref} portrays divine action, human response, obedience, responsibility, or judgment. The answer depends on the passage’s wording and religious interpretive tradition.", "Identify a concrete choice, command, prohibition, or consequence in {ref}; explain the ethical principle without assuming that every narrated action is endorsed.", "Read {ref} in its surrounding chapters. Note the speaker, audience, narrative location, and historical setting where the text supplies them; do not treat uncertain dates as established.", "Look for repeated terms, contrasts, metaphors, commands, or images in {ref}; explain their function using the surrounding verses. Translation choices can affect this reading.", "State the tension, question, or challenge presented in {ref}; describe what resolution, warning, or open ending the passage actually offers.", "Compare the major themes of {ref} with other passages in the same scripture. A responsible comparison cites both texts and notes meaningful differences.", "Acknowledge that interpretations of {ref} can differ across communities and commentators. Separate the text’s explicit statements from theological conclusions.", "One valid study question is how to interpret the passage’s central teaching in context. Evaluate proposed answers by reading {ref}, neighboring passages, and tradition-specific commentaries."];

/** The workbook's ten study questions for each scripture, in its order. */
export const QUESTIONS = {
  "bible": [
    "What is the central event, teaching, or argument in {ref}?",
    "Which people or groups are most important in {ref}, and what roles do they play?",
    "What does {ref} suggest about the relationship between God and humanity?",
    "What ethical choices or responsibilities arise in {ref}?",
    "How does the setting or historical context help explain {ref}?",
    "What words, images, or repeated ideas stand out in {ref}?",
    "What conflict, problem, or question drives {ref}, and how is it addressed?",
    "How does {ref} connect with themes found elsewhere in the Bible?",
    "How might different Jewish or Christian readers interpret {ref} differently, where applicable?",
    "What is one difficult interpretive question raised by {ref}, and what evidence would help answer it?"
  ],
  "tanakh": [
    "What happens or is taught in {ref} of the Torah?",
    "What does {ref} reveal about covenant, obligation, or communal identity?",
    "Which commands, actions, or decisions are most significant in {ref}?",
    "How are divine and human responsibilities portrayed in {ref}?",
    "What role do family, leadership, or community play in {ref}?",
    "What literary patterns or key Hebrew terms would be useful to study in {ref}?",
    "What questions of justice, holiness, or compassion does {ref} raise?",
    "How does {ref} relate to an earlier or later passage in the Five Books of Moses?",
    "How might classical Jewish commentary approach a challenging passage in {ref}?",
    "What question would you ask a rabbi or Torah scholar about {ref}, and why?"
  ],
  "quran": [
    "What are the main themes of Surah {ref}?",
    "How does Surah {ref} describe God’s attributes, actions, or guidance?",
    "What moral or spiritual responsibilities are emphasized in Surah {ref}?",
    "What kinds of people, communities, or behaviors are discussed in Surah {ref}?",
    "How does the structure or progression of Surah {ref} contribute to its message?",
    "Which Arabic words, images, or rhetorical devices in Surah {ref} merit closer study?",
    "What does Surah {ref} say about revelation, faith, or accountability, if these topics appear?",
    "How does Surah {ref} relate to a theme in another surah?",
    "What historical context or traditional tafsir could help interpret Surah {ref}?",
    "What is a thoughtful question about Surah {ref} that would require consulting a translation and commentary?"
  ]
};

/** FIT[book][i] = which GUIDANCE answers QUESTIONS[book][i]. */
export const FIT = {"bible": [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9]], "tanakh": [[0], [2], [3], [2], [1], [5], [3], [7], [8], [9]], "quran": [[0], [2], [3], [1], [5], [5], [2], [7], [4, 8], [9]]};

/** The chapters the workbook covers. */
export const CHAPTERS = {
  bible: ["Genesis 1", "Genesis 3", "Genesis 4", "Genesis 7", "Genesis 8", "Genesis 11", "Genesis 12", "Genesis 17", "Genesis 19", "Genesis 21", "Genesis 24", "Genesis 27", "Genesis 32", "Genesis 37", "Genesis 41", "Genesis 50", "Exodus 1", "Exodus 3", "Exodus 4", "Exodus 12", "Exodus 16", "Exodus 19", "Exodus 24", "Exodus 32", "Exodus 40", "Leviticus 16", "Numbers 6", "Numbers 14", "Numbers 21", "Deuteronomy 6", "Deuteronomy 8", "Deuteronomy 34", "Joshua 1", "Joshua 6", "Judges 4", "Judges 6", "Judges 13", "Judges 16", "Ruth 2", "Ruth 3", "1 Samuel 3", "1 Samuel 16", "1 Samuel 17", "2 Samuel 7", "2 Samuel 11", "1 Kings 3", "1 Kings 8", "1 Kings 19", "2 Kings 5", "2 Kings 17", "Esther 4", "Esther 7", "Job 2", "Job 42", "Psalms 1", "Psalms 51", "Psalms 91", "Proverbs 1", "Proverbs 3", "Proverbs 31", "Isaiah 9", "Isaiah 40", "Jeremiah 1", "Jeremiah 31", "Daniel 6", "Daniel 7", "Jonah 2", "Jonah 4", "Micah 6", "Matthew 3", "Matthew 5", "Matthew 13", "Matthew 16", "Matthew 28", "Mark 4", "Mark 8", "Mark 16", "Luke 1", "Luke 10", "Luke 15", "John 1", "John 4", "John 11", "John 17", "John 20", "Acts 9", "Acts 15", "Acts 17", "Romans 5", "Romans 8", "1 Corinthians 12", "1 Corinthians 13", "Galatians 5", "Ephesians 6", "Philippians 2", "James 1", "James 2", "Revelation 4", "Revelation 12", "Revelation 22"],
  tanakh: ["Genesis 1", "Genesis 4", "Genesis 6", "Genesis 9", "Genesis 11", "Genesis 14", "Genesis 16", "Genesis 19", "Genesis 22", "Genesis 24", "Genesis 27", "Genesis 29", "Genesis 32", "Genesis 35", "Genesis 37", "Genesis 40", "Genesis 42", "Genesis 45", "Genesis 47", "Genesis 50", "Exodus 1", "Exodus 3", "Exodus 5", "Exodus 7", "Exodus 9", "Exodus 11", "Exodus 13", "Exodus 15", "Exodus 17", "Exodus 19", "Exodus 22", "Exodus 24", "Exodus 26", "Exodus 28", "Exodus 30", "Exodus 32", "Exodus 34", "Exodus 36", "Exodus 38", "Exodus 40", "Leviticus 1", "Leviticus 2", "Leviticus 4", "Leviticus 5", "Leviticus 6", "Leviticus 8", "Leviticus 9", "Leviticus 11", "Leviticus 12", "Leviticus 13", "Leviticus 15", "Leviticus 16", "Leviticus 17", "Leviticus 19", "Leviticus 20", "Leviticus 22", "Leviticus 23", "Leviticus 24", "Leviticus 26", "Leviticus 27", "Numbers 1", "Numbers 3", "Numbers 5", "Numbers 7", "Numbers 8", "Numbers 10", "Numbers 12", "Numbers 14", "Numbers 16", "Numbers 18", "Numbers 19", "Numbers 21", "Numbers 23", "Numbers 25", "Numbers 27", "Numbers 29", "Numbers 30", "Numbers 32", "Numbers 34", "Numbers 36", "Deuteronomy 1", "Deuteronomy 3", "Deuteronomy 4", "Deuteronomy 6", "Deuteronomy 8", "Deuteronomy 10", "Deuteronomy 11", "Deuteronomy 13", "Deuteronomy 15", "Deuteronomy 17", "Deuteronomy 18", "Deuteronomy 20", "Deuteronomy 22", "Deuteronomy 24", "Deuteronomy 25", "Deuteronomy 27", "Deuteronomy 29", "Deuteronomy 31", "Deuteronomy 32", "Deuteronomy 34"],
  quran: [[1, "Al-Fatihah"], [2, "Al-Baqarah"], [3, "Ali Imran"], [4, "An-Nisa"], [5, "Al-Maidah"], [6, "Al-Anam"], [7, "Al-Araf"], [8, "Al-Anfal"], [9, "At-Tawbah"], [10, "Yunus"], [11, "Hud"], [12, "Yusuf"], [13, "Ar-Rad"], [14, "Ibrahim"], [15, "Al-Hijr"], [16, "An-Nahl"], [17, "Al-Isra"], [18, "Al-Kahf"], [19, "Maryam"], [20, "Ta-Ha"], [21, "Al-Anbiya"], [22, "Al-Hajj"], [23, "Al-Muminun"], [24, "An-Nur"], [25, "Al-Furqan"], [26, "Ash-Shuara"], [27, "An-Naml"], [28, "Al-Qasas"], [29, "Al-Ankabut"], [30, "Ar-Rum"], [31, "Luqman"], [32, "As-Sajdah"], [33, "Al-Ahzab"], [34, "Saba"], [35, "Fatir"], [36, "Ya-Sin"], [37, "As-Saffat"], [38, "Sad"], [39, "Az-Zumar"], [40, "Ghafir"], [41, "Fussilat"], [42, "Ash-Shura"], [43, "Az-Zukhruf"], [44, "Ad-Dukhan"], [45, "Al-Jathiyah"], [46, "Al-Ahqaf"], [47, "Muhammad"], [48, "Al-Fath"], [49, "Al-Hujurat"], [50, "Qaf"], [51, "Adh-Dhariyat"], [52, "At-Tur"], [53, "An-Najm"], [54, "Al-Qamar"], [55, "Ar-Rahman"], [56, "Al-Waqiah"], [57, "Al-Hadid"], [58, "Al-Mujadila"], [59, "Al-Hashr"], [60, "Al-Mumtahanah"], [61, "As-Saff"], [62, "Al-Jumuah"], [63, "Al-Munafiqun"], [64, "At-Taghabun"], [65, "At-Talaq"], [66, "At-Tahrim"], [67, "Al-Mulk"], [68, "Al-Qalam"], [69, "Al-Haqqah"], [70, "Al-Maarij"], [71, "Nuh"], [72, "Al-Jinn"], [73, "Al-Muzzammil"], [74, "Al-Muddaththir"], [75, "Al-Qiyamah"], [76, "Al-Insan"], [77, "Al-Mursalat"], [78, "An-Naba"], [79, "An-Naziat"], [80, "Abasa"], [81, "At-Takwir"], [82, "Al-Infitar"], [83, "Al-Mutaffifin"], [84, "Al-Inshiqaq"], [85, "Al-Buruj"], [86, "At-Tariq"], [87, "Al-Ala"], [88, "Al-Ghashiyah"], [89, "Al-Fajr"], [90, "Al-Balad"], [91, "Ash-Shams"], [92, "Al-Layl"], [93, "Ad-Duha"], [94, "Ash-Sharh"], [95, "At-Tin"], [96, "Al-Alaq"], [97, "Al-Qadr"], [98, "Al-Bayyinah"], [99, "Az-Zalzalah"], [100, "Al-Adiyat"]],
};
