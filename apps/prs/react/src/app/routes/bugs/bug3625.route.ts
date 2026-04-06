import { Bug3625Route } from "../../../routes/bugs/bug3625";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3625",
  path: "bugs/3625",
  title: "Accordion Refinement",
  component: Bug3625Route,
} satisfies PrRouteDefinition;
