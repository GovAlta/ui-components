import React from 'react';
import { render, screen } from '@testing-library/react';
import MicrositeLogo from './microsite-logo';

describe('Microsite Logo', () => {
  const serviceName = 'DIO service';
  const microSiteLink = 'http://test.fake.url/';

  it('should show service name', () => {
    render(<MicrositeLogo
      serviceHome={microSiteLink}
      serviceName={serviceName} />);

    expect(screen.getByText(serviceName));
  });

  it('should include microsite link', function () {
    render(<MicrositeLogo
      serviceHome={microSiteLink}
      serviceName={serviceName} />);

    const el = screen.getByRole('link', { name: microSiteLink }) as HTMLAnchorElement;
    expect(el.href).toEqual(microSiteLink);
  });
});
