import { FC, ReactNode, createContext, useState } from 'react';

interface LanguageContextProps {
  language: string;
  switchLanguage: () => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LANGS = {
  EN: 'en',
  RU: 'ru',
} as const;

const DEFAULT_LANG = LANGS.EN;

export const LangContext = createContext<LanguageContextProps>({
  language: DEFAULT_LANG,
  switchLanguage: () => {},
});

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<string>(DEFAULT_LANG);

  const switchLang = () => {
    const newLang = lang === LANGS.EN ? LANGS.RU : LANGS.EN;
    setLang(newLang);
  };

  return (
    <LangContext.Provider
      value={{ language: lang, switchLanguage: switchLang }}
    >
      {children}
    </LangContext.Provider>
  );
};
