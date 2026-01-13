/**
 * SiteNav.tsx
 *
 * Unified site navigation with parent/sub-menu state switching.
 *
 * Navigation behavior:
 * - Components: Has submenu (many component pages)
 * - Tokens: Direct link, stays on parent menu, highlights "Tokens"
 * - Examples: Direct link, stays on parent menu, highlights "Examples"
 *
 * Menu level is managed via React state:
 * - Parent view: Shows all sections
 * - Sub-menu view: Shows section-specific navigation (only for components)
 */

import { useState, useEffect, useCallback } from 'react';
import {
  ParentMenu,
  ComponentsSubMenu,
  type MenuSection,
} from './nav';

interface SiteNavProps {
  /** Current page slug (for highlighting current item) */
  currentSlug?: string;
  /** Current category (for auto-expanding in components) */
  currentCategory?: string;
  /** Initial section to show (detected from URL if not provided) */
  initialSection?: MenuSection;
}

// Sections that have submenus (show submenu when navigated to)
const SUBMENU_SECTIONS = ['components'];

// Sections that are single pages (stay on parent menu, just highlight)
const SINGLE_PAGE_SECTIONS = ['tokens', 'examples'];

/**
 * Detect the current section from URL pathname
 */
function detectSectionFromUrl(pathname: string): MenuSection {
  if (pathname.startsWith('/components')) return 'components';
  if (pathname.startsWith('/examples')) return 'examples';
  if (pathname.startsWith('/tokens')) return 'tokens';
  if (pathname.startsWith('/get-started')) return 'get-started';
  if (pathname.startsWith('/foundations')) return 'foundations';
  return 'parent';
}

/**
 * Determine the menu level to show based on section
 * - Submenu sections → show their submenu
 * - Single page sections → stay on parent menu
 */
function getMenuLevelForSection(section: MenuSection): MenuSection {
  if (SUBMENU_SECTIONS.includes(section)) {
    return section; // Show the submenu
  }
  return 'parent'; // Stay on parent menu
}

const MOBILE_BREAKPOINT = 624;
const MENU_STATE_KEY = 'goa-ds-menu-open';

/**
 * Get initial menu state:
 * - Mobile: always closed
 * - Desktop: check localStorage, default to open
 */
function getInitialMenuState(): boolean {
  if (typeof window === 'undefined') return true; // SSR fallback

  // Mobile always starts closed
  if (window.innerWidth < MOBILE_BREAKPOINT) {
    return false;
  }

  // Desktop: check localStorage for saved preference
  const saved = localStorage.getItem(MENU_STATE_KEY);
  if (saved !== null) {
    return saved === 'true';
  }

  // Default to open on desktop
  return true;
}

export function SiteNav({ currentSlug, currentCategory, initialSection }: SiteNavProps) {
  // Menu state - persisted on desktop, always closed on mobile
  const [isOpen, setIsOpen] = useState(getInitialMenuState);
  const [currentSection, setCurrentSection] = useState<MenuSection>(initialSection || 'parent');
  const [menuLevel, setMenuLevel] = useState<MenuSection>('parent');

  // Initialize from URL on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const section = initialSection || detectSectionFromUrl(window.location.pathname);
      setCurrentSection(section);
      setMenuLevel(getMenuLevelForSection(section));
    }
  }, [initialSection]);

  // Event bridge: Listen for 'goa-menu-open' from MobileHeader hamburger button
  useEffect(() => {
    const handleMenuOpen = () => setIsOpen(true);
    window.addEventListener('goa-menu-open', handleMenuOpen);
    return () => window.removeEventListener('goa-menu-open', handleMenuOpen);
  }, []);

  // Event bridge: Emit 'goa-menu-change' when isOpen changes (for mobile-bridge.ts)
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('goa-menu-change', { detail: { isOpen } })
    );
  }, [isOpen]);

  // Persist menu state to localStorage (desktop only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      localStorage.setItem(MENU_STATE_KEY, String(isOpen));
    }
  }, [isOpen]);

  // Close menu when viewport shrinks (gives more room for content)
  useEffect(() => {
    let previousWidth = window.innerWidth;

    const handleResize = () => {
      const width = window.innerWidth;

      // Close menu when window shrinks
      if (width < previousWidth) {
        setIsOpen(false);
      }

      previousWidth = width;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelectSection = useCallback((section: MenuSection) => {
    // Only components has a submenu - switch to it
    if (SUBMENU_SECTIONS.includes(section)) {
      setMenuLevel(section);
      // Auto-expand when entering submenu while collapsed (icons aren't descriptive enough)
      if (!isOpen) {
        setIsOpen(true);
      }
    }
    // Other sections navigate directly via url prop, no state change needed
  }, [isOpen]);

  const handleBack = useCallback(() => {
    setMenuLevel('parent');
  }, []);

  const handleExpandMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Render the appropriate menu based on current level
  switch (menuLevel) {
    case 'components':
      return (
        <ComponentsSubMenu
          isOpen={isOpen}
          onToggle={handleToggle}
          onBack={handleBack}
          onExpandMenu={handleExpandMenu}
          currentSlug={currentSlug}
        />
      );

    // All other cases show the parent menu with appropriate highlighting
    case 'parent':
    default:
      return (
        <ParentMenu
          isOpen={isOpen}
          onToggle={handleToggle}
          onSelectSection={handleSelectSection}
          currentSection={currentSection}
        />
      );
  }
}

export default SiteNav;
