import { Bug3921Route } from "../../../routes/bugs/bug3921";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3921",
  path: "bugs/3921",
  title: "Segmented tab dynamic indicator",
  component: Bug3921Route,
} satisfies PrRouteDefinition;
