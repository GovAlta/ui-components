import { Bug3685Route } from "../../../routes/bugs/bug3685";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3685",
  path: "bugs/3685",
  title: "Checkbox & Radio: Reveal width not aligned with item",
  component: Bug3685Route,
} satisfies PrRouteDefinition;
