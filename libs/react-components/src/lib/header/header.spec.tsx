import React from 'react';
import {render, screen} from '@testing-library/react';

import GoAHeader from './header';
import {ServiceLevel} from "@abgov/shared/common";

describe('Header', () => {
  const serviceName = 'DIO service';
  const microSiteLink = 'http://test.fake.url/';

  it('should render header', () => {
    render(<GoAHeader
      serviceHome={microSiteLink}
      serviceName={serviceName}
      serviceLevel={ServiceLevel.Alpha} />);

    const link = screen.getByRole('link', { name: microSiteLink }) as HTMLAnchorElement;

    expect(screen.getByText(serviceName));
    expect(link.href).toEqual(microSiteLink);
  });

  it('should show the alpha flair', function () {
    render(<GoAHeader
      serviceHome={microSiteLink}
      serviceName={serviceName}
      serviceLevel={ServiceLevel.Alpha} />);

    expect(screen.getByText(ServiceLevel.Alpha, { selector: ".service-level--alpha" }));
  });

  it('should show beta flair', function () {
    render(<GoAHeader
      serviceHome={microSiteLink}
      serviceName={serviceName}
      serviceLevel={ServiceLevel.Beta} />);

    expect(screen.getByText(ServiceLevel.Beta, { selector: ".service-level--beta" }));
  });

  it('should show live flair', function () {
    render(<GoAHeader
      serviceHome={microSiteLink}
      serviceName={serviceName}
      serviceLevel={ServiceLevel.Live} />);

    // This text is actually there, just hidden
    expect(screen.getByText(ServiceLevel.Live, { selector: ".service-level--live" }));
  });
});
