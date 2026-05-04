import { Feat3407SkipOnFocusTabRoute } from "../../../routes/features/feat3407SkipOnFocusTab";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "feature",
  id: "3407",
  path: "features/3407-skip-on-focus-tab",
  title: "Skip Focus on Tab",
  component: Feat3407SkipOnFocusTabRoute,
} satisfies PrRouteDefinition;
