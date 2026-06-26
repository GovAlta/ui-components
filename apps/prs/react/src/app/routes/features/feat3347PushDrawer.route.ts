import { Feat3347PushDrawerRoute } from "../../../routes/features/feat3347PushDrawer";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "feature",
  id: "3347-push",
  path: "features/3347-push",
  title: "Scroll Panel - Push Drawer V2",
  component: Feat3347PushDrawerRoute,
} satisfies PrRouteDefinition;
