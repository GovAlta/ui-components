/**
 * FoundationsSubMenu.tsx
 *
 * Sub-menu for Foundations section showing grouped pages.
 * Uses GoabWorkSideMenuGroup for expandable Style guide sections.
 */

import { type MouseEvent } from "react";
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkSideMenuGroup,
} from "@abgov/react-components";
import { MenuSecondaryContent } from "./MenuSecondaryContent";

// Top-level pages (not in a group)
const TOP_PAGES = [
  { label: "Design at GoA", url: "/foundations" },
  { label: "Accessibility", url: "/foundations/accessibility" },
  { label: "Brand guidelines", url: "/foundations/brand-guidelines" },
];

// Illustration sub-group pages (nested inside Style guide)
const ILLUSTRATION_PAGES = [
  { label: "Overview", url: "/foundations/style-guide/illustrations" },
  { label: "Scene", url: "/foundations/style-guide/illustrations/scene" },
  { label: "Spot", url: "/foundations/style-guide/illustrations/spot" },
];

// Grouped sections with sub-pages
const PAGE_GROUPS = [
  {
    name: "Style guide",
    slug: "style-guide",
    pages: [
      { label: "Colour", url: "/foundations/style-guide/colour" },
      { label: "Iconography", url: "/foundations/style-guide/iconography" },
      { label: "Photography", url: "/foundations/style-guide/photography" },
      { label: "Logo", url: "/foundations/style-guide/logo" },
      { label: "Typography", url: "/foundations/style-guide/typography" },
      { label: "Motion", url: "/foundations/style-guide/motion" },
      { label: "Layout", url: "/foundations/style-guide/layout" },
    ],
  },
  {
    name: "Content guidelines",
    slug: "content-guidelines",
    pages: [
      {
        label: "Date format",
        url: "/foundations/content-guidelines/date-format",
      },
      {
        label: "Capitalization",
        url: "/foundations/content-guidelines/capitalization",
      },
      {
        label: "Error messages",
        url: "/foundations/content-guidelines/error-messages",
      },
      {
        label: "Helper text",
        url: "/foundations/content-guidelines/helper-text",
      },
    ],
  },
];

// All URLs for matching current page
const ALL_URLS = [
  ...TOP_PAGES.map((p) => p.url),
  ...PAGE_GROUPS.flatMap((g) => g.pages.map((p) => p.url)),
  ...ILLUSTRATION_PAGES.map((p) => p.url),
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
        <GoabWorkSideMenuItem label="All" icon="arrow-back" url="/__back__" />
      </div>

      {/* Top-level pages */}
      {TOP_PAGES.map((page) => (
        <GoabWorkSideMenuItem key={page.url} label={page.label} url={page.url} />
      ))}

      {/* Grouped sections */}
      <div>
        {PAGE_GROUPS.map((group) => {
          const isIllustrationPage = ILLUSTRATION_PAGES.some((p) => p.url === currentUrl);
          const containsCurrentPage =
            group.pages.some((p) => p.url === currentUrl) ||
            (group.slug === "style-guide" && isIllustrationPage);

          const handleGroupClickCapture = () => {
            if (!isOpen && onExpandMenu) {
              onExpandMenu();
            }
          };

          return (
            <div key={group.slug} onClickCapture={handleGroupClickCapture}>
              <GoabWorkSideMenuGroup heading={group.name} open={containsCurrentPage}>
                {group.slug === "style-guide" ? (
                  <>
                    {/* Render pages before Illustration group */}
                    {group.pages.slice(0, 2).map((page) => (
                      <GoabWorkSideMenuItem
                        key={page.url}
                        label={page.label}
                        url={page.url}
                      />
                    ))}
                    {/* Illustration nested group (between Iconography and Photography) */}
                    <GoabWorkSideMenuGroup
                      heading="Illustration"
                      open={isIllustrationPage}
                    >
                      {ILLUSTRATION_PAGES.map((page) => (
                        <GoabWorkSideMenuItem
                          key={page.url}
                          label={page.label}
                          url={page.url}
                        />
                      ))}
                    </GoabWorkSideMenuGroup>
                    {/* Render remaining pages after Illustration group */}
                    {group.pages.slice(2).map((page) => (
                      <GoabWorkSideMenuItem
                        key={page.url}
                        label={page.label}
                        url={page.url}
                      />
                    ))}
                  </>
                ) : (
                  group.pages.map((page) => (
                    <GoabWorkSideMenuItem
                      key={page.url}
                      label={page.label}
                      url={page.url}
                    />
                  ))
                )}
              </GoabWorkSideMenuGroup>
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <GoabWorkSideMenu
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
