/**
 * nav-categories.ts
 *
 * Builds the component navigation categories from the content collection.
 * Used by layouts to pass dynamic nav data to SiteNav → ComponentsSubMenu.
 */

import { getCollection } from "astro:content";

/** Shape consumed by ComponentsSubMenu */
export interface NavCategory {
  name: string;
  slug: string;
  icon: string;
  components: { name: string; slug: string }[];
}

/** Display metadata for each category (not stored in content collection) */
const CATEGORY_META: Record<string, { name: string; icon: string }> = {
  "content-layout": { name: "Content layout", icon: "grid" },
  "feedback-and-alerts": { name: "Feedback and alerts", icon: "notifications" },
  "inputs-and-actions": { name: "Inputs and actions", icon: "create" },
  "structure-and-navigation": {
    name: "Structure and navigation",
    icon: "browsers",
  },
  utilities: { name: "Utilities", icon: "build" },
};

/**
 * Query the components content collection and group into nav categories.
 * Filters out hidden components, sorts alphabetically within each category.
 */
export async function getNavCategories(): Promise<NavCategory[]> {
  const allComponents = await getCollection("components");
  const visible = allComponents.filter((c) => !c.data.hidden);

  // Group by category
  const grouped = new Map<string, { name: string; slug: string }[]>();
  for (const component of visible) {
    const cat = component.data.category;
    if (!grouped.has(cat)) {
      grouped.set(cat, []);
    }
    grouped.get(cat)!.push({
      name: component.data.name,
      slug: component.slug,
    });
  }

  // Sort components alphabetically within each category
  for (const components of grouped.values()) {
    components.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Build the final array in a stable category order
  const categoryOrder = [
    "content-layout",
    "feedback-and-alerts",
    "inputs-and-actions",
    "structure-and-navigation",
    "utilities",
  ];

  return categoryOrder
    .filter((slug) => grouped.has(slug))
    .map((slug) => ({
      ...CATEGORY_META[slug],
      slug,
      components: grouped.get(slug)!,
    }));
}
