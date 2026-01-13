/**
 * Mobile Bridge Script
 *
 * Bridges React navigation state to page-level CSS via body attributes.
 * This enables Astro layouts to respond to menu state changes from React components.
 *
 * Body attributes set:
 * - data-mobile: "true" | "false" (viewport width < 624px)
 * - data-menu-open: "true" | "false" (sidebar menu state)
 * - data-header-hidden: "true" | "false" (header hidden on scroll down)
 *
 * Custom events listened for:
 * - goa-menu-change: { detail: { isOpen: boolean } }
 * - goa-menu-open: (no detail, triggers menu open)
 */

const MOBILE_BREAKPOINT = 624;
const SIDEBAR_EXPANDED = 280;
const SIDEBAR_COLLAPSED = 72;
const SCROLL_UP_THRESHOLD = 10; // pixels of upward scroll to show header
const SCROLL_DOWN_THRESHOLD = 50; // pixels from top before header can hide

let lastScrollY = 0;
let headerHidden = false;

/**
 * Update body[data-mobile] attribute based on viewport width
 */
function updateMobileState(): void {
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  document.body.setAttribute('data-mobile', String(isMobile));

  // Sync sidebar width CSS variable for layout
  if (isMobile) {
    document.documentElement.style.setProperty('--sidebar-width', '0px');
  } else {
    // Desktop: check saved menu state for correct width
    const saved = localStorage.getItem('goa-ds-menu-open');
    const isOpen = saved === null ? true : saved === 'true';
    const width = isOpen ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED;
    document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
  }

  // Auto-close menu when resizing to desktop
  if (!isMobile) {
    document.body.setAttribute('data-menu-open', 'false');
    // Reset header visibility on desktop
    document.body.setAttribute('data-header-hidden', 'false');
    headerHidden = false;
  }
}

/**
 * Handle scroll direction to show/hide mobile header
 * - Scrolling down (past threshold): hide header
 * - Scrolling up (any amount): show header
 */
function handleScroll(): void {
  // Only apply on mobile
  if (window.innerWidth >= MOBILE_BREAKPOINT) return;

  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY;

  // Near top of page - always show header
  if (currentScrollY < SCROLL_DOWN_THRESHOLD) {
    if (headerHidden) {
      headerHidden = false;
      document.body.setAttribute('data-header-hidden', 'false');
    }
  }
  // Scrolling down - hide header
  else if (scrollDelta > 0 && !headerHidden) {
    headerHidden = true;
    document.body.setAttribute('data-header-hidden', 'true');
  }
  // Scrolling up past threshold - show header
  else if (scrollDelta < -SCROLL_UP_THRESHOLD && headerHidden) {
    headerHidden = false;
    document.body.setAttribute('data-header-hidden', 'false');
  }

  lastScrollY = currentScrollY;
}

/**
 * Handle menu state change events from React components
 */
function handleMenuChange(event: Event): void {
  const customEvent = event as CustomEvent<{ isOpen: boolean }>;
  const isOpen = customEvent.detail?.isOpen ?? false;
  document.body.setAttribute('data-menu-open', String(isOpen));

  // Update sidebar width CSS variable (desktop only)
  if (window.innerWidth >= MOBILE_BREAKPOINT) {
    const width = isOpen ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED;
    document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
  }

  // Always show header when menu is open
  if (isOpen && headerHidden) {
    headerHidden = false;
    document.body.setAttribute('data-header-hidden', 'false');
  }
}

/**
 * Initialize the mobile bridge
 */
function init(): void {
  // Set initial states
  updateMobileState();
  document.body.setAttribute('data-menu-open', 'false');
  document.body.setAttribute('data-header-hidden', 'false');
  lastScrollY = window.scrollY;

  // Listen for viewport changes
  window.addEventListener('resize', updateMobileState);

  // Listen for scroll (passive for performance)
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Listen for menu state changes from React
  window.addEventListener('goa-menu-change', handleMenuChange);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for TypeScript module resolution
export {};
