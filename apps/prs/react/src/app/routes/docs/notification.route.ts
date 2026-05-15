import { DocsNotificationRoute } from "../../../routes/docs/notification/notification";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "notification",
  path: "docs/notification",
  title: "Notification Banner",
  component: DocsNotificationRoute,
} satisfies PrRouteDefinition;
