import { Bug2502Route } from "../../../routes/bugs/bug2502";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2502",
  path: "bugs/2502",
  title: "Native Dropdown Height",
  component: Bug2502Route,
} satisfies PrRouteDefinition;
