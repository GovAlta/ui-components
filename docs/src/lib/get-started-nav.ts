/**
 * get-started-nav.ts
 *
 * Builds the Get Started submenu structure from the content collection.
 * Used by layouts to pass nav data to SiteNav -> GetStartedSubMenu.
 *
 * Each section in the submenu is either:
 * - "flat" — a list of items rendered without a group header
 * - "grouped" — items rendered inside an expandable group with a heading
 *
 * Sections appear in `SECTION_ORDER` regardless of type, so flat and grouped
 * sections can interleave freely.
 */

import { getCollection } from "astro:content";

export interface GetStartedNavItem {
  label: string;
  url: string;
}

export interface GetStartedNavSection {
  slug: string;
  type: "flat" | "grouped";
  name?: string;
  pages: GetStartedNavItem[];
}

export interface GetStartedNav {
  sections: GetStartedNavSection[];
}

/** Display order of sections in the submenu (top to bottom). */
const SECTION_ORDER = [
  "intro",
  "designers",
  "developers",
  "qa-testing",
  "ai-tools-and-resources",
  "contribute",
  "out-of-support",
];

/**
 * Sections that render with a group heading. Any section listed here is
 * "grouped"; everything else in `SECTION_ORDER` is "flat".
 */
const SECTION_NAMES: Record<string, string> = {
  designers: "Designers",
  developers: "Developers",
  "ai-tools-and-resources": "AI tools and resources",
};

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

  const sections: GetStartedNavSection[] = SECTION_ORDER.filter((slug) =>
    published.some((e) => e.data.section === slug),
  ).map((slug) => {
    const isGrouped = slug in SECTION_NAMES;
    return {
      slug,
      type: isGrouped ? "grouped" : "flat",
      name: isGrouped ? SECTION_NAMES[slug] : undefined,
      pages: bySection(published, slug).map(entryToItem),
    };
  });

  return { sections };
}
