/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

/* ─── Theme Definitions ─── */
const themes = {
  ocean: {
    name: 'Ocean Blue',
    primary: '#2563eb',
    primaryDark: '#1d4ed8',
    primaryLight: '#dbeafe',
    primaryMid: '#93c5fd',
    primaryBg: '#eff6ff',
    accent: '#7c3aed',
    accentLight: '#e0e7ff',
    accentBorder: '#c7d2fe',
    accentText: '#4338ca',
    gradientFrom: '#2563eb',
    gradientTo: '#7c3aed',
  },
  emerald: {
    name: 'Emerald',
    primary: '#059669',
    primaryDark: '#047857',
    primaryLight: '#d1fae5',
    primaryMid: '#6ee7b7',
    primaryBg: '#ecfdf5',
    accent: '#0d9488',
    accentLight: '#ccfbf1',
    accentBorder: '#99f6e4',
    accentText: '#0f766e',
    gradientFrom: '#059669',
    gradientTo: '#0d9488',
  },
  sunset: {
    name: 'Sunset',
    primary: '#ea580c',
    primaryDark: '#c2410c',
    primaryLight: '#ffedd5',
    primaryMid: '#fdba74',
    primaryBg: '#fff7ed',
    accent: '#dc2626',
    accentLight: '#fee2e2',
    accentBorder: '#fca5a5',
    accentText: '#b91c1c',
    gradientFrom: '#ea580c',
    gradientTo: '#dc2626',
  },
  purple: {
    name: 'Royal Purple',
    primary: '#7c3aed',
    primaryDark: '#6d28d9',
    primaryLight: '#ede9fe',
    primaryMid: '#c4b5fd',
    primaryBg: '#f5f3ff',
    accent: '#6366f1',
    accentLight: '#eef2ff',
    accentBorder: '#a5b4fc',
    accentText: '#4f46e5',
    gradientFrom: '#7c3aed',
    gradientTo: '#6366f1',
  },
  rose: {
    name: 'Rose',
    primary: '#e11d48',
    primaryDark: '#be123c',
    primaryLight: '#ffe4e6',
    primaryMid: '#fda4af',
    primaryBg: '#fff1f2',
    accent: '#db2777',
    accentLight: '#fce7f3',
    accentBorder: '#f9a8d4',
    accentText: '#be185d',
    gradientFrom: '#e11d48',
    gradientTo: '#db2777',
  },
};

const ThemeContext = createContext();

const useTheme = () => useContext(ThemeContext);

/* ─── Apply CSS custom properties to :root ─── */
const applyThemeVars = (themeKey) => {
  const t = themes[themeKey] || themes.ocean;
  const root = document.documentElement;
  root.style.setProperty('--primary', t.primary);
  root.style.setProperty('--primary-dark', t.primaryDark);
  root.style.setProperty('--primary-light', t.primaryLight);
  root.style.setProperty('--primary-mid', t.primaryMid);
  root.style.setProperty('--primary-bg', t.primaryBg);
  root.style.setProperty('--accent', t.accent);
  root.style.setProperty('--accent-light', t.accentLight);
  root.style.setProperty('--accent-border', t.accentBorder);
  root.style.setProperty('--accent-text', t.accentText);
  root.style.setProperty('--gradient-from', t.gradientFrom);
  root.style.setProperty('--gradient-to', t.gradientTo);
};

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('colorTheme') || 'ocean';
  });

  /* Dark mode: toggle class on <html> */
  useEffect(() => {
    const el = document.documentElement;
    if (darkMode) {
      el.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      el.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  /* Color theme: apply CSS vars */
  useEffect(() => {
    applyThemeVars(theme);
    localStorage.setItem('colorTheme', theme);
  }, [theme]);

  const toggleDark = () => setDarkMode(p => !p);
  const setTheme = (key) => { if (themes[key]) setThemeState(key); };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDark, theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { useTheme, ThemeProvider };
