import { render, screen, fireEvent } from '@testing-library/angular';
import { GoANotificationBannerComponent } from './notification-banner.component';

describe('GoA Callout', () => {
  const title = 'my title';

  test('should render title', async () => {
    await render(GoANotificationBannerComponent, {
      template: `<goa-notification-banner title='${title}'></goa-notification-banner>`,
    });

    expect(screen.getByText(title));
  });
});
