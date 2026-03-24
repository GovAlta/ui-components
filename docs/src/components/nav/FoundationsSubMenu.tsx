/**
 * FoundationsSubMenu.tsx
 *
 * Sub-menu for Foundations section showing grouped pages.
 * Uses GoabxWorkSideMenuGroup for expandable Style guide sections.
 */

import { type MouseEvent } from "react";
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
  GoabxWorkSideMenuGroup,
} from "@abgov/react-components/experimental";
import { MenuSecondaryContent } from "./MenuSecondaryContent";

// Top-level pages (not in a group)
const TOP_PAGES = [{ label: "Overview", url: "/foundations" }];

// Grouped sections with sub-pages
const PAGE_GROUPS = [
  {
    name: "Style guide",
    slug: "style-guide",
    pages: [{ label: "Motion", url: "/foundations/style-guide/motion" }],
  },
];

// All URLs for matching current page
const ALL_URLS = [
  ...TOP_PAGES.map((p) => p.url),
  ...PAGE_GROUPS.flatMap((g) => g.pages.map((p) => p.url)),
];

interface FoundationsSubMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onBack: () => void;
  onExpandMenu?: () => void;
  currentUrl?: string;
}

export function FoundationsSubMenu({
  isOpen,
  onToggle,
  onBack,
  onExpandMenu,
  currentUrl,
}: FoundationsSubMenuProps) {
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
    </>
  );

  return (
    <GoabxWorkSideMenu
      heading="Design System | Foundations"
      url="/"
      open={isOpen}
      onToggle={onToggle}
      onNavigate={(path: string) => {
        if (path && !path.startsWith("/__")) window.location.href = path;
      }}
      primaryContent={primaryContent}
      secondaryContent={<MenuSecondaryContent isOpen={isOpen} />}
    />
  );
}

export default FoundationsSubMenu;
