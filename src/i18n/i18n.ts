import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourceToBackend from "i18next-resources-to-backend";

const localeModules = import.meta.glob("./locales/*/*.json");

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
    lng: "en",
    fallbackLng: "en",
    ns: ["stock"],
    interpolation: { escapeValue: false },
  });

export default i18n;
