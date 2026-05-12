import { DocsDropdownMultiselectRoute } from "../../../routes/docs/dropdown-multiselect/dropdown-multiselect";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "dropdown-multiselect",
  path: "docs/dropdown-multiselect",
  title: "Dropdown Multiselect",
  component: DocsDropdownMultiselectRoute,
} satisfies PrRouteDefinition;
