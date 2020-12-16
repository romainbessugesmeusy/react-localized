export default {
  nav: {
    items: [
      {
        href: "/",
        title: {
          fr: "Introduction",
          en: "Getting Started",
        },
        items: [
          {
            href: "#motivation",
            title: {
              fr: "motivation",
              en: "rationale",
            },
          },
          {
            href: "#installation",
            title: {
              fr: "installation",
              en: "install",
            },
          },
        ],
      },
      {
        title: { en: "Components", fr: "Composants" },
        href: "/components",
        items: [
          { href: "LocalizedContext", title: "LocalizedContext" },
          { href: "LocalizedElement", title: "LocalizedElement" },
          { href: "LocaleSelect", title: "LocaleSelect" },
          { href: "LocaleChooser", title: "LocaleChooser" },
        ],
      },
      {
        title: {
          en: "Hooks & helper functions",
          fr: "Hooks et fonctions utilitaires",
        },
        href: "/hooks-and-helpers",
        items: [
          { href: "#useLocalized", title: "useLocalized" },
          { href: "#generateLocalizedGetter", title: "LocalizedElement" },
          { href: "#generateTranslatorAndGetter", title: "LocaleSelect" },
        ],
      },
      {
        title: { en: "Editor", fr: "Éditeur" },
        href: "/editor",
      },
    ],
    tryMe: "Try me!",
  },
  pages: {
    installation: {
      title: {
        fr: "Installation et mise en route",
        en: "Installation and setup",
      },
    },
    intro: {
      title: {
        fr: "Introduction",
        en: "Intro",
      },
      motivation: {
        title: {
          en: "Motivation",
          fr: "Motivation",
        },
        text: {
          fr:
            "<p>React-Localized est une bibliothèque de composants React qui permettent de gérer la localisation des applications React. Son but est d'offrir aux utilisateurs de votre application une bascule simple et robuste entre différentes langues.. React-Localized est particulièrement adapté aux contextes dans lesquels les données traduites et non-traduites sont regroupées dans un seul et même fichier, comme par exemple la configuration d'un widget multilingue sérialisée dans un seul fichier JSON.</p>",
        },
      },
      install: {
        title: {
          en: "Installation",
          fr: "Installation",
        },
        text: {
          fr:
            "<p>React-Localized est disponible sous forme de module NPM uniquement. Pour l'ajouter à votre projet, lancez la commande suivante.</p>",
          en: "",
        },
      },
      usage: {
        title: {
          en: "Usage",
          fr: "Usage",
        },
        text: {
          en: "",
          fr:
            "<p>Cet exemple de composant-fonction vous présente trois façons d'utiliser React-Localized.</p><p>On utilise premièrement le hook useLocalized, qui retourne un tableau contenant deux fonctions :</p><ul><li>La fonction <strong>translator</strong>, abbréviée t qui va chercher dans la propriété localizedValues d'un LocalizedContext préalable. Le premier argument de cette fonction est une chaine de caractère utilisant une syntaxe pointée pour accéder au contenu d'un objet.</li><li>La fonction <strong>getLocalizedValues</strong>, qui permet de retourner la valeur traduite pour la langue courante du contexte, en gérant la bascule vers les langues de repli. Nota. cette fonction est encapsulée par la fonction translator.</li></ul><p>On utilise également dans cet exemple l'éditeur de valeurs localisées. Dans sa configuration standard, celui-ci</p>",
        },
      },
      model: {
        title: {
          fr: "Structure des traductions et de l'objet Locale",
          en: "Translations and Locale Object structures",
        },
        text: {
          fr:
            "<p>La plupart des solutions d'internationalisation dissocient les structures de données applicatives et/ou métier des traductions. Ainsi, on se retrouve avec des objets complexes, composés de tableaux ou d'objets imbriqués d'un côté, et des CSV ou JSON à une dimension par langue de l'autre. Cette approche est particulièrement adaptée à la gestion des traductions d'une application ou d'un site web.</p><p>React-Localized est conçu pour répondre à un besoin différent. Il a été construit pour Axeptio, une solution de recueil de consentement cookies, pour lequel une myriade de configurations clients multilingues sont sérialisées en JSON et servies via un CDN pour initialiser le widget sur les sites internet. Dans ce contexte, il nous est apparu plus logique d'incorporer les traductions directement au sein de la structure de données afin de faciliter la distribution du contenu.</p>",
        },
        localeStruct: {
          title: {
            fr: "Structure de l'objet Locale",
          },
        },
        example: {
          title: {
            fr: "Exemple de structure de données localisées",
          },
          text: {
            fr: `<p>
            Voici un exemple de données localisées qui pourraient constituer un
            cas de "configuration client".
          </p>
          <p>
            Même si cela n'est pas nécessaire au fonctionnement du module, vous
            pourrez avoir besoin d'incorporer dans vos données la liste des
            locales disponibles, pour par exemple alimenter un menu déroulant
            permettant à l'utilisateur de choisir sa langue préférentielle.
          </p>`,
          },
        },
      },
    },
    components: {
      title: {
        fr: "Composants",
        en: "Components",
      },
      localizedInput: {
        description: {
          fr:
            "<p>Le composant <strong>LocalizedInput</strong> permet de créer un champ d&apos;édition multilingue</p>",
          en:
            "<p>The <code>LocalizedInput</code> component is an form control allowing the user to edit a multilingual text</p>",
        },
      },
    },
    editor: {
      title: {
        fr: "Éditeur",
        en: "Editor",
      },
      localeChooser: {
        label: {
          fr: "Choisissez les langues à éditer",
          en: "Choose the locales you want to edit",
        },
      },
    },
  },
};
