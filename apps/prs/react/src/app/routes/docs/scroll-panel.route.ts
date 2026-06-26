import { DocsScrollPanelRoute } from "../../../routes/docs/scroll-panel/scroll-panel";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "scroll-panel",
  path: "docs/scroll-panel",
  title: "Scroll Panel",
  component: DocsScrollPanelRoute,
} satisfies PrRouteDefinition;
