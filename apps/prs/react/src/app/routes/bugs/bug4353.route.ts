import { Bug4353Route } from "../../../routes/bugs/bug4353";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "4353",
  path: "bugs/bug4353",
  title: "Notification close button name",
  component: Bug4353Route,
} satisfies PrRouteDefinition;
