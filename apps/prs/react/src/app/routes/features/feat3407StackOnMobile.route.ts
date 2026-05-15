import { Feat3407StackOnMobileRoute } from "../../../routes/features/feat3407StackOnMobile";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "feature",
  id: "3407",
  path: "features/3407-stack-on-mobile",
  title: "Tabs Orientation",
  component: Feat3407StackOnMobileRoute,
} satisfies PrRouteDefinition;
