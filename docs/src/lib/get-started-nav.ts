/**
 * get-started-nav.ts
 *
 * Builds the Get Started submenu structure from the content collection.
 * Used by layouts to pass nav data to SiteNav -> GetStartedSubMenu.
 *
 * Section convention:
 * - "intro"      => top-level pages above grouped sections
 * - "designers"  => Designers group
 * - "developers" => Developers group
 * - "appendix"   => top-level pages below grouped sections
 */

import { getCollection } from "astro:content";

export interface GetStartedNavItem {
  label: string;
  url: string;
}

export interface GetStartedNavGroup {
  name: string;
  slug: string;
  pages: GetStartedNavItem[];
}

export interface GetStartedNav {
  topPages: GetStartedNavItem[];
  groups: GetStartedNavGroup[];
  bottomPages: GetStartedNavItem[];
}

/** Display metadata for the grouped sections (not stored in content collection) */
const GROUP_META: Record<string, { name: string }> = {
  designers: { name: "Designers" },
  developers: { name: "Developers" },
};

/** Canonical display order for grouped sections in the submenu */
const GROUP_ORDER = ["designers", "developers"];

function entryToItem(entry: {
  slug: string;
  data: { title: string; navLabel?: string };
}): GetStartedNavItem {
  return {
    label: entry.data.navLabel ?? entry.data.title,
    url: entry.slug === "index" ? "/get-started" : `/get-started/${entry.slug}`,
  };
}

function bySection(
  entries: Awaited<ReturnType<typeof getCollection<"get-started">>>,
  section: string,
): typeof entries {
  return entries
    .filter((e) => e.data.section === section)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getGetStartedNav(): Promise<GetStartedNav> {
  const entries = await getCollection("get-started");
  const published = entries.filter((e) => e.data.status !== "deprecated");

  const topPages = bySection(published, "intro").map(entryToItem);
  const bottomPages = bySection(published, "appendix").map(entryToItem);

  const groups = GROUP_ORDER.filter((slug) =>
    published.some((e) => e.data.section === slug),
  ).map((slug) => ({
    name: GROUP_META[slug].name,
    slug,
    pages: bySection(published, slug).map(entryToItem),
  }));

  return { topPages, groups, bottomPages };
}
