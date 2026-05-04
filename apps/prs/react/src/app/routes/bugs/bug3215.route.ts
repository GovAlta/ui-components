import { Bug3215Route } from "../../../routes/bugs/bug3215";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3215",
  path: "bugs/3215",
  title: "Drawer Initial Height",
  component: Bug3215Route,
} satisfies PrRouteDefinition;
