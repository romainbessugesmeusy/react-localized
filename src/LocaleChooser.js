import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getLocaleIdentifier, getLocalesMap, useLocalized } from "./index";
import LocaleShape from "./LocalShape";

export default function LocaleChooser(props) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredLocales, setFilteredLocales] = useState(props.locales);
  const selectedLocales = props.multiple
    ? props.value.map((locale) => getLocaleIdentifier(locale))
    : [getLocaleIdentifier(props.value)];
  const map = getLocalesMap(props.locales);
  const { getLocalized } = useLocalized();

  useEffect(() => {
    if (searchValue === "") {
      return setFilteredLocales(props.locales);
    }
    setFilteredLocales(
      props.locales.filter((locale) => {
        if (selectedLocales.includes(getLocaleIdentifier(locale))) {
          return true;
        }
        if (locale.tag && locale.tag.match(new RegExp(searchValue, "i"))) {
          return true;
        }
        if (
          locale.region &&
          locale.region.match(new RegExp(searchValue, "i"))
        ) {
          return true;
        }
        if (
          locale.language &&
          getLocalized(locale.language).match(
            new RegExp(`.*${searchValue}.*`, "i")
          )
        ) {
          return true;
        }
        if (
          locale.keywords &&
          locale.keywords.match(new RegExp(`.*${searchValue}.*`, "i"))
        ) {
          return true;
        }
      })
    );
  }, [searchValue]);

  const setSelectedLocales = (locales) => {
    props.onChange(
      props.multiple ? locales.map((id) => map[id]) : map[locales.pop()]
    );
  };

  return (
    <div className="locale-chooser">
      {props.displaySearch && (
        <div className="search-bar">
          <input
            className="search-input"
            type="search"
            value={searchValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
      )}
      <div className="options-container">
        {filteredLocales.map((locale) => {
          const id = getLocaleIdentifier(locale);
          const OptionRender = props.optionRender;
          return (
            <OptionRender
              key={id}
              checked={selectedLocales.includes(id)}
              name={props.name}
              multiple={props.multiple}
              locale={locale}
              onSelect={() => {
                setSelectedLocales(selectedLocales.concat([id]));
              }}
              onDeselect={() => {
                setSelectedLocales(
                  selectedLocales.filter((selectedId) => selectedId !== id)
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

const LocaleOption = ({
  onSelect,
  onDeselect,
  name,
  multiple,
  checked,
  locale,
}) => {
  const { getLocalized } = useLocalized();
  return (
    <label className={checked ? "selected" : ""}>
      <input
        name={name}
        type={multiple ? "checkbox" : "radio"}
        value={getLocaleIdentifier(locale)}
        checked={checked}
        onChange={(event) => (event.target.checked ? onSelect() : onDeselect())}
      />
      {locale.flag && <span className="flag">{locale.flag}</span>}
      <span className="language">{getLocalized(locale.language)}</span>
    </label>
  );
};

LocaleOption.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  checked: PropTypes.bool,
  locale: LocaleShape,
};

LocaleChooser.defaultProps = {
  optionRender: LocaleOption,
  name: "locale",
};

LocaleChooser.propTypes = {
  value: PropTypes.oneOfType([LocaleShape, PropTypes.arrayOf(LocaleShape)]),
  locales: PropTypes.arrayOf(LocaleShape),
  onChange: PropTypes.func.isRequired,
  displaySearch: PropTypes.bool,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  optionRender: PropTypes.func,
};
