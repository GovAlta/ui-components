import { Bug3735Route } from "../../../routes/bugs/bug3735";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3735",
  path: "bugs/3735",
  title: "Work Side Menu tooltip fixes",
  component: Bug3735Route,
} satisfies PrRouteDefinition;
