/**
 * ComponentsSubMenu.tsx
 *
 * Sub-menu for Components section showing categories and component links.
 * Uses GoabWorkSideMenuGroup for expandable category sections.
 */

import { type MouseEvent } from "react";
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkSideMenuGroup,
} from "@abgov/react-components";
import { MenuSecondaryContent } from "./MenuSecondaryContent";
import type { NavCategory } from "../../lib/nav-categories";
import { withBase } from "@/lib/base-url";

interface ComponentsSubMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onBack: () => void;
  onExpandMenu?: () => void;
  currentSlug?: string;
  categories?: NavCategory[];
}

export function ComponentsSubMenu({
  isOpen,
  onToggle,
  onBack,
  onExpandMenu,
  currentSlug,
  categories = [],
}: ComponentsSubMenuProps) {
  // We're on the All Components page if there's no currentSlug
  const isAllComponentsPage = !currentSlug;

  // Handle back button click - wrap prevents navigation, triggers state change
  const handleBackClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBack();
  };

  // Handle All Components click on detail pages - navigate without URL auto-matching
  const handleAllComponentsClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = withBase("/components");
  };

  // Primary content: Back button + All Components link + component categories
  const primaryContent = (
    <>
      {/* Back to parent menu - wrapped div captures click since component doesn't expose onClick */}
      <div onClick={handleBackClick} style={{ cursor: "pointer" }}>
        <GoabWorkSideMenuItem label="All" icon="arrow-back" url="/__back__" />
      </div>

      {/* All Components page link
          - On All Components page: use url so auto-matching highlights it
          - On component detail pages: wrap in div to prevent auto-matching */}
      {isAllComponentsPage ? (
        <GoabWorkSideMenuItem label="All Components" url={withBase("/components")} />
      ) : (
        <div onClick={handleAllComponentsClick} style={{ cursor: "pointer" }}>
          <GoabWorkSideMenuItem label="All Components" url="/__all_components__" />
        </div>
      )}

      {/* Component categories - using GoabWorkSideMenuGroup for expandable sections */}
      <div>
        {categories.map((category) => {
          // Auto-expand category if it contains the current component
          const containsCurrentComponent = category.components.some(
            (c) => c.slug === currentSlug,
          );

          // Handler to expand menu when clicking on a collapsed category group
          // Using capture phase to catch event before internal component handles it
          const handleGroupClickCapture = () => {
            if (!isOpen && onExpandMenu) {
              onExpandMenu();
            }
          };

          return (
            <div key={category.slug} onClickCapture={handleGroupClickCapture}>
              <GoabWorkSideMenuGroup
                heading={category.name}
                open={containsCurrentComponent}
              >
                {category.components.map((component) => (
                  <GoabWorkSideMenuItem
                    key={component.slug}
                    label={component.name}
                    url={withBase(`/components/${component.slug}`)}
                    current={component.slug === currentSlug}
                  />
                ))}
              </GoabWorkSideMenuGroup>
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      <GoabWorkSideMenu
        heading="Design System | Components"
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

export default ComponentsSubMenu;
