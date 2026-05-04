import { Bug2473Route } from "../../../routes/bugs/bug2473";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2473",
  path: "bugs/2473",
  title: "DatePicker Ordinal Suffixes",
  component: Bug2473Route,
} satisfies PrRouteDefinition;
