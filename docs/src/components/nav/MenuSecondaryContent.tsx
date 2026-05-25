/**
 * MenuSecondaryContent.tsx
 *
 * Shared secondary content for all side menu variants.
 * Renders: Search button (with keyboard shortcut), Get Support, Release Notes.
 *
 * Extracted to avoid duplicating this block across ParentMenu, ComponentsSubMenu, etc.
 */

import { useCallback, useState, useEffect } from "react";
import { GoabBadge, GoabIcon, GoabSpacer, GoabWorkSideMenuItem } from "@abgov/react-components";

import { withBase } from "@/lib/base-url";
import "./menu-secondary.css";

const THEME_STORAGE_KEY = "goab-theme";
const SANS_FAMILY_ACUMIN = "acumin-variable, helvetica-neue, arial, sans-serif";
const SANS_FAMILY_FALLBACK = "helvetica-neue, arial, sans-serif";

function readInitialTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

interface MenuSecondaryContentProps {
  /** Whether the side menu is expanded (controls label/badge visibility) */
  isOpen: boolean;
}

export function MenuSecondaryContent({ isOpen }: MenuSecondaryContentProps) {
  // Detect Mac vs Windows for keyboard shortcut display
  const [shortcutKey, setShortcutKey] = useState("⌘K");
  useEffect(() => {
    const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    setShortcutKey(isMac ? "⌘K" : "Ctrl K");
  }, []);

  // Theme state — synced with <html data-theme> attribute set by pre-paint script
  const [themeMode, setThemeMode] = useState<"light" | "dark">(readInitialTheme);
  const isDark = themeMode === "dark";
  const [isAcuminSansEnabled, setIsAcuminSansEnabled] = useState(true);

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // localStorage blocked: fail silently
      }
      return next;
    });
  }, []);

  const toggleSansFontFamily = useCallback(() => {
    setIsAcuminSansEnabled((prev) => {
      const next = !prev;
      document.documentElement.style.setProperty(
        "--goa-font-family-sans",
        next ? SANS_FAMILY_ACUMIN : SANS_FAMILY_FALLBACK,
      );
      return next;
    });
  }, []);

  // Open search modal (workaround until #3340 adds onClick to WorkSideMenuItem)
  const openSearch = useCallback(() => {
    window.dispatchEvent(new CustomEvent("goa-search-open"));
  }, []);

  const showSearchTooltip = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>,
    ) => {
      event.currentTarget.dispatchEvent(
        new CustomEvent("_hoverItem", {
          bubbles: true,
          composed: true,
          detail: {
            label: "Search",
            el: event.currentTarget,
          },
        }),
      );
    },
    [],
  );

  const hideSearchTooltip = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>,
    ) => {
      event.currentTarget.dispatchEvent(
        new CustomEvent("_blurItem", {
          bubbles: true,
          composed: true,
        }),
      );
    },
    [],
  );

  return (
    <>
      <button
        className="search-menu-button"
        onClick={openSearch}
        onMouseEnter={showSearchTooltip}
        onMouseLeave={hideSearchTooltip}
        onFocus={showSearchTooltip}
        onBlur={hideSearchTooltip}
        type="button"
        aria-label="Search"
      >
        <GoabIcon type="search" size="small" />
        {isOpen && (
          <>
            <span className="search-menu-label">Search</span>
            <span className="search-menu-badge">{shortcutKey}</span>
          </>
        )}
      </button>
      <button
        className="search-menu-button"
        onClick={toggleTheme}
        type="button"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <GoabIcon type={isDark ? "sunny" : "moon"} size="small" />
        {isOpen && (
          <>
            <span className="search-menu-label">
              {isDark ? "Light mode" : "Dark mode"}
            </span>
            <GoabBadge type="important" emphasis="subtle" content="New" />
          </>
        )}
      </button>
      <button
        className="search-menu-button"
        onClick={toggleSansFontFamily}
        type="button"
        aria-label={
          isAcuminSansEnabled
            ? "Switch to system sans font"
            : "Switch to acumin variable sans font"
        }
      >
        <GoabIcon type="settings" size="small" />
        {isOpen && (
          <>
            <span className="search-menu-label">Toggle font</span>
            <span className="search-menu-badge">
              {isAcuminSansEnabled ? "Acumin" : "System"}
            </span>
          </>
        )}
      </button>
      <GoabWorkSideMenuItem
        label="Get support"
        icon="help-circle"
        url={withBase("/support")}
      />
      <GoabSpacer vSpacing="m" />
    </>
  );
}
