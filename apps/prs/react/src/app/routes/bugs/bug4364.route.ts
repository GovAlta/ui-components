import { Bug4364Route } from "../../../routes/bugs/bug4364";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "4364",
  path: "bugs/4364",
  title: "Centre the app header service name",
  component: Bug4364Route,
} satisfies PrRouteDefinition;
