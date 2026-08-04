import { Bug3986Route } from "../../../routes/bugs/bug3986";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3986",
  path: "bugs/3986",
  title: "ButtonGroup mobile width",
  component: Bug3986Route,
} satisfies PrRouteDefinition;
