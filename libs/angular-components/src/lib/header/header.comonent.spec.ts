import {render, screen} from '@testing-library/angular';
import {GoAHeaderComponent} from './header.component';
import {GoAMicrositeLogoComponent} from '../microsite-logo/microsite-logo.component';
import {ServiceLevel} from "@abgov/shared/common";

describe('GoA Header', () => {
  const serviceName = 'DIO service';
  const microSiteLink = 'http://test.fake.url/';

  test('should render header', async () => {
    await render(GoAHeaderComponent, {
      componentProperties: { serviceName: serviceName, serviceHome: microSiteLink, serviceLevel: ServiceLevel.Alpha },
      declarations: [GoAMicrositeLogoComponent]
    });

    expect(screen.getByText(serviceName));
  });

  test('should render the alpha flair', async () => {
    await render(GoAHeaderComponent, {
      componentProperties: { serviceName: serviceName, serviceHome: microSiteLink, serviceLevel: ServiceLevel.Alpha },
      declarations: [GoAMicrositeLogoComponent]
    });

    expect(screen.getByText(ServiceLevel.Alpha, { selector: `.service-level--alpha` }));
  });

  test('should render the beta flair', async () => {
    await render(GoAHeaderComponent, {
      componentProperties: { serviceName: serviceName, serviceHome: microSiteLink, serviceLevel: ServiceLevel.Beta},
      declarations: [GoAMicrositeLogoComponent]
    });

    expect(screen.getByText(ServiceLevel.Beta, { selector: `.service-level--beta` }));
  });

  test('should render the live flair', async () => {
    await render(GoAHeaderComponent, {
      componentProperties: { serviceName: serviceName, serviceHome: microSiteLink, serviceLevel: ServiceLevel.Live},
      declarations: [GoAMicrositeLogoComponent]
    });

    expect(screen.getByText(ServiceLevel.Live, { selector: `.service-level--live` }));
  });
});
