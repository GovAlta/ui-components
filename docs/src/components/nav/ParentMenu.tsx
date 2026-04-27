/**
 * ParentMenu.tsx
 *
 * Parent-level navigation showing all main sections.
 * - Components, Get started, Foundations: opens submenu (has many pages)
 * - Tokens, Examples: direct navigation (single page each)
 */

import React from "react";
import { GoabWorkSideMenu, GoabWorkSideMenuItem } from "@abgov/react-components";
import type { GoabIconType } from "@abgov/ui-components-common";
import { MenuSecondaryContent } from "./MenuSecondaryContent";
import { withBase } from "@/lib/base-url";

export type MenuSection =
  | "parent"
  | "get-started"
  | "foundations"
  | "examples"
  | "components"
  | "tokens";

interface ParentMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelectSection: (section: MenuSection) => void;
  /** Currently active section (for highlighting) */
  currentSection?: MenuSection;
}

interface TopLevelSection {
  id: Exclude<MenuSection, "parent">;
  label: string;
  icon: GoabIconType;
}

// Sections that navigate directly to a page (no submenu)
const DIRECT_NAV_SECTIONS: Partial<Record<MenuSection, string>> = {
  tokens: withBase("/tokens"),
  examples: withBase("/examples"),
};

// Sections that open a submenu
const SUBMENU_SECTIONS = ["components", "get-started", "foundations"] as const;

// Main navigation sections
const SECTIONS: TopLevelSection[] = [
  { id: "get-started", label: "Get started", icon: "document-text" },
  { id: "examples", label: "Examples", icon: "browsers" },
  { id: "components", label: "Components", icon: "shapes" },
  { id: "tokens", label: "Tokens", icon: "code-slash" },
  { id: "foundations", label: "Foundations", icon: "list" },
];

export function ParentMenu({
  isOpen,
  onToggle,
  onSelectSection,
  currentSection,
}: ParentMenuProps) {
  // Handle click on submenu item - prevent navigation, open submenu instead
  const handleSubmenuClick = (sectionId: MenuSection) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelectSection(sectionId);
  };

  // Primary content: Main navigation sections
  const primaryContent = (
    <>
      {SECTIONS.map((section) => {
        const directUrl = DIRECT_NAV_SECTIONS[section.id];
        const hasSubmenu = SUBMENU_SECTIONS.includes(
          section.id as (typeof SUBMENU_SECTIONS)[number],
        );
        const isActive = currentSection === section.id;

        if (directUrl) {
          // Direct navigation - use url prop
          return (
            <GoabWorkSideMenuItem
              key={section.id}
              label={section.label}
              icon={section.icon}
              url={directUrl}
              current={isActive}
            />
          );
        }

        if (hasSubmenu) {
          // Opens submenu - use section URL when active for matching,
          // otherwise use non-matching URL to prevent false positives on homepage
          const submenuUrl = isActive ? withBase(`/${section.id}`) : "/__never_match__";
          return (
            <div
              key={section.id}
              onClick={handleSubmenuClick(section.id)}
              style={{ cursor: "pointer" }}
            >
              <GoabWorkSideMenuItem
                label={section.label}
                icon={section.icon}
                url={submenuUrl}
                current={isActive}
              />
            </div>
          );
        } else {
          // Placeholder sections - disabled for now
          return (
            <GoabWorkSideMenuItem
              key={section.id}
              label={section.label}
              icon={section.icon}
              onClick={() => onSelectSection(section.id)}
            />
          );
        }
      })}
    </>
  );

  return (
    <>
      <GoabWorkSideMenu
        heading="Design system"
        url={withBase("/")}
        open={isOpen}
        onToggle={onToggle}
        onNavigate={(path: string) => {
          if (path && !path.startsWith("/__")) window.location.href = path;
        }}
        primaryContent={primaryContent}
        secondaryContent={<MenuSecondaryContent isOpen={isOpen} />}
      />
    </>
  );
}

export default ParentMenu;
