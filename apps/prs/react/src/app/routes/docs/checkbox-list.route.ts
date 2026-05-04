import { DocsCheckboxListRoute } from "../../../routes/docs/checkbox-list/checkbox-list";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "checkbox-list",
  path: "docs/checkbox-list",
  title: "Checkbox List",
  component: DocsCheckboxListRoute,
} satisfies PrRouteDefinition;
