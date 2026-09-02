/**
 * ParentMenu.tsx
 *
 * Parent-level navigation showing all main sections. Every section links
 * directly to its index page. The destination page's SiteNav then shows the
 * relevant submenu (Components, Get started, Foundations) based on the URL;
 * Tokens and Examples are single pages.
 */

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
  /** Currently active section (for highlighting) */
  currentSection?: MenuSection;
}

interface TopLevelSection {
  id: Exclude<MenuSection, "parent">;
  label: string;
  icon: GoabIconType;
}

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
  currentSection,
}: ParentMenuProps) {
  // Every section links directly to its index page.
  const primaryContent = (
    <>
      {SECTIONS.map((section) => (
        <GoabWorkSideMenuItem
          key={section.id}
          label={section.label}
          icon={section.icon}
          url={withBase(`/${section.id}`)}
          current={currentSection === section.id}
        />
      ))}
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
