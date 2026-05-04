import { DocsMicrositeHeaderRoute } from "../../../routes/docs/microsite-header/microsite-header";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "microsite-header",
  path: "docs/microsite-header",
  title: "Microsite Header",
  component: DocsMicrositeHeaderRoute,
} satisfies PrRouteDefinition;
