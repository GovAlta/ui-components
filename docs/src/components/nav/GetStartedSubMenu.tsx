/**
 * GetStartedSubMenu.tsx
 *
 * Sub-menu for Get Started section showing grouped pages.
 * Uses GoabxWorkSideMenuGroup for expandable Designers/Developers sections.
 */

import { type MouseEvent } from "react";
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
  GoabxWorkSideMenuGroup,
} from "@abgov/react-components/experimental";
import { MenuSecondaryContent } from "./MenuSecondaryContent";

// Top-level pages (not in a group)
const TOP_PAGES = [
  { label: "Starting with the design system", url: "/get-started" },
  { label: "Automated accessibility", url: "/get-started/automated-accessibility" },
  { label: "Component lifecycle", url: "/get-started/component-lifecycle" },
  { label: "Roadmap", url: "/get-started/roadmap" },
  { label: "Migration guide", url: "/get-started/migration-guide" },
];

// Grouped sections with sub-pages
const PAGE_GROUPS = [
  {
    name: "Designers",
    slug: "designers",
    pages: [
      { label: "Overview", url: "/get-started/designers" },
      {
        label: "Designing with Design System 2.0",
        url: "/get-started/designers/designing-with-ds",
      },
      {
        label: "User Experience Guidelines",
        url: "/get-started/designers/ux-guidelines",
      },
    ],
  },
  {
    name: "Developers",
    slug: "developers",
    pages: [
      { label: "Overview", url: "/get-started/developers" },
      { label: "Setup", url: "/get-started/developers/setup" },
      { label: "Verify a bug", url: "/get-started/developers/bug" },
      { label: "Technologies", url: "/get-started/developers/technologies" },
      { label: "Supported browsers", url: "/get-started/developers/browsers" },
    ],
  },
];

// Bottom pages (after groups)
const BOTTOM_PAGES = [
  { label: "QA testing", url: "/get-started/qa-testing" },
  { label: "Contribute", url: "/get-started/contribute" },
  { label: "Out of support versions", url: "/get-started/out-of-support" },
];

// All URLs for matching current page
const ALL_URLS = [
  ...TOP_PAGES.map((p) => p.url),
  ...PAGE_GROUPS.flatMap((g) => g.pages.map((p) => p.url)),
  ...BOTTOM_PAGES.map((p) => p.url),
];

interface GetStartedSubMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onBack: () => void;
  onExpandMenu?: () => void;
  currentUrl?: string;
}

export function GetStartedSubMenu({
  isOpen,
  onToggle,
  onBack,
  onExpandMenu,
  currentUrl,
}: GetStartedSubMenuProps) {
  const handleBackClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBack();
  };

  const primaryContent = (
    <>
      {/* Back to parent menu */}
      <div onClick={handleBackClick} style={{ cursor: "pointer" }}>
        <GoabxWorkSideMenuItem label="All" icon="arrow-back" url="/__back__" />
      </div>

      {/* Top-level pages */}
      {TOP_PAGES.map((page) => (
        <GoabxWorkSideMenuItem key={page.url} label={page.label} url={page.url} />
      ))}

      {/* Grouped sections */}
      <div>
        {PAGE_GROUPS.map((group) => {
          const containsCurrentPage = group.pages.some((p) => p.url === currentUrl);

          const handleGroupClickCapture = () => {
            if (!isOpen && onExpandMenu) {
              onExpandMenu();
            }
          };

          return (
            <div key={group.slug} onClickCapture={handleGroupClickCapture}>
              <GoabxWorkSideMenuGroup heading={group.name} open={containsCurrentPage}>
                {group.pages.map((page) => (
                  <GoabxWorkSideMenuItem
                    key={page.url}
                    label={page.label}
                    url={page.url}
                  />
                ))}
              </GoabxWorkSideMenuGroup>
            </div>
          );
        })}
      </div>

      {/* Bottom pages */}
      {BOTTOM_PAGES.map((page) => (
        <GoabxWorkSideMenuItem key={page.url} label={page.label} url={page.url} />
      ))}
    </>
  );

  return (
    <GoabxWorkSideMenu
      heading="Design System | Get Started"
      url="/"
      open={isOpen}
      onToggle={onToggle}
      primaryContent={primaryContent}
      secondaryContent={<MenuSecondaryContent isOpen={isOpen} />}
      onNavigate={(path: string) => {
        if (path && !path.startsWith("/__")) window.location.href = path;
      }}
    />
  );
}

export default GetStartedSubMenu;
