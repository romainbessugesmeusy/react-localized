export default [
  {
    tag: "en",
    language: { fr: "Anglais commun", en: "Common English" },
    keywords: "english",
  },
  {
    tag: "fr",
    language: { fr: "Français", en: "French" },
    keywords: "Français",
  },
  {
    language: { fr: "Anglais britannique", en: "British english" },
    tag: "en",
    region: "UK",
    keywords: "english",
    flag: "🇬🇧",
    fallback: "en",
  },
  {
    language: { fr: "Anglais Américain", en: "American english" },
    tag: "en",
    region: "US",
    keywords: "english",
    flag: "🇺🇸",
    fallback: "en",
  },
  {
    language: { fr: "Français", en: "French" },
    tag: "fr",
    region: "FR",
    keywords: "francais french",
    flag: "🇫🇷",
    fallback: 'fr'
  },
  {
    language: {
      fr: "Créole de l'Île de la Réunion",
      en: "Reunion Island Creole",
    },
    tag: "fr",
    region: "RE",
    keywords: "réunion",
    flag: "🇷🇪",
    fallback: "fr-FR",
  },
];
