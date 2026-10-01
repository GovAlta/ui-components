import { Bug4092Route } from "../../../routes/bugs/bug4092";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "4092",
  path: "bugs/bug4092",
  title: "Dropdown Multiselect blur",
  component: Bug4092Route,
} satisfies PrRouteDefinition;
