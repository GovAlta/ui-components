import { DocsAppHeaderRoute } from "../../../routes/docs/app-header/app-header";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "app-header",
  path: "docs/app-header",
  title: "App Header",
  component: DocsAppHeaderRoute,
} satisfies PrRouteDefinition;
