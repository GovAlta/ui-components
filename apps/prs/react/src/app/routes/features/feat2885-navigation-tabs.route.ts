import { Feat2885NavigationTabsRoute } from "../../../routes/features/feat2885-navigation-tabs";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "feature",
  id: "2885",
  path: "features/2885-navigation-tabs",
  title: "Notification Center - Navigation Tabs",
  component: Feat2885NavigationTabsRoute,
} satisfies PrRouteDefinition;
