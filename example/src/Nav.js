import {Link} from "@reach/router";
import React from "react";
import {useLocalized} from 'react-localized';

export  default () => {
    const [t] = useLocalized();
    return (<nav>
        <ul>
            <li>
                <Link to="/">{t("pages.intro.title")}</Link>
                <ul>
                    <li>
                        <Link to="#motivation">Motivation</Link>
                    </li>
                    <li>
                        <Link to="#installation">
                            {t("pages.installation.title")}
                        </Link>
                    </li>
                    <li>
                        <Link to="#locale-object">The <strong>Locale</strong> object</Link>
                    </li>
                </ul>
            </li>
            <li>
                <Link to="/components">{t("pages.components.title")}</Link>
                <ul>
                    <li>
                        <Link to="/components#LocalizedInput">LocalizedInput</Link>
                    </li>
                    <li>
                        <Link to="/components#LocalizedContext">
                            LocalizedContext
                        </Link>
                    </li>
                    <li>
                        <Link to="/components#LocalizedChooser">LocaleChooser</Link>
                    </li>
                </ul>
            </li>
            <li>
                <Link to="/hooks-utilities">Hooks and utilities</Link>
                <ul>
                    <li>
                        <Link to="/hooks-utilities/#useLocalize">useLocalize</Link>
                    </li>
                    <li>
                        <Link to="/hooks-utilities/#getLocaleIdentifier">
                            getLocaleIdentifier
                        </Link>
                    </li>
                    <li>
                        <Link to="/hooks-utilities/#getLocalesMap">
                            getLocalesMap
                        </Link>
                    </li>
                    <li>
                        <Link to="/hooks-utilities/#getFallbackValue">
                            getFallbackValue
                        </Link>
                    </li>
                    <li>
                        <Link to="/hooks-utilities/#generateLocalizedValueGetter">
                            generateLocalizedValueGetter
                        </Link>
                    </li>
                    <li>
                        <Link to="/hooks-utilities/#generateTranslatorAndGetter">
                            generateTranslatorAndGetter
                        </Link>
                    </li>
                </ul>
            </li>
            <li>
                <Link to="/editor">
                    {t("pages.editor.title")}
                    <span className="try-me">{t("nav.tryMe")}</span>
                </Link>
            </li>
        </ul>
    </nav>);
}