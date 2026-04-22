import { DocsDropdownRoute } from "../../../routes/docs/dropdown/dropdown";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "dropdown",
  path: "docs/dropdown",
  title: "Dropdown",
  component: DocsDropdownRoute,
} satisfies PrRouteDefinition;
