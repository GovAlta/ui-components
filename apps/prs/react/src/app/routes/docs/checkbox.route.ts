import { DocsCheckboxRoute } from "../../../routes/docs/checkbox/checkbox";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "checkbox",
  path: "docs/checkbox",
  title: "Checkbox",
  component: DocsCheckboxRoute,
} satisfies PrRouteDefinition;
