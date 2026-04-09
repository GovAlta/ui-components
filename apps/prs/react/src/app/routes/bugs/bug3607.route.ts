import { Bug3607Route } from "../../../routes/bugs/bug3607";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3607",
  path: "bugs/3607",
  title: "Radio and Checkbox Interaction Area",
  component: Bug3607Route,
} satisfies PrRouteDefinition;
