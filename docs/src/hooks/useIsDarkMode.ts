/**
 * useIsDarkMode.ts
 *
 * Watches the active theme via the `data-theme` attribute on <html>.
 * Returns true when in dark mode. Reacts to toggle changes via MutationObserver.
 *
 * Why read from the DOM attribute instead of localStorage:
 * - The pre-paint script in BaseLayout.astro sets `data-theme` from
 *   localStorage > prefers-color-scheme > "light", so the attribute is
 *   the source of truth for what's currently rendered.
 * - localStorage has no in-tab change event; MutationObserver on the
 *   attribute is the cleanest way to react to toggle in other islands.
 * - localStorage may be blocked (private mode, sandboxed iframe); the
 *   DOM attribute is always set.
 *
 * Astro islands cannot share React context, so the DOM attribute is the
 * cross-island sync channel for theme.
 */

import { useEffect, useState } from "react";

export function useIsDarkMode(): boolean {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.getAttribute("data-theme") === "dark",
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
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
