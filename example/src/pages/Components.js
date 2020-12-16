import React from "react";
import { useLocalized } from "react-localized";
import DOMPurify from "dompurify";
export default function Components(props) {
  const { t } = useLocalized();

  return (
    <article className="components">
      <h1>{t("pages.components.title")}</h1>
      <h2>LocalizedInput</h2>
      <div
        className="description"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            t("pages.components.localizedInput.description")
          ),
        }}
      />
    </article>
  );
}
