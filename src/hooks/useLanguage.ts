import { useContext, useEffect, useState } from 'react';

import { LangContext } from '../context/langContext';

export const useLanguage = () => {
  const [locale, setlocale] = useState<Record<string, string>>({});

  const { language } = useContext(LangContext);

  useEffect(() => {
    const getLocale = async () => {
      const locale = await import(`../locales/${language}.json`);
      setlocale(locale);
    };

    getLocale();
  }, [language]);

  return locale;
};
