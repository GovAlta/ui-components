/**
 * GetStartedSubMenu.tsx
 *
 * Sub-menu for Get Started section showing pages organized into sections.
 * Each section is either flat (a list of items) or grouped (items inside an
 * expandable group with a heading). Sections render in the order returned by
 * `getGetStartedNav()` in lib/get-started-nav.ts.
 */

import { Fragment, type MouseEvent } from "react";
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkSideMenuGroup,
} from "@abgov/react-components";
import { MenuSecondaryContent } from "./MenuSecondaryContent";
import { withBase } from "@/lib/base-url";
import type { GetStartedNav, GetStartedNavSection } from "@/lib/get-started-nav";

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

  const renderSection = (section: GetStartedNavSection) => {
    if (section.type === "flat") {
      return (
        <Fragment key={section.slug}>
          {section.pages.map((page) => (
            <GoabWorkSideMenuItem key={page.url} label={page.label} url={withBase(page.url)} />
          ))}
        </Fragment>
      );
    }

    const containsCurrentPage = section.pages.some((p) => p.url === currentUrl);

    const handleGroupClickCapture = () => {
      if (!isOpen && onExpandMenu) {
        onExpandMenu();
      }
    };

    return (
      <div key={section.slug} onClickCapture={handleGroupClickCapture}>
        <GoabWorkSideMenuGroup heading={section.name} open={containsCurrentPage}>
          {section.pages.map((page) => (
            <GoabWorkSideMenuItem key={page.url} label={page.label} url={withBase(page.url)} />
          ))}
        </GoabWorkSideMenuGroup>
      </div>
    );
  };

  const primaryContent = (
    <>
      {/* Back to parent menu */}
      <div onClick={handleBackClick} style={{ cursor: "pointer" }}>
        <GoabWorkSideMenuItem label="All" icon="arrow-back" url="/__back__" />
      </div>

      {items.sections.map(renderSection)}
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
