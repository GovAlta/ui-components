/**
 * AllHomeItem.tsx
 *
 * The "All" item rendered at the top of every submenu (Components, Get started,
 * Foundations). It navigates to the home page and auto-opens global search,
 * so "All" means "you're searching the whole design system" rather than just
 * collapsing the menu.
 *
 * Wrapped-onClick + sentinel `url` mirrors the existing pattern in the submenus
 * (e.g. handleAllComponentsClick): the menu's onNavigate ignores `/__` paths, so
 * the onClick owns navigation.
 */

import { type MouseEvent } from "react";
import { GoabWorkSideMenuItem } from "@abgov/react-components";
import { searchHomeUrl } from "../search/search-utils";

export function AllHomeItem() {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = searchHomeUrl();
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <GoabWorkSideMenuItem label="All" icon="arrow-back" url="/__all_home__" />
    </div>
  );
}

export default AllHomeItem;
