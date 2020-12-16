import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocalized, LocalizedInput, LocaleChooser } from "react-localized";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import findRef from "campsi-find-references";

function downloadJSON(exportObj, exportName) {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj, null, 2));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
function RichTextLocalizedControl({ onChange, value, placeholder, lang }) {
  return (
    <CKEditor
      config={{
        toolbar: ["undo", "redo", "|", "bold", "italic", "|", "bulletedList"],
        placeholder,
        width: "100%",
        height: 500,
        language: lang,
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
          ],
        },
      }}
      editor={ClassicEditor}
      data={value}
      lang={lang}
      onChange={(event, editor) => {
        const content = editor.getData();
        onChange({ target: { value: content } });
      }}
    />
  );
}

const strings = [
  { name: "pages.intro.title" },
  { name: "pages.intro.motivation.title" },
  { name: "pages.intro.motivation.text", rich: true },
  { name: "pages.intro.install.title" },
  { name: "pages.intro.install.text", rich: true },
  { name: "pages.intro.usage.title" },
  { name: "pages.intro.usage.text", rich: true },
  { name: "pages.intro.model.title" },
  { name: "pages.intro.model.text", rich: true },
  { name: "pages.components.title" },
  { name: "pages.components.localizedInput.description", rich: true },
  { name: "pages.editor.title" },
];

export default function Editor({ onChange, localizedValues, locales }) {
  const { t } = useLocalized();
  const localeChooserRef = useRef(null);
  const [localeChooserActive, setLocaleChooserActive] = useState(false);
  const [selectedLocales, setSelectedLocales] = useState(
    locales.filter((l) => !l.region)
  );

  const onFieldChange = (value, name) => {
    const nextValues = { ...localizedValues };
    findRef(nextValues, name.split("."))[0].set(value);
    onChange(nextValues);
  };

  const onClickOutside = useCallback((event) => {
    let el = event.target;
    while (el) {
      el = el.parentElement;
      if (el === localeChooserRef.current) {
        return;
      }
    }
    setLocaleChooserActive(false);
  }, []);

  useEffect(() => {
    if (localeChooserActive) {
      document.addEventListener("click", onClickOutside);
    } else {
      document.removeEventListener("click", onClickOutside);
    }
  }, [localeChooserActive, onClickOutside]);

  return (
    <article className="editor">
      <h1>{t("pages.editor.title")}</h1>
      <div
        className="locale-chooser-dropdown"
        data-active={localeChooserActive}
      >
        <button onClick={() => setLocaleChooserActive(!localeChooserActive)}>
          {t("pages.editor.localeChooser.label")}
        </button>
        <div className="options" ref={localeChooserRef}>
          <LocaleChooser
            locales={locales}
            multiple
            onChange={setSelectedLocales}
            value={selectedLocales}
            displaySearch
          />
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          downloadJSON(localizedValues, "strings");
        }}
      >
        {strings.map(({ name, rich }) => {
          const value = findRef(localizedValues, name.split("."))[0];
          return (
            <div className="field" key={name}>
              <label>{name}</label>
              <LocalizedInput
                value={value && value.get()}
                name={name}
                onChange={onFieldChange}
                locales={locales}
                displayedLocales={selectedLocales}
                controlRender={rich && RichTextLocalizedControl}
                labelRender={({ locale }) => locale.flag}
                appearance={rich ? "tabs-below" : "grid"}
              />
            </div>
          );
        })}
        <button>Export JSON</button>
      </form>
    </article>
  );
}
