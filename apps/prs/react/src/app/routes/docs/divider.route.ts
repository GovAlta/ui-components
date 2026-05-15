import { DocsDividerRoute } from "../../../routes/docs/divider/divider";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "divider",
  path: "docs/divider",
  title: "Divider",
  component: DocsDividerRoute,
} satisfies PrRouteDefinition;
