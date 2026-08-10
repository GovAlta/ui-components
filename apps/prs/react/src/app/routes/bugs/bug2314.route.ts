import { Bug2314Route } from "../../../routes/bugs/bug2314";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2314",
  path: "bugs/2314",
  title: "Button: Mobile width",
  component: Bug2314Route,
} satisfies PrRouteDefinition;
