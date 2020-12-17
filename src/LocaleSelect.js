import React from "react";
import PropTypes from "prop-types";
import { getLocaleIdentifier, getLocalesMap } from "./index";

const LocaleShape = PropTypes.shape({
  // two-char language code ("en", "fr", "de")
  tag: PropTypes.string.isRequired,
  // human readable language description
  language: PropTypes.oneOf([PropTypes.object, PropTypes.string]).isRequired,
  //latin, cyrillic, etc.
  script: PropTypes.string,
  // two-char region code ("US", "CA", "GB", "CH")
  region: PropTypes.string,
  // text direction / orientation: right to left, left to right
  orientation: PropTypes.oneOf(["rtl", "ltr"]),
  // optional emoji string for displaying a flag 🇨🇬 🇲🇼 🇹🇩
  flag: PropTypes.string,
  // String that can be used to search for a locale
  keywords: PropTypes.string,
  // locale identifier of the fallback locale
  fallback: PropTypes.string,
  // optional identifier. If not specified, locale identifier will result in the concatenation
  // of tag and region, with a dash separator: "en-GB", "fr-CA", "nl-BE"
  id: PropTypes.string,
});

/**
 * Produce a native HTML Select allowing to select one ore several locales
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function LocaleSelect(props) {
  const localesMap = getLocalesMap(props.locales);
  const { optionRender } = props;

  function getSelection(event) {
    if (props.multiple) {
      return Array.from(event.target.selectedOptions).map(
        (option) => localesMap[option.value]
      );
    }
    return localesMap[event.target.value];
  }

  function getValue() {
    if (props.multiple) {
      return props.value.map((l) => getLocaleIdentifier(l));
    }
    return typeof props.value === "string"
      ? props.value
      : getLocaleIdentifier(props.value);
  }

  return (
    <select
      className={props.className}
      value={getValue()}
      onChange={(event) => props.onChange(getSelection(event), event)}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      multiple={props.multiple}
    >
      {props.locales.map((locale) => {
        const id = getLocaleIdentifier(locale);
        return (
          <option value={id} key={id}>
            {optionRender ? optionRender({ locale }) : locale.language}
          </option>
        );
      })}
    </select>
  );
}
LocaleSelect.defaultProps = {
  className: "locale-select",
};
LocaleSelect.propTypes = {
  locales: PropTypes.arrayOf(LocaleShape),
  className: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.oneOfType([
    LocaleShape,
    PropTypes.arrayOf(LocaleShape),
    PropTypes.string,
  ]),
  multiple: PropTypes.bool,
};

export default LocaleSelect;
