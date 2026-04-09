import { Bug2839Route } from "../../../routes/bugs/bug2839";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2839",
  path: "bugs/2839",
  title: "Button State After Click",
  component: Bug2839Route,
} satisfies PrRouteDefinition;
