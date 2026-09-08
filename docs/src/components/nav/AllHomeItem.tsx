/**
 * AllHomeItem.tsx
 *
 * The "All" item rendered at the top of every submenu (Components, Get started,
 * Foundations). It navigates back to the home page, where the hero search field
 * is front and center, rather than just collapsing the menu.
 *
 * Wrapped-onClick + sentinel `url` mirrors the existing pattern in the submenus
 * (e.g. handleAllComponentsClick): the menu's onNavigate ignores `/__` paths, so
 * the onClick owns navigation.
 */

import { type MouseEvent } from "react";
import { GoabWorkSideMenuItem } from "@abgov/react-components";
import { withBase } from "@/lib/base-url";

export function AllHomeItem() {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = withBase("/");
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <GoabWorkSideMenuItem label="All" icon="arrow-back" url="/__all_home__" />
    </div>
  );
}

export default AllHomeItem;
