import { Bug4251Route } from "../../../routes/bugs/bug4251";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "4251",
  path: "bugs/bug4251",
  title: "Notification panel dark mode",
  component: Bug4251Route,
} satisfies PrRouteDefinition;
