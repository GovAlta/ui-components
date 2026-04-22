import { DocsFooterRoute } from "../../../routes/docs/footer/footer";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "footer",
  path: "docs/footer",
  title: "Footer",
  component: DocsFooterRoute,
} satisfies PrRouteDefinition;
