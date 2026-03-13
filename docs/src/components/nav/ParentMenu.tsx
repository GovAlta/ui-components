/**
 * ParentMenu.tsx
 *
 * Parent-level navigation showing all main sections.
 * - Components: opens submenu (has many pages)
 * - Tokens, Examples: direct navigation (single page each)
 * - Get started, Foundations: direct navigation (when content exists)
 */

import React from "react";
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
  GoabxWorkSideMenuGroup,
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
  foundations: "/foundations",
};

// Sections that open a submenu
const SUBMENU_SECTIONS = ["components"];

// Sections that render as expandable groups with sub-items
const GROUP_SECTIONS: Record<string, Array<{ label: string; url: string }>> = {
  "get-started": [
    { label: "Early Adopters", url: "/get-started" },
    { label: "Designers", url: "/get-started/designers" },
    { label: "Developers", url: "/get-started/developers" },
    { label: "Migration guide", url: "/get-started/migration-guide" },
    { label: "Roadmap", url: "/get-started/roadmap" },
  ],
};

// Main navigation sections
const SECTIONS = [
  { id: "get-started" as const, label: "Get started", icon: "document-text" },
  { id: "foundations" as const, label: "Foundations", icon: "list" },
  { id: "examples" as const, label: "Examples", icon: "browsers" },
  { id: "components" as const, label: "Components", icon: "shapes" },
  { id: "tokens" as const, label: "Tokens", icon: "code-slash" },
];

export function ParentMenu({
  isOpen,
  onToggle,
  onSelectSection,
  currentSection,
}: ParentMenuProps) {
  // Handle click on Components item - prevent navigation, open submenu instead
  const handleComponentsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelectSection("components");
  };

  // Primary content: Main navigation sections
  const primaryContent = (
    <>
      {SECTIONS.map((section) => {
        const directUrl = DIRECT_NAV_SECTIONS[section.id];
        const hasSubmenu = SUBMENU_SECTIONS.includes(section.id);
        const groupItems = GROUP_SECTIONS[section.id];
        const isActive = currentSection === section.id;

        if (groupItems) {
          // Expandable group with sub-items
          return (
            <GoabxWorkSideMenuGroup
              key={section.id}
              heading={section.label}
              icon={section.icon}
            >
              {groupItems.map((item) => (
                <GoabxWorkSideMenuItem key={item.url} label={item.label} url={item.url} />
              ))}
            </GoabxWorkSideMenuGroup>
          );
        } else if (directUrl) {
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
          // Opens submenu - use /components URL when on component pages for matching,
          // otherwise use non-matching URL to prevent false positives on homepage
          const submenuUrl = isActive ? "/components" : "/__never_match__";
          return (
            <div
              key={section.id}
              onClick={handleComponentsClick}
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
        primaryContent={primaryContent}
        secondaryContent={<MenuSecondaryContent isOpen={isOpen} />}
      />
    </>
  );
}

export default ParentMenu;
