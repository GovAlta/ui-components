import { DocsTextAreaRoute } from "../../../routes/docs/text-area/text-area";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "text-area",
  path: "docs/text-area",
  title: "Text Area",
  component: DocsTextAreaRoute,
} satisfies PrRouteDefinition;
