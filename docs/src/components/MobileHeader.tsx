/**
 * MobileHeader.tsx
 *
 * Mobile header with:
 * - Hamburger menu button (left)
 * - Alberta logo mark + "Design system" text (center-left)
 * - Search button (right)
 *
 * Dispatches custom events for menu and search actions.
 * Visibility controlled by CSS via body[data-mobile] attribute.
 */

import { GoabIconButton } from "@abgov/react-components";

export function MobileHeader() {
  const handleMenuClick = () => {
    // Dispatch event that SiteNav listens for
    window.dispatchEvent(new CustomEvent("goa-menu-open"));
  };

  const handleSearchClick = () => {
    window.dispatchEvent(new CustomEvent("goa-search-open"));
  };

  return (
    <div className="mobile-header">
      <div className="mobile-header__left">
        <GoabIconButton
          icon="menu"
          size="medium"
          variant="dark"
          onClick={handleMenuClick}
          ariaLabel="Open navigation menu"
        />
        <a href="/" className="mobile-header__brand">
          <img
            src="/images/Logo.svg"
            alt=""
            width="28"
            height="28"
            className="mobile-header__logo"
          />
          <span className="mobile-header__title">Design system</span>
        </a>
      </div>
      <div className="mobile-header__right">
        <GoabIconButton
          icon="search"
          size="medium"
          variant="dark"
          onClick={handleSearchClick}
          ariaLabel="Search"
        />
      </div>
    </div>
  );
}

export default MobileHeader;
