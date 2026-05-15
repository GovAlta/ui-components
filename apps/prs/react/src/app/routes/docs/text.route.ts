import { DocsTextRoute } from "../../../routes/docs/text/text";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "text",
  path: "docs/text",
  title: "Text",
  component: DocsTextRoute,
} satisfies PrRouteDefinition;
