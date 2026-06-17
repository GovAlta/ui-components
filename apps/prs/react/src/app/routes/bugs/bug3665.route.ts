import { Bug3665Route } from "../../../routes/bugs/bug3665";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3665",
  path: "bugs/3665",
  title: "Tabs page jump on switch",
  component: Bug3665Route,
} satisfies PrRouteDefinition;
