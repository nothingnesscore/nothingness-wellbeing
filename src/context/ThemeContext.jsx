import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkModePreference, setDarkModePreference] = useState(() => {
    const saved = localStorage.getItem('darkModePreference');
    if (saved) return saved;
    return 'auto';
  });
  
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkModePreference');
    const pref = saved ? saved : 'auto';
    if (pref === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return pref === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('darkModePreference', darkModePreference);
    
    let actualDarkMode;
    if (darkModePreference === 'auto') {
      actualDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      actualDarkMode = darkModePreference === 'dark';
    }
    
    setDarkMode(actualDarkMode);
    
    if (actualDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkModePreference]);
  
  useEffect(() => {
    if (darkModePreference !== 'auto') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const actualDarkMode = mediaQuery.matches;
      setDarkMode(actualDarkMode);
      if (actualDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [darkModePreference]);

  return (
    <ThemeContext.Provider value={{ darkMode, darkModePreference, setDarkModePreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
