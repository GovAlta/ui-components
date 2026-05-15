import { DocsPopoverRoute } from "../../../routes/docs/popover/popover";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "popover",
  path: "docs/popover",
  title: "Popover",
  component: DocsPopoverRoute,
} satisfies PrRouteDefinition;
