import { FeatV2IconsRoute } from "../../../routes/features/featV2Icons";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "feature",
  id: "v2-icons",
  path: "features/v2-icons",
  title: "header icons",
  component: FeatV2IconsRoute,
} satisfies PrRouteDefinition;
