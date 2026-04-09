import Feat2611TabsDisabledRoute from "../../../routes/features/feat2611-tabs-disabled";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "feature",
  id: "2611",
  path: "features/2611-tabs-disabled",
  title: "Disabled Tab",
  component: Feat2611TabsDisabledRoute,
} satisfies PrRouteDefinition;
