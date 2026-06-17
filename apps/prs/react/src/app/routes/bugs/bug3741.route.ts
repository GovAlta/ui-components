import { Bug3741Route } from "../../../routes/bugs/bug3741";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3741",
  path: "bugs/3741",
  title: "Pagination spacer fill",
  component: Bug3741Route,
} satisfies PrRouteDefinition;
