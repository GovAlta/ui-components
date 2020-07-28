import { render, screen, fireEvent } from '@testing-library/angular';
import { GoAHeaderComponent } from './header.component';
import { GoAMicrositeLogoComponent } from '../microsite-logo/microsite-logo.component';

describe('GoA Header', () => {
  const serviceName = 'DIO service';
  const microSiteLink = 'http://test.fake.url/';

  test('should render header', async () => {
    await render(GoAHeaderComponent, {
      componentProperties: { serviceName: serviceName, microServiceHomeLink: microSiteLink },
      declarations: [GoAMicrositeLogoComponent]
    });

    expect((<HTMLAnchorElement>screen.getByTestId('goa-microsite-anchor')).href).toEqual(microSiteLink);
    expect(screen.getByText(serviceName));
  });

});