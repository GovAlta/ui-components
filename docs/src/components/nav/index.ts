/**
 * Navigation component exports
 *
 * Navigation structure:
 * - ParentMenu: Main navigation with all sections
 * - ComponentsSubMenu: Submenu for browsing components (only section with submenu)
 *
 * Tokens and Examples are single-page sections that link directly from ParentMenu.
 */

export { ParentMenu, type MenuSection } from './ParentMenu';
export { ComponentsSubMenu } from './ComponentsSubMenu';

// Note: ExamplesSubMenu and TokensSubMenu are no longer used
// These sections now navigate directly to their single page from the parent menu
