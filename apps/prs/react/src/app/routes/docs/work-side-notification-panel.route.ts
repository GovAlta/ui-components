import { DocsWorkSideNotificationPanelRoute } from "../../../routes/docs/work-side-notification-panel/work-side-notification-panel";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "work-side-notification-panel",
  path: "docs/work-side-notification-panel",
  title: "Notification Panel",
  component: DocsWorkSideNotificationPanelRoute,
} satisfies PrRouteDefinition;
