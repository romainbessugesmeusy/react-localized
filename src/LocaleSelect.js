import React from "react";
import PropTypes from "prop-types";
import { getLocaleIdentifier, getLocalesMap } from "./index";
import LocaleShape from "./LocalShape";

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
