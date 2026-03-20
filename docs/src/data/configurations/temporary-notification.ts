/**
 * TemporaryNotification Component Configurations
 *
 * Temporary notifications appear briefly then dismiss.
 */

import type { ComponentConfigurations } from "./types";

export const temporaryNotificationConfigurations: ComponentConfigurations = {
  componentSlug: "temporary-notification",
  componentName: "Temporary notification",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic notification",
      description: "Simple temporary message",
      code: {
        react: `<GoabTemporaryNotification type="information">
  Your changes have been saved.
</GoabTemporaryNotification>`,
        angular: `<goab-temporary-notification type="information">
  Your changes have been saved.
</goab-temporary-notification>`,
        webComponents: `<goa-temporary-notification type="information">
  Your changes have been saved.
</goa-temporary-notification>`,
      },
    },
    {
      id: "types",
      name: "Notification types",
      description: "Different message types",
      code: {
        react: `<GoabTemporaryNotification type="success">
  Action completed successfully.
</GoabTemporaryNotification>
<GoabTemporaryNotification type="information">
  New updates available.
</GoabTemporaryNotification>
<GoabTemporaryNotification type="important">
  Please review your submission.
</GoabTemporaryNotification>
<GoabTemporaryNotification type="emergency">
  Session expiring soon.
</GoabTemporaryNotification>`,
        angular: `<goab-temporary-notification type="success">
  Action completed successfully.
</goab-temporary-notification>
<goab-temporary-notification type="information">
  New updates available.
</goab-temporary-notification>
<goab-temporary-notification type="important">
  Please review your submission.
</goab-temporary-notification>
<goab-temporary-notification type="emergency">
  Session expiring soon.
</goab-temporary-notification>`,
        webComponents: `<goa-temporary-notification type="success">
  Action completed successfully.
</goa-temporary-notification>
<goa-temporary-notification type="information">
  New updates available.
</goa-temporary-notification>
<goa-temporary-notification type="important">
  Please review your submission.
</goa-temporary-notification>
<goa-temporary-notification type="emergency">
  Session expiring soon.
</goa-temporary-notification>`,
      },
    },
    {
      id: "with-actions",
      name: "With actions",
      description: "Notification with action buttons",
      code: {
        react: `<GoabTemporaryNotification type="information">
  File uploaded. <a href="/files">View file</a>
</GoabTemporaryNotification>`,
        angular: `<goab-temporary-notification type="information">
  File uploaded. <a href="/files">View file</a>
</goab-temporary-notification>`,
        webComponents: `<goa-temporary-notification type="information">
  File uploaded. <a href="/files">View file</a>
</goa-temporary-notification>`,
      },
    },
  ],
};
