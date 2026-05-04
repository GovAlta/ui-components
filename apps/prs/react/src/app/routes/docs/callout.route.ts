import { DocsCalloutRoute } from "../../../routes/docs/callout/callout";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "callout",
  path: "docs/callout",
  title: "Callout",
  component: DocsCalloutRoute,
} satisfies PrRouteDefinition;
