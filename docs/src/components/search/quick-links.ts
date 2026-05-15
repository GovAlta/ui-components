/**
 * quick-links.ts
 *
 * Configurable quick links shown in the search empty state.
 * These provide fast navigation to common destinations.
 */

export interface QuickLink {
  label: string;
  href: string;
  /** Icon character displayed before the label */
  icon: string;
}

/**
 * Quick links shown when search input is empty.
 * Edit this array to customize the links.
 */
export const quickLinks: QuickLink[] = [
  { label: "Getting started", href: "/get-started", icon: "document-text" },
  { label: "Examples", href: "/examples", icon: "browsers" },
  { label: "Components", href: "/components", icon: "shapes" },
  { label: "Design tokens", href: "/tokens", icon: "code-slash" },
];

/**
 * Popular/suggested searches shown when there are no results.
 * These are common terms users might be looking for.
 */
export const popularSearches: string[] = [
  "Button",
  "Form",
  "Table",
  "Input",
  "Modal",
  "Badge",
];
