import { DocsBlockRoute } from "../../../routes/docs/block/block";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "block",
  path: "docs/block",
  title: "Block",
  component: DocsBlockRoute,
} satisfies PrRouteDefinition;
