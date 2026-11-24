// How the topics the sand knows are grouped into the Learn, People & Events and Beliefs & Practices pages.
// Each section lists topic ids from topics.js; a topic page shows that topic's answer for each scripture.
export const LEARN = [
  { id: 'origins', title: 'Origins & History', blurb: 'Where each scripture came from, who wrote or received it, and how it was gathered.',
    topics: ['age', 'contributors', 'region', 'language', 'revelation', 'oral', 'canon', 'manuscripts', 'names'] },
  { id: 'beliefs', title: 'Key Beliefs', blurb: 'God, creation, angels, the Messiah, the afterlife and more, in each tradition.',
    topics: ['god', 'godnames', 'spirit', 'creation', 'angels', 'satan', 'miracles', 'messiah', 'judgment', 'afterlife', 'salvation', 'repentance', 'freewill', 'suffering', 'covenant'] },
  { id: 'differences', title: 'Major Differences', blurb: 'Where the three part ways: books, stories, Jesus and Muhammad.',
    topics: ['differences', 'canondiff', 'storydiff', 'jesus', 'muhammad', 'interfaith'] },
  { id: 'similarities', title: 'Similarities', blurb: 'What the Abrahamic scriptures share: one God, the patriarchs and the prophets.',
    topics: ['overview', 'abraham', 'prophets', 'moses', 'noah', 'ethics', 'charity'], shared: true },
  { id: 'today', title: 'How They Are Used Today', blurb: 'Reading, worship, holy days, fasting, pilgrimage and daily life.',
    topics: ['reading', 'worship', 'houses', 'holidays', 'sabbath', 'fasting', 'pilgrimage', 'food', 'followers'] },
];

export const PEOPLE = ['god', 'abraham', 'sacrifice', 'noah', 'moses', 'joseph', 'david', 'jonah', 'prophets', 'john', 'mary', 'jesus', 'muhammad', 'paul', 'women'];
export const PRACTICES = ['law', 'commandments', 'worship', 'houses', 'holidays', 'sabbath', 'fasting', 'charity', 'pilgrimage', 'places', 'food', 'money', 'marriage', 'death', 'circumcision', 'conversion', 'dress', 'art', 'calendar', 'greetings'];
export const BELIEFS = ['god', 'spirit', 'creation', 'angels', 'satan', 'miracles', 'messiah', 'judgment', 'afterlife', 'salvation', 'repentance', 'freewill', 'suffering', 'covenant', 'themes', 'ethics', 'peace'];

// The comparison table's rows (indexes into FACTS), grouped into the Compare & Learn tabs.
export const COMPARE_TABS = [
  { id: 'overview', title: 'Overview', rows: [0, 1, 10, 11, 16, 18] },
  { id: 'beliefs', title: 'Beliefs', rows: [11, 10, 12, 13, 14, 15] },
  { id: 'structure', title: 'Structure', rows: [3, 6, 7, 8, 9] },
  { id: 'history', title: 'History', rows: [2, 4, 5, 17] },
];
