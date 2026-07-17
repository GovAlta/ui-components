import { Bug3609Route } from "../../../routes/bugs/bug3609";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3609",
  path: "bugs/3609",
  title: "Modal scroll clipping and actions padding",
  component: Bug3609Route,
} satisfies PrRouteDefinition;
