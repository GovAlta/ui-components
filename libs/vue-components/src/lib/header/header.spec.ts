import { render, screen, fireEvent } from '@testing-library/vue';
import GoAHeader from './header.vue';

describe('GoA Microsite Logo', () => {
  const serviceName = 'DIO service';
  const microSiteLink = 'http://test.fake.url/';

  test('should render the sevice name', async () => {
    await render(GoAHeader, {
      props: { serviceName: serviceName, microServiceHomeLink: microSiteLink }
    });

    expect(screen.getByText(serviceName))
  });

  test('should link to the microServiceHomeLink', async () => {
    await render(GoAHeader, {
      props: { serviceName: serviceName, microServiceHomeLink: microSiteLink }
    });
    
    expect((<HTMLAnchorElement>screen.getByRole('link', { name: microSiteLink })).href).toEqual(microSiteLink);
  });
});