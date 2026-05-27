import { Bug3323Route } from "../../../routes/bugs/bug3323";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3323",
  path: "bugs/bug3323",
  title: "Tooltip popover positioning",
  component: Bug3323Route,
} satisfies PrRouteDefinition;
