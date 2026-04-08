import { Bug3735Route } from "../../../routes/bugs/bug3735";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3743",
  path: "bugs/3743",
  title: "Tertiary button background colour",
  component: Bug3735Route,
} satisfies PrRouteDefinition;
