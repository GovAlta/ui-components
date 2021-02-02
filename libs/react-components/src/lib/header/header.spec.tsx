import React from 'react';
import {render, screen} from '@testing-library/react';

import GoAHeader from './header';

describe('Header', () => {
  const serviceName = 'DIO service';
  const microSiteLink = 'http://test.fake.url/';

  it('should render header', () => {
    render(<GoAHeader
      serviceHome={microSiteLink}
      serviceName={serviceName}
      serviceLevel="alpha" />);

    const link = screen.getByRole('link', { name: microSiteLink }) as HTMLAnchorElement;

    expect(screen.getByText(serviceName));
    expect(link.href).toEqual(microSiteLink);
  });

  it('should show the alpha flair', function () {
    render(<GoAHeader
      serviceHome={microSiteLink}
      serviceName={serviceName}
      serviceLevel="alpha" />);

    expect(screen.getByText('alpha', { selector: ".service-level--alpha" }));
  });

  it('should show beta flair', function () {
    render(<GoAHeader
      serviceHome={microSiteLink}
      serviceName={serviceName}
      serviceLevel="beta" />);

    expect(screen.getByText('beta', { selector: ".service-level--beta" }));
  });

  it('should show live flair', function () {
    render(<GoAHeader
      serviceHome={microSiteLink}
      serviceName={serviceName}
      serviceLevel="live" />);

    // This text is actually there, just hidden
    expect(screen.getByText('live', { selector: ".service-level--live" }));
  });
});
