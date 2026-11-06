import type { AppLanguage } from "@/i18n/i18n";
import { setLanguagePreference } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { Content, Portal, Root, Trigger } from "@radix-ui/react-popover";
import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const styles = {
  content: clsx(
    "origin-top flex flex-col gap-3 mt-1 rounded-md z-2 bg-white shadow-[0_2px_8px] border-gray-300 border shadow-gray-300 px-3 py-3 data-[state=open]:animate-[slideUp_200ms_ease-out]",
  ),
};

const languageList: Record<AppLanguage, string> = {
  en: "English",
  "zh-Hans": "简体中文",
};

export default function LanguageSelector({
  children,
}: React.ComponentPropsWithoutRef<"div">) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  const activeLanguage = i18n.resolvedLanguage;
  const selectLanguage = async (language: AppLanguage) => {
    await i18n.changeLanguage(language);
    setLanguagePreference(language);
    setOpen(false);
  };
  return (
    <Root onOpenChange={setOpen} open={open}>
      <Trigger asChild>{children}</Trigger>
      <Portal>
        <Content side="bottom" align="center" className={styles.content}>
          <div className="flex flex-col gap-1 text-sm">
            {Object.entries(languageList).map(([langCode, langName]) => (
              <button
                key={`lang-${langCode}`}
                className={cn(
                  "px-4 py-1.5 w-full rounded-sm text-center focus:outline-0",
                  activeLanguage === langCode
                    ? "font-bold"
                    : "hover:cursor-pointer hover:bg-gray-200",
                )}
                disabled={activeLanguage === langCode}
                onClick={() => selectLanguage(langCode as AppLanguage)}
              >
                {langName}
              </button>
            ))}
          </div>
        </Content>
      </Portal>
    </Root>
  );
}
