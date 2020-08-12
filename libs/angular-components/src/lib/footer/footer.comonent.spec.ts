import { render, screen, fireEvent } from '@testing-library/angular';
import { GoAFooterComponent } from './footer.component';
import { GoAMicrositeLogoComponent } from '../microsite-logo/microsite-logo.component';

describe('GoA footer', () => {
  const serviceName = 'DIO service';
  const microSiteLink = 'http://test.fake.url/';

  test('should render footer', async () => {
    await render(GoAFooterComponent, {
      componentProperties: { serviceName: serviceName, serviceHome: microSiteLink },
      declarations: [GoAMicrositeLogoComponent]
    });
    
    expect(screen.getByText(serviceName))
  });

  test('should link to the serviceHome', async () => {
    await render(GoAMicrositeLogoComponent, {
      componentProperties: { serviceName: serviceName, serviceHome: microSiteLink }
    });
    
    expect((<HTMLAnchorElement>screen.getByRole('link', { name: microSiteLink })).href).toEqual(microSiteLink);
  });
});