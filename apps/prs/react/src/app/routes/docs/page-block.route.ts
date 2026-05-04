import { DocsPageBlockRoute } from "../../../routes/docs/page-block/page-block";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "page-block",
  path: "docs/page-block",
  title: "Page Block",
  component: DocsPageBlockRoute,
} satisfies PrRouteDefinition;
