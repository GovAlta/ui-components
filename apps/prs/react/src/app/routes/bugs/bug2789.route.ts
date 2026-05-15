import { Bug2789Route } from "../../../routes/bugs/bug2789";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2789",
  path: "bugs/2789",
  title: "Width Rem Measurements",
  component: Bug2789Route,
} satisfies PrRouteDefinition;
