/**
 * Notification Component Configurations
 *
 * Notifications display important messages at the page level.
 * Note: Notification does not have margin props. Use wrapper elements for spacing.
 */

import type { ComponentConfigurations } from "./types";

export const notificationConfigurations: ComponentConfigurations = {
  componentSlug: "notification",
  componentName: "Notification",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Information notification",
      description: "Default informational notification",
      code: {
        react: `<GoabNotification type="information">
  Your application has been received and is being processed.
</GoabNotification>`,
        angular: `<goab-notification type="information">
  Your application has been received and is being processed.
</goab-notification>`,
        webComponents: `<goa-notification version="2" type="information">
  Your application has been received and is being processed.
</goa-notification>`,
      },
    },
    {
      id: "types",
      name: "Notification types",
      description: "Different notification types for various contexts",
      code: {
        react: `<div style={{ marginBottom: "var(--goa-space-m)" }}>
  <GoabNotification type="information">
    Information: General updates for the user.
  </GoabNotification>
</div>
<div style={{ marginBottom: "var(--goa-space-m)" }}>
  <GoabNotification type="important">
    Important: Action may be required.
  </GoabNotification>
</div>
<GoabNotification type="emergency">
  Emergency: Critical issue requiring attention.
</GoabNotification>`,
        angular: `<div style="margin-bottom: var(--goa-space-m);">
  <goab-notification type="information">
    Information: General updates for the user.
  </goab-notification>
</div>
<div style="margin-bottom: var(--goa-space-m);">
  <goab-notification type="important">
    Important: Action may be required.
  </goab-notification>
</div>
<goab-notification type="emergency">
  Emergency: Critical issue requiring attention.
</goab-notification>`,
        webComponents: `<div style="margin-bottom: var(--goa-space-m);">
  <goa-notification version="2" type="information">
    Information: General updates for the user.
  </goa-notification>
</div>
<div style="margin-bottom: var(--goa-space-m);">
  <goa-notification version="2" type="important">
    Important: Action may be required.
  </goa-notification>
</div>
<goa-notification version="2" type="emergency">
  Emergency: Critical issue requiring attention.
</goa-notification>`,
      },
    },
    {
      id: "emphasis",
      name: "Emphasis levels",
      description: "High and low visual prominence",
      code: {
        react: `<div style={{ marginBottom: "var(--goa-space-m)" }}>
  <GoabNotification type="important" emphasis="high">
    High emphasis: Full background for maximum visibility.
  </GoabNotification>
</div>
<GoabNotification type="important" emphasis="low">
  Low emphasis: Minimal styling for less prominent messaging.
</GoabNotification>`,
        angular: `<div style="margin-bottom: var(--goa-space-m);">
  <goab-notification type="important" emphasis="high">
    High emphasis: Full background for maximum visibility.
  </goab-notification>
</div>
<goab-notification type="important" emphasis="low">
  Low emphasis: Minimal styling for less prominent messaging.
</goab-notification>`,
        webComponents: `<div style="margin-bottom: var(--goa-space-m);">
  <goa-notification version="2" type="important" emphasis="high">
    High emphasis: Full background for maximum visibility.
  </goa-notification>
</div>
<goa-notification version="2" type="important" emphasis="low">
  Low emphasis: Minimal styling for less prominent messaging.
</goa-notification>`,
      },
    },
    {
      id: "compact",
      name: "Compact",
      description: "Reduced padding for tighter layouts",
      code: {
        react: `<div style={{ marginBottom: "var(--goa-space-m)" }}>
  <GoabNotification type="information">
    Standard notification with default padding.
  </GoabNotification>
</div>
<GoabNotification type="information" compact>
  Compact notification with reduced padding.
</GoabNotification>`,
        angular: `<div style="margin-bottom: var(--goa-space-m);">
  <goab-notification type="information">
    Standard notification with default padding.
  </goab-notification>
</div>
<goab-notification type="information" [compact]="true">
  Compact notification with reduced padding.
</goab-notification>`,
        webComponents: `<div style="margin-bottom: var(--goa-space-m);">
  <goa-notification version="2" type="information">
    Standard notification with default padding.
  </goa-notification>
</div>
<goa-notification version="2" type="information" compact>
  Compact notification with reduced padding.
</goa-notification>`,
      },
    },
  ],
};
