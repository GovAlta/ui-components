import * as path from "path";
import { fileURLToPath } from "url";

const WORKSPACE_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../..",
);

export const paths = {
  workspaceRoot: WORKSPACE_ROOT,
  content: {
    components: path.join(WORKSPACE_ROOT, "docs/src/content/components"),
    examples: path.join(WORKSPACE_ROOT, "docs/src/content/examples"),
    guidance: path.join(WORKSPACE_ROOT, "docs/src/content/guidance"),
    foundations: path.join(WORKSPACE_ROOT, "docs/src/content/foundations"),
    getStarted: path.join(WORKSPACE_ROOT, "docs/src/content/get-started"),
    productTypes: path.join(WORKSPACE_ROOT, "docs/src/content/productTypes"),
  },
  code: {
    componentApis: path.join(WORKSPACE_ROOT, "docs/generated/component-apis"),
    libs: path.join(WORKSPACE_ROOT, "libs"),
  },
  output: {
    mcp: path.join(WORKSPACE_ROOT, "docs/generated/mcp"),
    mdBundle: path.join(WORKSPACE_ROOT, "docs/generated/md-bundle"),
  },
} as const;

export type CollectionName =
  | "components"
  | "examples"
  | "guidance"
  | "foundations"
  | "get-started"
  | "productTypes";

export const collectionNames: CollectionName[] = [
  "components",
  "examples",
  "guidance",
  "foundations",
  "get-started",
  "productTypes",
];

// Components that exist only as web components (no React or Angular wrapper).
// The bundle keeps them in the Web Components set but drops them from the React
// and Angular sets, so an AI is not shown a component it cannot use in that
// framework. The source carries no per-framework wrapper signal (a wrapper-less
// component and a wrapped-but-undocumented one look identical in the extracted
// API), so this set is curated. Verified 2026-06-05: focus-trap, scrollable.
export const WEB_COMPONENT_ONLY = new Set<string>(["focus-trap", "scrollable"]);
