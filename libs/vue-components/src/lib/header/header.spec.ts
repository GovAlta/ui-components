import { render, screen } from '@testing-library/vue';
import GoAHeader from './header.vue';
import {ServiceLevel} from "./service-level.enum";

describe('GoA Microsite Logo', () => {
  const serviceName = 'DIO service';
  const microSiteLink = 'http://test.fake.url/';

  test('should render the service name', async () => {
    await render(GoAHeader, {
      props: { serviceName: serviceName, serviceHome: microSiteLink, serviceLevel: ServiceLevel.Alpha }
    });

    expect(screen.getByText(serviceName))
  });

  test('should link to the serviceHome', async () => {
    await render(GoAHeader, {
      props: { serviceName: serviceName, serviceHome: microSiteLink, serviceLevel: ServiceLevel.Alpha}
    });

    expect((screen.getByRole('link', { name: microSiteLink }) as HTMLAnchorElement).href).toEqual(microSiteLink);
  });

  test('should see the alpha flair when in alpha mode', async () => {
    await render(GoAHeader, {
      props: { serviceName: serviceName, serviceHome: microSiteLink, serviceLevel: ServiceLevel.Alpha }
    });

    expect(screen.getByText(ServiceLevel.Alpha, { selector: '.service-level--alpha'}));
  });

  test('should see the alpha flair when in beta mode', async () => {
    await render(GoAHeader, {
      props: { serviceName: serviceName, serviceHome: microSiteLink, serviceLevel: ServiceLevel.Beta}
    });

    expect(screen.getByText(ServiceLevel.Beta, { selector: '.service-level--beta'}));
  });

  test('should see the alpha flair when in live mode', async () => {
    await render(GoAHeader, {
      props: { serviceName: serviceName, serviceHome: microSiteLink, serviceLevel: ServiceLevel.Live}
    });

    expect(screen.getByText(ServiceLevel.Live, { selector: '.service-level--live'}));
  });
});
