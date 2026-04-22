import { DocsLinkRoute } from "../../../routes/docs/link/link";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "link",
  path: "docs/link",
  title: "Link",
  component: DocsLinkRoute,
} satisfies PrRouteDefinition;
