import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

// A simple hook to manage app-wide state like language and user info
export const useApp = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  const changeLanguage = (lng: 'en' | 'id') => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  // Simple client-side user state management (for demonstration)
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // In a real app, this would fetch user data from a session or context
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user data from localStorage', e);
      }
    }
  }, []);

  return {
    t,
    lang,
    changeLanguage,
    user,
    setUser,
  };
};
