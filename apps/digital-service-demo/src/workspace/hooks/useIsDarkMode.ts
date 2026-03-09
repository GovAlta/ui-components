import { useState, useEffect } from "react";

/**
 * Lightweight read-only hook to detect if dark mode is active.
 * Watches the data-theme attribute on <html> set by useTheme.
 */
export function useIsDarkMode(): boolean {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute("data-theme") === "dark",
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
