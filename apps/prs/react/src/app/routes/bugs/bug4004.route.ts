import { Bug4004Route } from "../../../routes/bugs/bug4004";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "4004",
  path: "bugs/4004",
  title: "PushDrawer slotted heading",
  component: Bug4004Route,
} satisfies PrRouteDefinition;
