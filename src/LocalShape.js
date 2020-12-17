import PropTypes from "prop-types";

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
export default LocaleShape;
