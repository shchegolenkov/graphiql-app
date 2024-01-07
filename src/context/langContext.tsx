import { createContext } from 'react';

export const LangContext = createContext({
  language: '',
  switchLanguage: () => {},
});
