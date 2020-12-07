import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { getLocaleIdentifier, getFallbackValue } from "./index";
import LocaleShape from "./LocalShape";

export default function LocalizedInput({
  readOnlyLocales,
  locales,
  value,
  isMultiline,
  onChange,
  controlRender,
  labelRender,
  className,
  controlClassName,
  defaultSelectedTab,
  appearance,
  name,
  displayedLocales,
}) {
  const [activeTab, setActiveTab] = useState(
    defaultSelectedTab || getLocaleIdentifier(locales[0])
  );
  const handleChange = (localeId) => (event) => {
    onChange({ ...value, [localeId]: event.target.value }, name);
  };
  const classNames = ["localized-input", className, appearance].filter(
    (c) => !!c
  );
  const _displayedLocales = Array.isArray(displayedLocales)
    ? displayedLocales
    : locales;
  return (
    <div className={classNames.join(" ")}>
      {appearance === "tabs" && (
        <div className="labels">
          {_displayedLocales.map((locale) => {
            const id = getLocaleIdentifier(locale);
            const isActive = activeTab === id;
            return (
              <div
                key={id}
                className={`label ${isActive ? "active" : ""}`}
                data-active={isActive}
                onClick={() => setActiveTab(id)}
              >
                {labelRender({ locale })}
              </div>
            );
          })}
        </div>
      )}
      <div className="controls">
        {_displayedLocales.map((locale) => {
          const id = getLocaleIdentifier(locale);
          const readOnly = readOnlyLocales.includes(id);
          const isActive = activeTab === id;
          const inputProps = {
            isActive,
            onChange: handleChange(id),
            readOnly,
            isMultiline,
            disabled: readOnly,
            placeholder: getFallbackValue(locales, id, value),
            value: typeof value === "object" ? value[id] || "" : "",
            lang: id,
            dir: locale.direction,
          };
          return (
            <div
              key={id}
              className={`control ${controlClassName} ${
                isActive ? "active" : ""
              }`}
              data-lang={id}
              data-active={isActive}
            >
              {["list", "grid"].includes(appearance) && labelRender({ locale })}
              {controlRender(inputProps)}
            </div>
          );
        })}
      </div>
      {appearance === "tabs-below" && (
        <div className="labels">
          {_displayedLocales.map((locale) => {
            const id = getLocaleIdentifier(locale);
            const isActive = activeTab === id;
            return (
              <div
                key={id}
                className={`label ${isActive ? "active" : ""}`}
                data-active={isActive}
                onClick={() => setActiveTab(id)}
              >
                {labelRender({ locale })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

LocalizedInput.propTypes = {
  className: PropTypes.string,
  controlClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  locales: PropTypes.arrayOf(LocaleShape).isRequired,
  readOnlyLocales: PropTypes.arrayOf(String),
  displayedLocales: PropTypes.arrayOf(LocaleShape),
  isMultiline: PropTypes.bool,
  controlRender: PropTypes.func,
  appearance: PropTypes.oneOf(["tabs", "grid", "list", "tabs-below"]),
  labelRender: PropTypes.func,
  defaultActiveTab: PropTypes.string,
};

LocalizedInput.defaultProps = {
  appearance: "list",
  readOnlyLocales: [],
  displayedLocales: [],
  controlClassName: "",
  labelClassName: "",
  labelRender: ({ locale }) => {
    return (
      <label>
        <span className="tag">{locale.tag}</span>
        {locale.region && <span className="region">{locale.region}</span>}
      </label>
    );
  },
  controlRender: ({ isMultiline, isActive, ...inputProps }) => (
    <Fragment>
      {isMultiline ? (
        <textarea {...inputProps} />
      ) : (
        <input type="text" {...inputProps} />
      )}
    </Fragment>
  ),
};
