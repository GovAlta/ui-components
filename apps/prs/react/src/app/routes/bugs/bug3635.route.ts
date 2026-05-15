import { Bug3635Route } from "../../../routes/bugs/bug3635";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3635",
  path: "bugs/3635",
  title: "Input Leading icon color",
  component: Bug3635Route,
} satisfies PrRouteDefinition;
