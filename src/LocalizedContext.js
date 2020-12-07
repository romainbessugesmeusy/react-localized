import React, { useContext } from "react";
import { generateTranslatorAndGetter } from "./index";

const LocalizedContext = React.createContext({
  locales: [],
  locale: {},
  localizedValues: {},
});

const useLocalized = function () {
  const context = useContext(LocalizedContext);
  return generateTranslatorAndGetter(
    context.locales,
    context.locale,
    context.localizedValues
  );
};

export default LocalizedContext;
export { useLocalized };
