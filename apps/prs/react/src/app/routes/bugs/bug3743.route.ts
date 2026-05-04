import { Bug3743Route } from "../../../routes/bugs/bug3743";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3743",
  path: "bugs/3743",
  title: "Tertiary button background colour",
  component: Bug3743Route,
} satisfies PrRouteDefinition;
