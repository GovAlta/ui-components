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
