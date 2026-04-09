import { Bug3498Route } from "../../../routes/bugs/bug3498";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3498",
  path: "bugs/3498",
  title: "Radio alignment",
  component: Bug3498Route,
} satisfies PrRouteDefinition;
