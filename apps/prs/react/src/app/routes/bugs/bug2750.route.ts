import { Bug2750Route } from "../../../routes/bugs/bug2750";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2750",
  path: "bugs/2750",
  title: "Year Select Sorting",
  component: Bug2750Route,
} satisfies PrRouteDefinition;
