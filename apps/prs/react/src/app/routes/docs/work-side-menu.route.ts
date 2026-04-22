import { DocsWorkSideMenuRoute } from "../../../routes/docs/work-side-menu/work-side-menu";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "work-side-menu",
  path: "docs/work-side-menu",
  title: "Work Side Menu",
  component: DocsWorkSideMenuRoute,
} satisfies PrRouteDefinition;
