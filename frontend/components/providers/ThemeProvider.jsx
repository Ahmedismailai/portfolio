"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";
import { useMobile } from "@/lib/useMobile";

const THEME_STORAGE_KEY = "portfolio-theme";
const DEFAULT_THEME = "dark";

const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  toggleTheme: () => {},
});

const getStoredTheme = () => {
  if (typeof window === "undefined") return DEFAULT_THEME;

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : DEFAULT_THEME;
};

const applyTheme = (theme) => {
  if (typeof document === "undefined") return;

  const isDark = theme === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.body.classList.toggle("dark", isDark);
};

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(DEFAULT_THEME);
  const isMobile = useMobile();

  useEffect(() => {
    window.localStorage.removeItem("theme");
    const savedTheme = getStoredTheme();
    setThemeState(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const setTheme = (nextTheme) => {
    const safeTheme = nextTheme === "light" ? "light" : "dark";

    setThemeState(safeTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, safeTheme);
    applyTheme(safeTheme);
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <MotionConfig reducedMotion={isMobile ? "always" : "never"}>{children}</MotionConfig>
    </ThemeContext.Provider>
  );
}
