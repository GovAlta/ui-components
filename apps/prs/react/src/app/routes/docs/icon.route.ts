import { DocsIconRoute } from "../../../routes/docs/icon/icon";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "icon",
  path: "docs/icon",
  title: "Icon",
  component: DocsIconRoute,
} satisfies PrRouteDefinition;
