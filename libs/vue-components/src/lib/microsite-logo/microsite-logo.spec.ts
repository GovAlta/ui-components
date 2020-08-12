import { render, screen } from '@testing-library/vue';
import GoAMicrositeLogo from './microsite-logo.vue';

describe('GoA Microsite Logo', () => {
  const serviceName = 'DIO service';
  const microSiteLink = 'http://test.fake.url/';

  test('should render the sevice name', async () => {
    await render(GoAMicrositeLogo, {
      props: { serviceName: serviceName, serviceHome: microSiteLink }
    });

    expect(screen.getByText(serviceName))
  });

  test('should link to the serviceHome', async () => {
    await render(GoAMicrositeLogo, {
      props: { serviceName: serviceName, serviceHome: microSiteLink }
    });
    
    expect((screen.getByRole('link', { name: microSiteLink }) as HTMLAnchorElement).href).toEqual(microSiteLink);
  });
});