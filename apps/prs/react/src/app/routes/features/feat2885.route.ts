import { Feat2885Route } from "../../../routes/features/feat2885";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "feature",
  id: "2885",
  path: "features/2885",
  title: "Notification Center",
  component: Feat2885Route,
} satisfies PrRouteDefinition;
