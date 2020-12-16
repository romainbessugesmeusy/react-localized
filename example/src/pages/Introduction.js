import React from "react";
import { useLocalized, LocalizedElement } from "react-localized";
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
  const {t, getLocalized} = useLocalized();
  const [greeting, setGreeting] = useState({en: "Hello!", fr: "Bonjour !"});
  return (
    <div>
       <h1>{t('pages.home.title')}</h1>
       <h2>{getLocalized(greeting)}</h2>      
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
  const { scopedTranslator } = useLocalized();
  // Instead of rewriting pages.intro everytime,
  // we use this "scopedTranslator" helper
  const ts = scopedTranslator("pages.intro");

  return (
    <article className="intro">
      <h1>{ts("title")}</h1>
      <h2 id="motivation">{ts("motivation.title")}</h2>
      <LocalizedElement t="pages.intro.motivation.text">
        <p>
          React-Localized is a library of React components that help you manage
          translations and localization of your app
        </p>
        <p>
          It has been designed to help your app's users quickly and robustly
          switch between locales, without having to decouple your app content
          and logic.
        </p>
        <p>
          It's particularly suited for contexts where localized data and regular
          data are mixed in a common data structure, like the description file
          for a multilingual widget or form builder
        </p>
      </LocalizedElement>
      <h2 id="installation">{ts("install.title")}</h2>
      <LocalizedElement t="pages.intro.install.text" />
      <SyntaxHighlighter language="bash" style={docco}>
        yarn add react-localized
      </SyntaxHighlighter>
      <h2 id="usage">{ts("usage.title")}</h2>
      <LocalizedElement t="pages.intro.usage.text" />
      <SyntaxHighlighter language="js" style={docco} showLineNumbers>
        {usageCode}
      </SyntaxHighlighter>
      <h2>{ts("model.title")}</h2>
      <LocalizedElement t="pages.intro.model.text" />
      <div>
        <h3>{ts("model.localeStruct.title")}</h3>
        <SyntaxHighlighter language="js" style={docco}>
          {String(LocaleShapeFile)}
        </SyntaxHighlighter>
        <h3>{ts("model.example.title")}</h3>
        <LocalizedElement t="pages.intro.model.example.text" />
        <SyntaxHighlighter language="json" style={docco}>
          {JSON.stringify(ExampleCode, null, 2)}
        </SyntaxHighlighter>
      </div>
    </article>
  );
}
