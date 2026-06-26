import { Bug3893Route } from "../../../routes/bugs/bug3893";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3893",
  path: "bugs/3893",
  title: "Block alignment breaks width",
  component: Bug3893Route,
} satisfies PrRouteDefinition;
