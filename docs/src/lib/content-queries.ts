import { getCollection, type CollectionEntry } from "astro:content";

// Types for extracted API data
export interface PropDefinition {
  name: string;
  type: string;
  typeLabel?: string;
  values?: string[];
  required: boolean;
  default: string | null;
  description: string;
  deprecated?: boolean;
}

export interface EventDefinition {
  name: string;
  type: string;
  description: string;
  frameworks: string[];
}

export interface SlotDefinition {
  name: string;
  type?: string;
  description: string;
  required?: boolean;
}

export interface FrameworkApiData {
  props: PropDefinition[];
  events: EventDefinition[];
  slots: SlotDefinition[];
}

export interface FrameworkApiMap {
  react: FrameworkApiData;
  angular: FrameworkApiData;
  webComponents: FrameworkApiData;
}

export interface SubComponentApi {
  name: string;
  webComponentTag: string;
  description: string;
  frameworks: FrameworkApiMap;
}

export interface ComponentApi {
  componentSlug: string;
  extractedFrom: string;
  frameworks: FrameworkApiMap;
  subComponents?: SubComponentApi[];
}

// Load all component API JSON files at build time using Vite glob import
const apiModules = import.meta.glob<{ default: ComponentApi }>(
  "../../generated/component-apis/*.json",
  { eager: true },
);

// Build lookup map: slug -> ComponentApi
const apiBySlug = new Map<string, ComponentApi>();
for (const [path, module] of Object.entries(apiModules)) {
  const slug = path.split("/").pop()?.replace(".json", "");
  if (slug && module.default) {
    apiBySlug.set(slug, module.default);
  }
}

/**
 * Get extracted API data for a component
 */
export async function getComponentApi(slug: string): Promise<ComponentApi | null> {
  const api = apiBySlug.get(slug);
  if (!api) {
    console.warn(`No API data found for component: ${slug}`);
    return null;
  }
  return api;
}

/**
 * Get all guidance that applies to a specific component
 */
export async function getGuidanceForComponent(
  componentSlug: string,
): Promise<CollectionEntry<"guidance">[]> {
  const allGuidance = await getCollection("guidance");

  return allGuidance.filter((guidance) =>
    guidance.data.appliesTo?.components?.includes(componentSlug),
  );
}

/**
 * Get all examples that use a specific component
 */
export async function getExamplesForComponent(
  componentSlug: string,
): Promise<CollectionEntry<"examples">[]> {
  const allExamples = await getCollection("examples");

  return allExamples.filter(
    (example) => !example.data.hidden && example.data.components.includes(componentSlug),
  );
}

/**
 * Group guidance by topic for page section rendering
 */
export function groupGuidanceByTopic(
  guidance: CollectionEntry<"guidance">[],
): Record<string, CollectionEntry<"guidance">[]> {
  const grouped: Record<string, CollectionEntry<"guidance">[]> = {};

  for (const item of guidance) {
    const topic = item.data.topic;
    if (!grouped[topic]) {
      grouped[topic] = [];
    }
    grouped[topic].push(item);
  }

  return grouped;
}

// Topic categories for organizing guidance (must match schema in config.ts)
export const USAGE_TOPICS = [
  "types",
  "states",
  "sizing",
  "icons",
  "positioning",
  "content",
  "feedback",
  "usage",
  "interaction",
  "forms",
  "layout",
  "performance",
  "other",
] as const;
export const ACCESSIBILITY_TOPICS = [
  "accessibility",
  "screen-readers",
  "keyboard",
  "focus",
] as const;

/**
 * Separate guidance into usage and accessibility categories
 */
export function categorizeGuidance(guidance: CollectionEntry<"guidance">[]) {
  const usageGuidance = guidance.filter((g) =>
    USAGE_TOPICS.includes(g.data.topic as (typeof USAGE_TOPICS)[number]),
  );

  const accessibilityGuidance = guidance.filter((g) =>
    ACCESSIBILITY_TOPICS.includes(g.data.topic as (typeof ACCESSIBILITY_TOPICS)[number]),
  );

  return {
    usage: groupGuidanceByTopic(usageGuidance),
    accessibility: groupGuidanceByTopic(accessibilityGuidance),
  };
}

/**
 * Get all content with a specific tag
 */
export async function getContentByTag(tag: string) {
  const [components, guidance, examples] = await Promise.all([
    getCollection("components"),
    getCollection("guidance"),
    getCollection("examples"),
  ]);

  return {
    components: components.filter((c) => c.data.tags?.includes(tag)),
    guidance: guidance.filter((g) => g.data.tags?.includes(tag)),
    examples: examples.filter((e) => !e.data.hidden && e.data.tags?.includes(tag)),
  };
}

/**
 * Get all visible components (excludes hidden)
 */
export async function getVisibleComponents(): Promise<CollectionEntry<"components">[]> {
  const allComponents = await getCollection("components");
  return allComponents.filter((c) => !c.data.hidden);
}

/**
 * Get related components from a component entry (excludes hidden)
 */
export async function getRelatedComponents(
  relatedSlugs: string[],
): Promise<CollectionEntry<"components">[]> {
  const allComponents = await getCollection("components");

  return allComponents.filter((c) => {
    if (c.data.hidden) return false;
    const slug = c.data.slug || c.slug;
    return relatedSlugs.includes(slug);
  });
}

/**
 * Get subcomponents for a parent component by filtering its relatedComponents
 * for entries marked with subcomponent: true
 */
export async function getSubcomponents(
  relatedSlugs: string[] | undefined,
): Promise<Array<{ name: string; slug: string; api: ComponentApi }>> {
  if (!relatedSlugs?.length) return [];

  const allComponents = await getCollection("components");
  const results = [];

  for (const slug of relatedSlugs) {
    const entry = allComponents.find((c) => (c.data.slug || c.slug) === slug);
    if (!entry) {
      console.warn(`getSubcomponents: slug "${slug}" not found in components collection`);
      continue;
    }
    if (!entry.data.subcomponent) continue;

    const api = await getComponentApi(slug);
    if (!api) continue;

    results.push({ name: entry.data.name, slug, api });
  }

  return results;
}

/**
 * Format topic name for display
 */
export function formatTopicName(topic: string): string {
  return topic
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
