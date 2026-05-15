import { Bug3273Page2Route } from "../../../routes/bugs/bug3273-2";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3273-2",
  path: "bugs/3273-2",
  title: "Nested Side Menu Groups - 2",
  component: Bug3273Page2Route,
} satisfies PrRouteDefinition;
