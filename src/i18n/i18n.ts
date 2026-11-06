import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourceToBackend from "i18next-resources-to-backend";
import { readPreference, setLanguagePreference } from "@/lib/storage";

const localeModules = import.meta.glob("./locales/*/*.json");

export const supportedLanguages = ["zh-Hans", "en"] as const;
export type AppLanguage = (typeof supportedLanguages)[number];

const updateDocumentLanguage = (language: string) => {
  document.documentElement.lang = language;
};

i18n.on("languageChanged", updateDocumentLanguage);

let appLanguage = "en";
const preference = readPreference();
if (!preference || !preference.language) {
  setLanguagePreference(appLanguage);
} else {
  appLanguage = preference.language;
}

i18n
  .use(initReactI18next)
  .use(
    resourceToBackend((language: string, namespace: string) => {
      const path = `./locales/${language}/${namespace}.json`;
      const loader = localeModules[path];
      if (!loader)
        return Promise.reject(new Error(`Missing translation bundle: ${path}`));
      return loader();
    }),
  )
  .init({
    lng: appLanguage,
    fallbackLng: "en",
    ns: ["stock"],
    interpolation: { escapeValue: false },
  })
  .then(() => updateDocumentLanguage(i18n.resolvedLanguage ?? i18n.language));

export default i18n;
