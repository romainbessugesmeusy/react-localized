import React from "react";
import LocaleChooser from "./LocaleChooser";
import LocalizedInput from "./LocalizedInput";
import LocalizedContext, { useLocalized } from "./LocalizedContext";
import LocaleSelect from "./LocaleSelect";
import "./styles.module.css";

/**
 * @typedef Locale
 * @property {String} tag two-char language code ("en", "fr", "de")
 * @property {String} region two-char region code ("US", "CA", "GB", "CH")
 * @property {Object|String} language human readable language description
 * @property {String} direction text direction / orientation: right to left, left to right. One of rtl, ltr
 * @property {String} flag optional emoji string for displaying a flag 🇨🇬 🇲🇼 🇹🇩
 * @property {String} keywords locale identifier of the fallback locale
 * @property {String} script latin, cyrillic, etc.
 * @property {String} id optional identifier. If not specified, locale identifier will result in the concatenation of tag and region, with a dash separator: "en-GB", "fr-CA", "nl-BE"
 */

/**
 *
 * @param {Locale} locale
 * @returns {string}
 */

export function getLocaleIdentifier(locale) {
  if (locale.id) {
    return locale.id;
  }
  return locale.region ? `${locale.tag}-${locale.region}` : locale.tag;
}

/**
 * Transforms an array of locales into a Javascript hashmap, using generated locale identifier as key
 * @param {Locale[]} locales
 * @returns {Object<String,Locale>}
 */
export function getLocalesMap(locales) {
  return locales.reduce((map, locale) => {
    return { ...map, [getLocaleIdentifier(locale)]: locale };
  }, {});
}

/**
 *
 * @param {Locale[]} locales
 * @param {String} localeId
 * @param {Object<String,String>} value
 * @returns {String|undefined}
 */
export const getFallbackValue = (locales, localeId, value) => {
  const map = getLocalesMap(locales);
  const locale = map[localeId];
  if (!locale || !value) {
    return;
  }
  let localizedValue,
    fallbackId = locale.fallback,
    fallbackLocale = map[locale.fallback];
  while (!localizedValue && fallbackLocale) {
    fallbackId = getLocaleIdentifier(fallbackLocale);
    localizedValue = value[fallbackId];
    fallbackLocale = map[fallbackLocale.fallback];
    if (fallbackLocale && fallbackLocale.fallback === fallbackId) {
      console.error("Circular reference detected in Locale fallback", locale);
      break;
    }
  }
  if (!localizedValue) {
    // look for same language values
    Object.keys(value)
      .filter((valueLocaleId) => value[valueLocaleId])
      .forEach((valueLocaleId) => {
        const valueLocale = map[valueLocaleId];
        if (valueLocale && valueLocale.tag === locale.tag) {
          localizedValue = value[valueLocaleId];
        }
      });
  }
  return localizedValue;
};

/**
 *
 * @param {Locale[]} locales
 * @param {Locale} locale
 * @returns {function(*=, *): (*)}
 */
function generateLocalizedValueGetter(locales, locale) {
  if (!locale) {
    throw new Error(
      "Trying to generate a localizedValueGetter without a target locale"
    );
  }
  function getLocalizedValue(value, fallback) {
    switch (typeof value) {
      case "string":
        return value;
      case "undefined": {
        return fallback;
      }
      default:
        break;
    }
    const identifier = getLocaleIdentifier(locale);
    if (typeof value[identifier] === "string") {
      return value[identifier];
    }
    const fallbackValue = getFallbackValue(locales, identifier, value);
    if (typeof fallbackValue === "string") {
      return fallbackValue;
    }
    return fallback;
  }
  return getLocalizedValue;
}

/**
 *
 * @param {Locale[]} locales
 * @param {Locale} locale
 * @param {Object} localizedValues
 * @returns {((function(*=): *)|(function(*=, *): *))[]}
 */
function generateTranslatorAndGetter(locales, locale, localizedValues) {
  const getLocalizedValue = generateLocalizedValueGetter(locales, locale);
  function translator(translationId) {
    let segment,
      value = localizedValues,
      segments = translationId.split(".");

    while ((segment = segments.shift()) && typeof value === "object") {
      value = value[segment];
    }
    return getLocalizedValue(value, translationId);
  }
  return [translator, getLocalizedValue];
}

export {
  LocalizedInput,
  LocaleChooser,
  LocaleSelect,
  LocalizedContext,
  useLocalized,
  generateLocalizedValueGetter,
  generateTranslatorAndGetter,
};