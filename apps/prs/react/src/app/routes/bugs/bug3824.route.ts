import { Bug3824Route } from "../../../routes/bugs/bug3824";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3824",
  path: "bugs/3824",
  title: "Pagination button gap",
  component: Bug3824Route,
} satisfies PrRouteDefinition;
