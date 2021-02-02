import {render, screen} from '@testing-library/angular';
import {GoAHeaderComponent} from './header.component';
import {GoAMicrositeLogoComponent} from '../microsite-logo/microsite-logo.component';

describe('GoA Header', () => {
  const serviceName = 'DIO service';
  const microSiteLink = 'http://test.fake.url/';

  test('should render header', async () => {
    await render(GoAHeaderComponent, {
      componentProperties: { serviceName: serviceName, serviceHome: microSiteLink, serviceLevel: 'alpha' },
      declarations: [GoAMicrositeLogoComponent]
    });

    expect(screen.getByText(serviceName));
  });

  test('should render the alpha flair', async () => {
    await render(GoAHeaderComponent, {
      componentProperties: { serviceName: serviceName, serviceHome: microSiteLink, serviceLevel: 'alpha' },
      declarations: [GoAMicrositeLogoComponent]
    });

    expect(screen.getByText('alpha', { selector: `.service-level--alpha` }));
  });

  test('should render the beta flair', async () => {
    await render(GoAHeaderComponent, {
      componentProperties: { serviceName: serviceName, serviceHome: microSiteLink, serviceLevel: 'beta'},
      declarations: [GoAMicrositeLogoComponent]
    });

    expect(screen.getByText('beta', { selector: `.service-level--beta` }));
  });

  test('should render the live flair', async () => {
    await render(GoAHeaderComponent, {
      componentProperties: { serviceName: serviceName, serviceHome: microSiteLink, serviceLevel: 'live'},
      declarations: [GoAMicrositeLogoComponent]
    });

    expect(screen.getByText('live', { selector: `.service-level--live` }));
  });
});
