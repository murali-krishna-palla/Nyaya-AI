import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('nyaya-language');
    if (saved) return saved;
    const user = localStorage.getItem('nyaya-user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed.preferredLanguage) return parsed.preferredLanguage;
      } catch { /* ignore */ }
    }
    return 'english';
  });

  useEffect(() => {
    localStorage.setItem('nyaya-language', language);
  }, [language]);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value == null) return key;
      value = value[k];
    }
    return value ?? key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
