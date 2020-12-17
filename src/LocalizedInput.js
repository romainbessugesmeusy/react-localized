import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { getLocaleIdentifier, getFallbackValue } from "./index";

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

const filterClassNames = (c) => !!c;

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
  const classNames = ["localized-input", className, appearance]
    .filter(filterClassNames)
    .join(" ");

  const _displayedLocales = Array.isArray(displayedLocales)
    ? displayedLocales
    : locales;

  const renderTabs = () => {
    return (
      <div className="labels" role="tablist">
        {_displayedLocales.map((locale) => {
          const id = getLocaleIdentifier(locale);
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              role="tab"
              type="button"
              className={`label ${isActive ? "active" : ""}`}
              data-active={isActive}
              aria-selected={isActive}
              onClick={() => setActiveTab(id)}
            >
              {labelRender({ locale })}
            </button>
          );
        })}
      </div>
    );
  };

  const renderControl = (locale) => {
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
    const shouldRenderLabel = ["list", "grid"].includes(appearance);
    const controlClassNames = [
      "control",
      controlClassName,
      isActive && "active",
    ]
      .filter(filterClassNames)
      .join(" ");
    return (
      <div
        key={id}
        className={controlClassNames}
        data-lang={id}
        data-active={isActive}
        role={appearance.startsWith("tabs") ? "tabpanel" : "textbox"}
      >
        {shouldRenderLabel && labelRender({ locale })}
        {controlRender(inputProps)}
      </div>
    );
  };

  return (
    <div className={classNames}>
      {appearance === "tabs" && renderTabs()}
      <div className="controls">{_displayedLocales.map(renderControl)}</div>
      {appearance === "tabs-below" && renderTabs()}
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
  appearance: PropTypes.oneOf(["tabs", " ", "list", "tabs-below"]),
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
