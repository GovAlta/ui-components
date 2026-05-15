import Bug3627Route from "../../../routes/bugs/bug3627";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3627",
  path: "bugs/3627",
  title: "Container refinements",
  component: Bug3627Route,
} satisfies PrRouteDefinition;
