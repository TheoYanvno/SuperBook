# SuperBook

**▶ [Live demo](https://theoyanvno.github.io/SuperBook/)**

A web app for exploring the scriptures of the three Abrahamic faiths. Three books rest in a desert: the **Tanakh** (Judaism), the **Holy Bible** (Christianity) and the **Qur'an** (Islam). Click a book to open and read the complete text, chapter by chapter. Ask how the books differ, and the answer is written into the sand.

**Tech:** JavaScript (ES modules) · HTML Canvas · CSS animations · public REST APIs · `node:test` · no frameworks

| Desktop | Phone |
|---|---|
| ![SuperBook on desktop](docs/desktop.png) | ![SuperBook on a phone](docs/mobile.png) |

## Features

- **Read all three books in full**, with book/surah and chapter pickers and next/previous buttons
  - Tanakh in the Jewish order (Torah, Prophets, Writings), in English with the Hebrew original
  - Holy Bible in the Eastern Orthodox canon and order: the Old Testament following the Septuagint, with Tobit, Judith, Wisdom of Solomon, Sirach, Baruch, 1–4 Maccabees, 1 Esdras, the Prayer of Manasseh, Susanna and Bel and the Dragon (books like 1 Samuel show their Orthodox names, "1 Kingdoms"), then the 27 books of the New Testament
  - Qur'an, all 114 surahs, in English with the Arabic original
- **Covers** use each faith's widely recognized symbol: the Star of David, the cross, and the eight-pointed star (Rub el Hizb) that marks sections of the Qur'an
- **Ask the sand**: type a question and the answer is carved into the sand letter by letter. A gust of wind smooths it away. The sand covers 76 topics, each answered separately for the Tanakh, the Bible and the Qur'an:
  - **The books:** how they differ, how old they are, who wrote them, where, original languages and translations, how they're organized, the longest and shortest chapters, first and last words, famous passages, the oldest manuscripts, which books are included, the Gospels, other sacred writings (Talmud, Hadith) and interpretation
  - **People:** God and the names of God, the Holy Spirit, Jesus, Muhammad, the prophets, Abraham, Moses, Noah, Joseph, David and Solomon, Jonah, John the Baptist, Mary, Paul and women in the scriptures
  - **Beliefs:** creation, Satan, angels and jinn, miracles, the Messiah, the end of days, the afterlife, sin and salvation, repentance, free will, suffering, covenant, ethics, peace and war, and how the faiths see each other
  - **Practice:** law, the Ten Commandments, prayer, places of worship and leaders, holy days, the Sabbath, fasting, charity, pilgrimage, holy places, food, money, marriage, funerals, circumcision and baptism, conversion, dress, art, calendars, greetings and followers today
- **Harder questions**: which books are in one scripture but not another (and why the Tanakh counts 24 books where Protestant Bibles count 39), how the stories the Bible and the Qur'an share are told differently, and the historical context behind a passage ("What is the historical context of Psalm 137?", "Why was Surah 96 revealed?").
- **Study questions for 300 chapters and surahs**: ask about one of the 100 Bible chapters, 100 Torah chapters or 100 surahs in the *3,000 Scripture Study Questions* workbook ("What ethical choices arise in Genesis 12?", "Who are the key people in Exodus 3 in the Torah?", "What are the main themes of Surah Al-Mulk?"). The sand explains how to approach that kind of question (main idea, people, God and humanity, ethics, setting, key words, conflict, connections, interpretations or a hard question), suggests more questions to explore, and links to the passage on Bible Gateway, Sefaria or Quran.com. The workbook's suggested answers are study methods rather than summaries, so the sand doesn't claim to say what each chapter contains.
- **Compare any two or all three**: name books or faiths in a question ("How do the Bible and the Qur'an see Jesus?", "What does Judaism teach about the afterlife?") and the answer covers only those. Ask about a book with no topic ("Tell me about the Torah") and the sand describes it.
- **Side-by-side table**: compare the books on 19 facts, including age, language, size, authors, region, central figure, holy day and followers
- **Eight languages**: a picker in the top corner switches the whole site between English, Spanish, French, German, Hebrew, Arabic, Greek and Latin. That covers the page text, all 76 sand answers, the passage backgrounds, the study guide and the comparison table, and you can ask questions in the language you picked ("¿Qué dice el Corán sobre Jesús?", "מה ההקשר ההיסטורי של תהלים 137?"). Hebrew and Arabic switch the layout to right-to-left, and the sand writes from right to left. Your choice is remembered.
- Works on phones, supports reduced-motion settings, and screen readers get the answer as text

## Where the texts come from

The app doesn't store any scripture. Each chapter is loaded when you open it, from free public APIs, using **public-domain translations**:

| Book | Translation | Source |
|---|---|---|
| Tanakh | *The Holy Scriptures* (JPS 1917), with Hebrew from *Miqra according to the Masorah* (CC BY-SA) | [Sefaria](https://www.sefaria.org) |
| Holy Bible | World English Bible (public domain), which includes the books Protestant Bibles leave out | [bible-api.com](https://bible-api.com) |
| Qur'an | Marmaduke Pickthall (1930), with the Arabic Uthmani text | [alquran.cloud](https://alquran.cloud) |

### In other languages

Where a free, public-domain translation exists, the reader loads it in the language you picked. Where none exists, it shows the English text with a note saying so.

| Language | Tanakh | Holy Bible | Qur'an |
|---|---|---|---|
| Spanish | English (JPS 1917) | Reina-Valera 1909 | English (Pickthall) + Arabic |
| French | Bible du Rabbinat 1899 | Louis Segond 1910 | English (Pickthall) + Arabic |
| German | Zunz Bible (1838) | Elberfelder 1871 | English (Pickthall) + Arabic |
| Hebrew | Hebrew only | Hebrew Old Testament (Westminster Leningrad Codex); New Testament in English | English (Pickthall) + Arabic |
| Arabic | English (JPS 1917) + Hebrew | English (WEB) | Arabic |
| Greek | English (JPS 1917) + Hebrew | Septuagint and Tischendorf's Greek New Testament | English (Pickthall) + Arabic |
| Latin | English (JPS 1917) + Hebrew | Clementine Vulgate | English (Pickthall) + Arabic |

Translations come from [getbible.net](https://getbible.net) and [Sefaria](https://www.sefaria.org). The Orthodox books outside the 66-book Protestant canon (Tobit, Judith, Maccabees and others) are always shown from the English World English Bible. The Greek and Latin Bibles number the Psalms the Septuagint and Vulgate way (Psalm 23 is their Psalm 22). No public-domain Qur'an translation exists in these languages, so the Qur'an stays in English with the Arabic beside it.

**About the translations:** the site's text in the seven other languages was translated with help from AI tools and hasn't yet been checked by fluent readers. Corrections, especially for Hebrew, Arabic, Greek and Latin, are welcome.

The free Bible source doesn't have the Letter of Jeremiah, Psalm 151 or the Greek additions to Esther and Daniel (except Susanna and Bel), so those are the only parts of the Orthodox Bible missing from the reader.

## How it's built

| File | What it does |
|---|---|
| [`src/books.js`](src/books.js) | Table of contents for each book and the API calls that load a chapter |
| [`src/topics.js`](src/topics.js) | 76 topics, each with a short answer per book and the keywords that point to it |
| [`src/passages.js`](src/passages.js) | Historical context for 20 well-known passages, from Genesis 1 and Psalm 137 to John 3:16 and Surah 96 |
| [`src/studydata.js`](src/studydata.js) | The workbook's chapters, study questions and suggested answers. The workbook reuses the same ten answers in the same order for all three scriptures; they fit the Bible questions, and `FIT` pairs each Torah and Qur'an question with the answer that matches it |
| [`src/study.js`](src/study.js) | Finds a chapter or surah in a question ("Genesis 12", "chapter 12 of Genesis", "Surah Baqarah", "Al-Mulk"), decides which scripture it means, works out the kind of question and builds the answer |
| [`src/answers.js`](src/answers.js) | Question matcher: normalizes spellings (Koran → Qur'an), stems words (prophets → prophet), detects which books a question names, scores topics (specific keywords outweigh general ones) and builds the answer |
| [`src/facts.js`](src/facts.js) | The facts in the side-by-side comparison table |
| [`src/sand.js`](src/sand.js) | Canvas animation that writes text as grooves in the sand, with flying grains and a wind-sweep effect |
| [`src/i18n.js`](src/i18n.js) | The language list, the English page text, and lookups that use the chosen language's pack, falling back to English |
| [`src/lang/`](src/lang) | One pack per language: page text, book names, all 76 topics, passages, facts, study guide, and the local words the question matcher listens for |
| [`src/text.js`](src/text.js) | Normalizes questions in any language (accents, Greek final sigma, Arabic letter forms, Hebrew and Arabic prefixes) and maps local book names to English |
| [`src/app.js`](src/app.js) | Book reader (with caching), question form and page wiring |

## Run it

```bash
python3 -m http.server 8000      # then open http://localhost:8000 (needs internet to load the texts)
npm test                         # 29 tests, including 131 sample English questions and samples in every language routed to the right topic and books
```

It can also be published for free with GitHub Pages (Settings → Pages → deploy from the `main` branch).

## A note on the answers

The comparisons are short, neutral summaries of what each tradition generally teaches. Every faith has a wide range of views within it, so treat them as a starting point, not the final word.

Built with help from AI coding tools for planning, code review and tests.
