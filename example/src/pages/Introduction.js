import React from "react";
import { useLocalized } from "react-localized";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/github";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import bash from "react-syntax-highlighter/dist/esm/languages/hljs/bash";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
// eslint-disable-next-line import/no-webpack-loader-syntax
import LocaleShapeFile from "raw-loader!:../../../src/LocalShape";
import ExampleCode from "../exampleCode.json";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("bash", bash);

const usageCode = `import { LocalizedInput, useLocalized } from "react-localized";
import locales from "locales.json";

export default function MyHomePage() {
  const [t, getLocalizedValue] = useLocalized();
  const [greeting, setGreeting] = useState({en: "Hello!", fr: "Bonjour !"});
  return (
    <div>
       <h1>{t('pages.home.title')}</h1>
       <h2>{getLocalizedValue(greeting)}</h2>      
       <LocalizedInput 
         value={greeting}
         onChange={setGreeting}
         locales={locales}
       />
    </div>
  );
} 
`;

export default function Introduction() {
  const [t] = useLocalized();
  return (
    <article className="intro">
      <h1>{t("pages.intro.title")}</h1>
      <h2 id="motivation">{t("pages.intro.motivation.title")}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: t("pages.intro.motivation.text"),
        }}
      />
      <h2 id="installation">{t("pages.intro.install.title")}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: t("pages.intro.install.text") }}
      />
      <SyntaxHighlighter language="bash" style={docco}>
        yarn add react-localized
      </SyntaxHighlighter>
      <h2 id="usage">Usage</h2>
      <div>
        <p>
          Cet exemple de composant-fonction vous présente trois façons
          d'utiliser React-Localized.
        </p>

        <p>
          On utilise premièrement le hook <code>useLocalized</code>, qui
          retourne un tableau contenant deux fonctions :{" "}
        </p>
        <ul>
          <li>
            La fonction{" "}
            <strong>
              <code>translator</code>
            </strong>
            , abbréviée <code>t</code> qui va chercher dans la propriété
            localizedValues d'un <code>LocalizedContext</code> préalable. Le
            premier argument de cette fonction est une chaine de caractère
            utilisant une syntaxe pointée pour accéder au contenu d'un objet.
          </li>
          <li>
            La fonction{" "}
            <strong>
              <code>getLocalizedValues</code>
            </strong>
            , qui permet de retourner la valeur traduite pour la langue courante
            du contexte, en gérant la bascule vers les langues de repli. Nota.
            cette fonction est encapsulée par la fonction translator.
          </li>
        </ul>
        <p>
          On utilise également dans cet exemple l'éditeur de valeurs localisées.
          Dans sa configuration standard, celui-ci
        </p>
      </div>
      <SyntaxHighlighter language="js" style={docco} showLineNumbers>
        {usageCode}
      </SyntaxHighlighter>
      <h2>Structure des traductions et de l'objet Locale</h2>
      <div>
        <p>
          La plupart des solutions d'internationalisation dissocient les
          structures de données applicatives et/ou métier des traductions.
          Ainsi, on se retrouve avec des objets complexes, composés de tableaux
          ou d'objets imbriqués d'un côté, et des CSV ou JSON à une dimension
          par langue de l'autre. Cette approche est particulièrement adaptée à
          la gestion des traductions d'une application ou d'un site web.
        </p>
        <p>
          React-Localized est conçu pour répondre à un besoin différent. Il a
          été construit pour Axeptio, une solution de recueil de consentement
          cookies, pour lequel une myriade de configurations clients
          multilingues sont sérialisées en JSON et servies via un CDN pour
          initialiser le widget sur les sites internet. Dans ce contexte, il
          nous est apparu plus logique d'incorporer les traductions directement
          au sein de la structure de données afin de faciliter la distribution
          du contenu.
        </p>
        <h3>Structure de l'objet Locale</h3>
        <SyntaxHighlighter language="js" style={docco}>
          {String(LocaleShapeFile)}
        </SyntaxHighlighter>

        <h3>Exemple de structure de données localisées</h3>
        <div>
        <p>
          Voici un exemple de données localisées qui pourraient constituer un cas
          de "configuration client".
        </p>
        <p>
          Même si cela n'est pas nécessaire au fonctionnement du module, vous pourrez
          avoir besoin d'incorporer dans vos données la liste des locales
          disponibles, pour par exemple alimenter un menu déroulant permettant à
          l'utilisateur de choisir sa langue préférentielle.
        </p>
        </div>
        <SyntaxHighlighter language="json" style={docco}>
          {JSON.stringify(ExampleCode, null, 2)}
        </SyntaxHighlighter>
      </div>
    </article>
  );
}
