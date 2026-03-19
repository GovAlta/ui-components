/**
 * ParentMenu.tsx
 *
 * Parent-level navigation showing all main sections.
 * - Components, Get started, Foundations: opens submenu (has many pages)
 * - Tokens, Examples: direct navigation (single page each)
 */

import React from "react";
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
} from "@abgov/react-components/experimental";
import { MenuSecondaryContent } from "./MenuSecondaryContent";

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

// Sections that navigate directly to a page (no submenu)
const DIRECT_NAV_SECTIONS: Record<string, string> = {
  tokens: "/tokens",
  examples: "/examples",
};

// Sections that open a submenu
const SUBMENU_SECTIONS = ["components", "get-started", "foundations"];

// Main navigation sections
const SECTIONS = [
  { id: "get-started" as const, label: "Get started", icon: "document-text" },
  { id: "examples" as const, label: "Examples", icon: "browsers" },
  { id: "components" as const, label: "Components", icon: "shapes" },
  { id: "tokens" as const, label: "Tokens", icon: "code-slash" },
  { id: "foundations" as const, label: "Foundations", icon: "list" },
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
        const hasSubmenu = SUBMENU_SECTIONS.includes(section.id);
        const isActive = currentSection === section.id;

        if (directUrl) {
          // Direct navigation - use url prop
          return (
            <GoabxWorkSideMenuItem
              key={section.id}
              label={section.label}
              icon={section.icon}
              url={directUrl}
              current={isActive}
            />
          );
        } else if (hasSubmenu) {
          // Opens submenu - use section URL when active for matching,
          // otherwise use non-matching URL to prevent false positives on homepage
          const submenuUrl = isActive ? `/${section.id}` : "/__never_match__";
          return (
            <div
              key={section.id}
              onClick={handleSubmenuClick(section.id)}
              style={{ cursor: "pointer" }}
            >
              <GoabxWorkSideMenuItem
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
            <GoabxWorkSideMenuItem
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
      <GoabxWorkSideMenu
        heading="Design system"
        url="/"
        open={isOpen}
        onToggle={onToggle}
        onNavigate={(path: string) => { if (path && !path.startsWith("/__")) window.location.href = path; }}
        primaryContent={primaryContent}
        secondaryContent={<MenuSecondaryContent isOpen={isOpen} />}
      />
    </>
  );
}

export default ParentMenu;
