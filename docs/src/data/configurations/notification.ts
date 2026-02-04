/**
 * Notification Component Configurations
 *
 * Notifications display important messages at the page level.
 */

import type { ComponentConfigurations } from './types';

export const notificationConfigurations: ComponentConfigurations = {
  componentSlug: 'notification',
  componentName: 'Notification',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Information notification',
      description: 'Default informational notification',
      code: {
        react: `<GoabxNotification type="information">
  Your application has been received and is being processed.
</GoabxNotification>`,
        angular: `<goab-notification type="information">
  Your application has been received and is being processed.
</goab-notification>`,
        webComponents: `<goa-notification type="information">
  Your application has been received and is being processed.
</goa-notification>`,
      },
    },
    {
      id: 'types',
      name: 'Notification types',
      description: 'Different notification types for various contexts',
      code: {
        react: `<GoabxNotification type="information">
  Information: General updates for the user.
</GoabxNotification>
<GoabxNotification type="important">
  Important: Action may be required.
</GoabxNotification>
<GoabxNotification type="emergency">
  Emergency: Critical issue requiring attention.
</GoabxNotification>
<GoabxNotification type="event">
  Event: Upcoming deadline or scheduled event.
</GoabxNotification>`,
        angular: `<goab-notification type="information">
  Information: General updates for the user.
</goab-notification>
<goab-notification type="important">
  Important: Action may be required.
</goab-notification>
<goab-notification type="emergency">
  Emergency: Critical issue requiring attention.
</goab-notification>
<goab-notification type="event">
  Event: Upcoming deadline or scheduled event.
</goab-notification>`,
        webComponents: `<goa-notification type="information">
  Information: General updates for the user.
</goa-notification>
<goa-notification type="important">
  Important: Action may be required.
</goa-notification>
<goa-notification type="emergency">
  Emergency: Critical issue requiring attention.
</goa-notification>
<goa-notification type="event">
  Event: Upcoming deadline or scheduled event.
</goa-notification>`,
      },
    },
    {
      id: 'dismissable',
      name: 'Dismissable',
      description: 'Notification that can be closed',
      code: {
        react: `<GoabxNotification type="information" onDismiss={() => setVisible(false)}>
  This notification can be dismissed by clicking the close button.
</GoabxNotification>`,
        angular: `<goab-notification type="information" (_dismiss)="handleDismiss()">
  This notification can be dismissed by clicking the close button.
</goab-notification>`,
        webComponents: `<goa-notification type="information" dismissable>
  This notification can be dismissed by clicking the close button.
</goa-notification>`,
      },
    },
    {
      id: 'with-max-width',
      name: 'With max width',
      description: 'Notification with constrained width',
      code: {
        react: `<GoabxNotification type="information" maxWidth="600px">
  This notification has a maximum width for narrower layouts.
</GoabxNotification>`,
        angular: `<goab-notification type="information" maxWidth="600px">
  This notification has a maximum width for narrower layouts.
</goab-notification>`,
        webComponents: `<goa-notification type="information" maxwidth="600px">
  This notification has a maximum width for narrower layouts.
</goa-notification>`,
      },
    },
  ],
};
