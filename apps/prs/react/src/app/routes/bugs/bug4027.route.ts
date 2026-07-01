import { Bug4027Route } from "../../../routes/bugs/bug4027";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "4027",
  path: "bugs/4027",
  title: "DatePicker day/year number spinner",
  component: Bug4027Route,
} satisfies PrRouteDefinition;
