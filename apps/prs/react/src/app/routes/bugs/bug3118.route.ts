import { Bug3118Route } from "../../../routes/bugs/bug3118";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3118",
  path: "bugs/3118",
  title: "Text Component ID",
  component: Bug3118Route,
} satisfies PrRouteDefinition;
