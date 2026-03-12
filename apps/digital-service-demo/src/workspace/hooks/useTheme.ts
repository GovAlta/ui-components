import { useState, useEffect, useCallback } from "react";

export type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "theme-preference";

function getStoredPreference(): ThemePreference {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") return stored;
  return "light";
}

function getSystemDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolveTheme(preference: ThemePreference): "dark" | "light" {
  if (preference === "system") return getSystemDark() ? "dark" : "light";
  return preference;
}

function applyTheme(preference: ThemePreference) {
  document.documentElement.setAttribute("data-theme", resolveTheme(preference));
}

/**
 * Three-way theme toggle: System (default) / Light / Dark.
 * Persists to localStorage. Sets data-theme on <html>.
 */
export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(getStoredPreference);
  const [isDark, setIsDark] = useState(
    () => resolveTheme(getStoredPreference()) === "dark",
  );

  useEffect(() => {
    applyTheme(preference);
    setIsDark(resolveTheme(preference) === "dark");
    localStorage.setItem(STORAGE_KEY, preference);
  }, [preference]);

  // Listen for system preference changes when in "system" mode
  useEffect(() => {
    if (preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
      document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [preference]);

  const toggleTheme = useCallback(() => {
    setPreference((prev) => {
      // If system, resolve current state and flip it
      if (prev === "system") return getSystemDark() ? "light" : "dark";
      return prev === "dark" ? "light" : "dark";
    });
  }, []);

  return { preference, isDark, toggleTheme };
}

/**
 * Initialize theme before React renders to prevent FOUC.
 * Call this at module level in main.tsx.
 */
export function initTheme() {
  applyTheme(getStoredPreference());
}
