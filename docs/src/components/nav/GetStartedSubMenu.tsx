/**
 * GetStartedSubMenu.tsx
 *
 * Sub-menu for Get Started section showing grouped pages.
 * Uses GoabWorkSideMenuGroup for expandable Designers/Developers sections.
 *
 * Nav structure is sourced from the get-started content collection via
 * `getGetStartedNav()` in lib/get-started-nav.ts.
 */

import { type MouseEvent } from "react";
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkSideMenuGroup,
} from "@abgov/react-components";
import { MenuSecondaryContent } from "./MenuSecondaryContent";
import { withBase } from "@/lib/base-url";
import type { GetStartedNav } from "@/lib/get-started-nav";

interface GetStartedSubMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onBack: () => void;
  onExpandMenu?: () => void;
  currentUrl?: string;
  items: GetStartedNav;
}

export function GetStartedSubMenu({
  isOpen,
  onToggle,
  onBack,
  onExpandMenu,
  currentUrl,
  items,
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
        <GoabWorkSideMenuItem label="All" icon="arrow-back" url="/__back__" />
      </div>

      {/* Top-level pages */}
      {items.topPages.map((page) => (
        <GoabWorkSideMenuItem
          key={page.url}
          label={page.label}
          url={withBase(page.url)}
        />
      ))}

      {/* Grouped sections */}
      <div>
        {items.groups.map((group) => {
          const containsCurrentPage = group.pages.some((p) => p.url === currentUrl);

          const handleGroupClickCapture = () => {
            if (!isOpen && onExpandMenu) {
              onExpandMenu();
            }
          };

          return (
            <div key={group.slug} onClickCapture={handleGroupClickCapture}>
              <GoabWorkSideMenuGroup heading={group.name} open={containsCurrentPage}>
                {group.pages.map((page) => (
                  <GoabWorkSideMenuItem
                    key={page.url}
                    label={page.label}
                    url={withBase(page.url)}
                  />
                ))}
              </GoabWorkSideMenuGroup>
            </div>
          );
        })}
      </div>

      {/* Bottom pages */}
      {items.bottomPages.map((page) => (
        <GoabWorkSideMenuItem
          key={page.url}
          label={page.label}
          url={withBase(page.url)}
        />
      ))}
    </>
  );

  return (
    <GoabWorkSideMenu
      heading="Design System | Get Started"
      url={withBase("/")}
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
