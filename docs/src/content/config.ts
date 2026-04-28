import { defineCollection, z } from "astro:content";

/**
 * Component Collection
 * Human-written content about components (descriptions, when to use, etc.)
 * API data is separate - extracted from code and lives in generated/component-apis/
 */
const components = defineCollection({
  type: "content",
  schema: z.object({
    // Identity
    name: z.string(),
    description: z.string().optional(),
    slug: z.string().optional(),
    status: z.enum(["stable", "beta", "deprecated", "experimental"]),

    // Classification
    category: z.enum([
      "inputs-and-actions",
      "content-layout",
      "structure-and-navigation",
      "feedback-and-alerts",
      "utilities",
    ]),
    tags: z.array(z.string()).optional(),

    // Relationships
    relatedComponents: z.array(z.string()).optional(),

    // External links
    figmaUrl: z.string().url().optional(),
    githubUrl: z.string().optional(),

    // Framework identifiers (for cross-referencing)
    webComponentTag: z.string().optional(),
    reactClassName: z.string().optional(),
    angularSelector: z.string().optional(),

    // Visibility
    hidden: z.boolean().optional(), // Hide from navigation and public views
    subcomponent: z.boolean().optional(), // Show API on parent component page
  }),
});

/**
 * Guidance Collection
 * Atomic pieces of design knowledge (do's, don'ts, best practices)
 * These are first-class entities that relate to components via appliesTo
 */
const guidance = defineCollection({
  type: "content",
  schema: z.object({
    // Identity
    id: z.string(),
    type: z.enum(["do", "dont", "tip", "warning", "info"]),

    // Display
    description: z.string(),

    // Organization (determines which section this appears in)
    topic: z.enum([
      // Usage topics (generic across components)
      "types", // Variants, types
      "states", // Disabled, loading, error states
      "sizing", // Sizes, compact/large
      "icons", // Icon usage
      "positioning", // Placement, alignment, grouping
      "content", // Labels, text guidelines
      "feedback", // User feedback, notifications
      "usage", // General usage guidelines
      "interaction", // User interactions
      "forms", // Form-related guidance
      "layout", // Layout and structure
      "performance", // Performance considerations
      // Accessibility topics
      "accessibility", // General accessibility
      "screen-readers",
      "keyboard",
      "focus",
      // Catch-all
      "other",
    ]),

    // Classification
    tags: z.array(z.string()).optional(),

    // Relationships - what this guidance applies to
    appliesTo: z
      .object({
        components: z.array(z.string()).optional(),
        contexts: z.array(z.string()).optional(), // citizen-facing, worker-facing
      })
      .optional(),

    // Related to specific props (optional)
    relatedProps: z.array(z.string()).optional(),

    // Status
    status: z.enum(["published", "draft", "deprecated"]).default("published"),
  }),
});

/**
 * Examples Collection
 * Working examples at every scale. The `size` field tells you how big a
 * chunk of UI an entry documents, smallest to biggest:
 *   interaction — a single control or affordance behaving correctly
 *   section     — a composed region of a page, smaller than a full page
 *   page        — full-page composition
 *   flow        — multiple connected pages (e.g. a multi-step form flow)
 *   product     — end-to-end digital product (e.g. the whole workspace demo)
 *
 * Product-type membership is expressed via the optional `productType`
 * field, which links an example to a product type documented in the
 * `productTypes` collection.
 */
const examplesBase = z.object({
  // Identity
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  slug: z.string().optional(),

  // Product shape this example belongs to (if any)
  productType: z.enum(["workspace", "public-form"]).optional(),

  tags: z.array(z.string()).optional(),

  // Components used (structural query: "what's in it")
  components: z.array(z.string()),

  // Related examples (editorial cross-link)
  relatedExamples: z.array(z.string()).optional(),

  // Secondary names for search and URL redirects
  aliases: z.array(z.string()).optional(),

  // Optional link override. When set, cards in /examples/ link here
  // instead of the entry's own slug page. Used for "stub" entries that
  // point at a richer page (e.g. workspace-service → /examples/workspace/).
  href: z.string().optional(),

  // Accessibility notes (shown in collapsible on example card)
  accessibilityNotes: z.string().optional(),

  // External links
  figmaUrl: z.string().url().optional(),

  // Status
  status: z.enum(["published", "draft", "deprecated"]).default("published"),

  // Preview image (optional). Used as the card thumbnail in /examples/ and
  // as a hero image at the top of the entry's docs page (unless hideHero is set).
  previewImage: z.string().optional(),

  // Suppress the hero image on the docs page when previewImage is set. Use
  // this for entries with multiple inline variant PreviewContainers (e.g.
  // question-page, error-pages) where a single hero is not representative.
  // The thumbnail still renders on the card in /examples/.
  hideHero: z.boolean().optional(),

  // Render the live preview at full viewport width (no narrow column).
  // Default is a centred 41.5rem column suited to single-form compositions
  // (start-page, question-page, etc). Set true for layout-scale entries
  // like basic-page-layout where the component manages its own width.
  previewFullWidth: z.boolean().optional(),

  // Shared CSS file reference (relative to _shared folder)
  styles: z.string().optional(),

  // Display options
  fullWidth: z.boolean().optional(), // Remove side padding in preview (for callouts, notifications)
  previewStyle: z.string().optional(), // Inline CSS override for preview container (e.g. "padding: 0; max-height: 600px")
});

const interactionExample = examplesBase.extend({
  size: z.literal("interaction"),
});

const sectionExample = examplesBase.extend({
  size: z.literal("section"),
});

const pageLikeFields = {
  // Page-scale source and preview links
  previewUrl: z.string().url().optional(),
  reactSourceUrl: z.string().url().optional(),
  angularSourceUrl: z.string().url().optional(),
  sourceUrl: z.string().url().optional(),
  stackblitzUrl: z.string().url().optional(),
  frameworks: z.array(z.enum(["react", "angular", "web-components"])).optional(),
};

const pageExample = examplesBase.extend({
  size: z.literal("page"),
  ...pageLikeFields,
});

const flowExample = examplesBase.extend({
  size: z.literal("flow"),
  ...pageLikeFields,
});

const productExample = examplesBase.extend({
  size: z.literal("product"),
  ...pageLikeFields,
});

const examples = defineCollection({
  type: "content",
  schema: z.discriminatedUnion("size", [
    interactionExample,
    sectionExample,
    pageExample,
    flowExample,
    productExample,
  ]),
});

/**
 * ProductTypes Collection
 * Documentation pages for each kind of digital product the design system
 * supports (workspace, public-form, etc). Each entry is the introductory
 * narrative for one product type. The `/examples/[productType]/` route
 * reads from this collection and queries the examples collection for
 * entries with a matching `productType` field.
 *
 * Brief 110 will surface this collection at `/product-types/[slug]/`.
 */
const productTypes = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string(),
    heroImage: z.string().optional(),
    demoUrl: z.string().url().optional(),
    sourceUrl: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
    components: z.array(z.string()).optional(),
    status: z.enum(["published", "draft", "deprecated"]).default("published"),
  }),
});

export const collections = {
  components,
  guidance,
  examples,
  productTypes,
};
