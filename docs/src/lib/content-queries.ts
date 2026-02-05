import { getCollection, type CollectionEntry } from 'astro:content';
import fs from 'node:fs/promises';
import path from 'node:path';

// Types for extracted API data
export interface PropDefinition {
  name: string;
  type: string;
  typeLabel?: string;
  values?: string[];
  required: boolean;
  default: string | null;
  description: string;
}

export interface EventDefinition {
  name: string;
  type: string;
  description: string;
  frameworks: string[];
}

export interface SlotDefinition {
  name: string;
  description: string;
}

export interface ComponentApi {
  componentSlug: string;
  extractedFrom: string;
  extractedAt: string;
  props: PropDefinition[];
  events: EventDefinition[];
  slots: SlotDefinition[];
}

/**
 * Get extracted API data for a component
 */
export async function getComponentApi(slug: string): Promise<ComponentApi | null> {
  try {
    const apiPath = new URL(`../../generated/component-apis/${slug}.json`, import.meta.url).pathname;
    const content = await fs.readFile(apiPath, 'utf-8');
    return JSON.parse(content) as ComponentApi;
  } catch (error) {
    console.warn(`No API data found for component: ${slug}`);
    return null;
  }
}

/**
 * Get all guidance that applies to a specific component
 */
export async function getGuidanceForComponent(
  componentSlug: string
): Promise<CollectionEntry<'guidance'>[]> {
  const allGuidance = await getCollection('guidance');

  return allGuidance.filter(guidance =>
    guidance.data.appliesTo?.components?.includes(componentSlug)
  );
}

/**
 * Get all examples that use a specific component
 */
export async function getExamplesForComponent(
  componentSlug: string
): Promise<CollectionEntry<'examples'>[]> {
  const allExamples = await getCollection('examples');

  return allExamples.filter(example =>
    example.data.components.includes(componentSlug)
  );
}

/**
 * Group guidance by topic for page section rendering
 */
export function groupGuidanceByTopic(
  guidance: CollectionEntry<'guidance'>[]
): Record<string, CollectionEntry<'guidance'>[]> {
  const grouped: Record<string, CollectionEntry<'guidance'>[]> = {};

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
export const USAGE_TOPICS = ['types', 'states', 'sizing', 'icons', 'positioning', 'content', 'other'] as const;
export const ACCESSIBILITY_TOPICS = ['screen-readers', 'keyboard', 'focus'] as const;

/**
 * Separate guidance into usage and accessibility categories
 */
export function categorizeGuidance(guidance: CollectionEntry<'guidance'>[]) {
  const usageGuidance = guidance.filter(g =>
    USAGE_TOPICS.includes(g.data.topic as typeof USAGE_TOPICS[number])
  );

  const accessibilityGuidance = guidance.filter(g =>
    ACCESSIBILITY_TOPICS.includes(g.data.topic as typeof ACCESSIBILITY_TOPICS[number])
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
    getCollection('components'),
    getCollection('guidance'),
    getCollection('examples'),
  ]);

  return {
    components: components.filter(c => c.data.tags?.includes(tag)),
    guidance: guidance.filter(g => g.data.tags?.includes(tag)),
    examples: examples.filter(e => e.data.tags?.includes(tag)),
  };
}

/**
 * Get all visible components (excludes hidden)
 */
export async function getVisibleComponents(): Promise<CollectionEntry<'components'>[]> {
  const allComponents = await getCollection('components');
  return allComponents.filter(c => !c.data.hidden);
}

/**
 * Get related components from a component entry (excludes hidden)
 */
export async function getRelatedComponents(
  relatedSlugs: string[]
): Promise<CollectionEntry<'components'>[]> {
  const allComponents = await getCollection('components');

  return allComponents.filter(c => {
    if (c.data.hidden) return false;
    const slug = c.data.slug || c.slug;
    return relatedSlugs.includes(slug);
  });
}

/**
 * Format topic name for display
 */
export function formatTopicName(topic: string): string {
  return topic
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
