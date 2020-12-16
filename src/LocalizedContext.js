import React, { useContext } from "react";
import { generateTranslatorAndGetter } from "./index";

const defaultValue = {
  /**
   * @type {Locale[]}
   */
  locales: [],
  /**
   * @type {Locale}
   */
  locale: {},
  /**
   * type {Object}
   */
  localizedValues: {},
  /**
   * @function setLocale
   * @param {Locale} locale
   */
  setLocale: function setLocale(locale){

  }
};

const LocalizedContext = React.createContext(defaultValue);

function useLocalized() {
  const context = useContext(LocalizedContext);
  return {
    ...generateTranslatorAndGetter(
      context.locales,
      context.locale,
      context.localizedValues
    ),
    ...context,
  };
}
export default LocalizedContext;
export { useLocalized };
