/**
 * MenuSecondaryContent.tsx
 *
 * Shared secondary content for all side menu variants.
 * Renders: Search button (with keyboard shortcut), Get Support, Release Notes.
 *
 * Extracted to avoid duplicating this block across ParentMenu, ComponentsSubMenu, etc.
 */

import { useCallback, useState, useEffect } from "react";
import { GoabxWorkSideMenuItem } from "@abgov/react-components/experimental";
import { GoabSpacer } from "@abgov/react-components";
import "./menu-secondary.css";

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

  // Open search modal (workaround until #3340 adds onClick to WorkSideMenuItem)
  const openSearch = useCallback(() => {
    window.dispatchEvent(new CustomEvent("goa-search-open"));
  }, []);

  return (
    <>
      <button
        className="search-menu-button"
        onClick={openSearch}
        type="button"
        aria-label="Search"
      >
        <goa-icon type="search" size="small" />
        {isOpen && (
          <>
            <span className="search-menu-label">Search</span>
            <span className="search-menu-badge">{shortcutKey}</span>
          </>
        )}
      </button>
      <GoabxWorkSideMenuItem label="Get support" icon="help-circle" url="/support" />
      <GoabxWorkSideMenuItem
        label="Release notes"
        icon="open"
        url="https://github.com/GovAlta/ui-components/releases"
      />
      <GoabSpacer vSpacing="m" />
    </>
  );
}
