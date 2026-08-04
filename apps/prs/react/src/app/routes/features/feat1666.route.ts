import { Feat1666Route } from "../../../routes/features/feat1666";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "feature",
  id: "1666",
  path: "features/1666",
  title: "Focus and Blur Events",
  component: Feat1666Route,
} satisfies PrRouteDefinition;
