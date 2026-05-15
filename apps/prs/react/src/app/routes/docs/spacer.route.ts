import { DocsSpacerRoute } from "../../../routes/docs/spacer/spacer";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "spacer",
  path: "docs/spacer",
  title: "Spacer",
  component: DocsSpacerRoute,
} satisfies PrRouteDefinition;
