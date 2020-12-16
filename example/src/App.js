import React, { useState } from "react";
import {
  getLocalesMap,
  LocalizedContext,
  generateTranslatorAndGetter,
  LocaleSelect,
} from "react-localized";
import "react-localized/dist/index.css";
import { Router } from "@reach/router";

import locales from "./locales";
import data from "./data";
import Introduction from "./pages/Introduction";
import Components from "./pages/Components";
import Editor from "./pages/Editor";
import Nav from "./Nav";

const App = () => {
  const localesMap = getLocalesMap(locales);
  const [appLocale, setAppLocale] = useState(localesMap["fr-FR"]);
  const [localizedValues, setLocalizedValues] = useState(data);
  const { getLocalized } = generateTranslatorAndGetter(
    locales,
    appLocale,
    localizedValues
  );

  return (
    <div className="app">
      <LocalizedContext.Provider
        value={{
          locales,
          locale: appLocale,
          localizedValues,
          setLocale: setAppLocale,
        }}
      >
        <aside>
          <h1>React&nbsp;Localized</h1>
          <Nav struct={data.nav} />
          <LocaleSelect
            value={appLocale}
            onChange={setAppLocale}
            locales={locales}
            optionRender={({ locale }) => {
              return `${locale.flag ? locale.flag : ""} ${getLocalized(
                locale.language
              )}`;
            }}
          />
        </aside>
        <Router>
          <Introduction path="/" />
          <Components path="/components" />
          <Editor
            path="/editor"
            onChange={setLocalizedValues}
            locales={locales}
            localizedValues={localizedValues}
          />
        </Router>
      </LocalizedContext.Provider>
    </div>
  );
};

export default App;
