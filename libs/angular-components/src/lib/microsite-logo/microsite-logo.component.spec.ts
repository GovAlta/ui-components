import { render, screen, fireEvent } from '@testing-library/angular';
import { GoAMicrositeLogoComponent } from './microsite-logo.component';

describe('GoA Microsite Logo', () => {
  const serviceName = 'DIO service';
  const microSiteLink = 'http://test.fake.url/';

  test('should render the sevice name', async () => {
    await render(GoAMicrositeLogoComponent, {
      componentProperties: { serviceName: serviceName, microServiceHomeLink: microSiteLink }
    });

    expect((<HTMLAnchorElement>screen.getByRole('link', { name: microSiteLink })).href).toEqual(microSiteLink);
    expect(screen.getByText(serviceName))
  });

});