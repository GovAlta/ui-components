import { Bug3648Route } from "../../../routes/bugs/bug3648";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3648",
  path: "bugs/3648",
  title: "Badge edge treatment",
  component: Bug3648Route,
} satisfies PrRouteDefinition;
