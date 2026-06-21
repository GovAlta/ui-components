import type { CollectionName } from "./config";

export interface BaseRecord {
  id: string;
  collection: CollectionName;
  body: string;
}

export interface ComponentRecord extends BaseRecord {
  collection: "components";
  name: string;
  description?: string;
  status: string;
  category: string;
  tags: string[];
  aliases: string[];
  relatedComponents: string[];
  figmaUrl?: string;
  hidden?: boolean;
  subcomponent?: boolean;
  webComponentTag?: string;
  reactClassName?: string;
  angularSelector?: string;
  vueComponentName?: string;
  // Full API blob from generated/component-apis/*.json (minus componentSlug).
  // Contains per-framework props/events/slots. Consumers navigate it.
  api?: Record<string, unknown>;
  // Guidance ids that target this component via guidance.appliesTo.components.
  relatedGuidance?: string[];
}

export interface ExampleRecord extends BaseRecord {
  collection: "examples";
  title: string;
  description?: string;
  size: "interaction" | "section" | "page" | "task" | "product";
  tags: string[];
  components: string[];
  relatedExamples: string[];
  aliases: string[];
  status: string;
  productType?: "workspace" | "public-form";
  frameworks?: string[];
  previewImage?: string;
  figmaUrl?: string;
  accessibilityNotes?: string;
  hidden?: boolean;
  // Page-like fields (page, task, product sizes only)
  previewUrl?: string;
  reactSourceUrl?: string;
  angularSourceUrl?: string;
  vueSourceUrl?: string;
  sourceUrl?: string;
  stackblitzUrl?: string;
}

export interface GuidanceRecord extends BaseRecord {
  collection: "guidance";
  type: string;
  description: string;
  topic: string;
  tags: string[];
  appliesTo?: {
    components?: string[];
    contexts?: string[];
  };
  relatedProps: string[];
  status: string;
}

export interface FoundationRecord extends BaseRecord {
  collection: "foundations";
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: string;
}

export interface GetStartedRecord extends BaseRecord {
  collection: "get-started";
  title: string;
  navLabel?: string;
  description?: string;
  section: string;
  order: number;
  status: string;
}

export interface ProductTypeRecord extends BaseRecord {
  collection: "productTypes";
  title: string;
  summary: string;
  heroImage?: string;
  demoUrl?: string;
  sourceUrl?: string;
  tags: string[];
  components: string[];
  status: string;
}

export type AnyRecord =
  | ComponentRecord
  | ExampleRecord
  | GuidanceRecord
  | FoundationRecord
  | GetStartedRecord
  | ProductTypeRecord;

export interface Finding {
  severity: "error" | "warning";
  source: { collection: CollectionName; id: string };
  field: string;
  brokenRef: string;
  /** Extra context appended after the broken ref, e.g. `on component "checkbox"`. */
  context?: string;
  /** Override the default "not found" suffix, e.g. `not in extracted props`. */
  notFoundMessage?: string;
  /** Optional "did you mean..." string populated by the check. */
  hint?: string;
}
