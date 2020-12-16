import React from "react";
import { useLocalized } from "./LocalizedContext";
import PropTypes from "prop-types";

function LocalizedElement({ tag, t, sanitizeFn, ...props }) {
  const { translator } = useLocalized();
  const translation = translator(t);
  if (translation !== t) {
    Object.assign(props, {
      dangerouslySetInnerHTML: { __html: sanitizeFn(translation) },
    });
  }
  return React.createElement(
    tag,
    props,
    translation !== t ? null : props.children
  );
}

LocalizedElement.propTypes = {
  tag: PropTypes.string,
  t: PropTypes.string.isRequired,
  sanitizeFn: PropTypes.func,
};

LocalizedElement.defaultProps = {
  tag: "div",
  sanitizeFn: (translation) => translation,
};

export default LocalizedElement;
