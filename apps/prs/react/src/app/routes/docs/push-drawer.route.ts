import { DocsPushDrawerRoute } from "../../../routes/docs/push-drawer/push-drawer";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "push-drawer",
  path: "docs/push-drawer",
  title: "Push Drawer",
  component: DocsPushDrawerRoute,
} satisfies PrRouteDefinition;
