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
 * Code examples showing components in context
 * From small configurations to full services
 */
const examples = defineCollection({
  type: "content",
  schema: z.object({
    // Identity
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    slug: z.string().optional(),

    // Classification
    categories: z.array(
      z.enum([
        "content-layout",
        "feedback-and-alerts",
        "inputs-and-actions",
        "forms",
        "structure-and-navigation",
        "technical",
      ]),
    ),
    scale: z.enum(["interaction", "task", "page", "product"]),
    userType: z.enum(["citizen", "worker", "both"]),

    tags: z.array(z.string()).optional(),

    // Components used (for relationship queries)
    components: z.array(z.string()),

    // Related examples
    relatedExamples: z.array(z.string()).optional(),

    // Accessibility notes (shown in collapsible on example card)
    accessibilityNotes: z.string().optional(),

    // External links
    figmaUrl: z.string().url().optional(),

    // Status
    status: z.enum(["published", "draft", "deprecated"]).default("published"),

    // Preview image (optional)
    previewImage: z.string().optional(),

    // Shared CSS file reference (relative to _shared folder)
    styles: z.string().optional(),

    // Display options
    fullWidth: z.boolean().optional(), // Remove side padding in preview (for callouts, notifications)
    previewStyle: z.string().optional(), // Inline CSS override for preview container (e.g. "padding: 0; max-height: 600px")
  }),
});

/**
 * Foundations Collection
 * Design system knowledge documents (principles, anti-patterns, user types)
 * These are reference documents, not atomic items like guidance
 */
const foundations = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.enum(["design", "development", "accessibility"]),
    tags: z.array(z.string()).optional(),
    status: z.enum(["published", "draft", "deprecated"]).default("published"),
  }),
});

export const collections = {
  components,
  guidance,
  examples,
  foundations,
};
