import { DocsTemporaryNotificationRoute } from "../../../routes/docs/temporary-notification/temporary-notification";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "temporary-notification",
  path: "docs/temporary-notification",
  title: "Temporary Notification",
  component: DocsTemporaryNotificationRoute,
} satisfies PrRouteDefinition;
