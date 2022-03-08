import React from 'react';
import { render } from '@testing-library/react';
import GoAServiceLevelHeader, { ServiceLevel } from './service-level-header';

describe('Header', () => {
  ['alpha', 'beta', 'live'].forEach((mode: ServiceLevel) => {
    it('should show the all the flairs', async function () {
      render(<GoAServiceLevelHeader level={mode} />);
      const el = document.querySelector('goa-service-level-header');
      expect(el).not.toBeNull();
      expect(el.getAttribute('level')).toEqual(mode);
    })
  });

  it('should show the all the flairs', async function () {
    render(<GoAServiceLevelHeader level="alpha" version="v1.2.3" />);
    const el = document.querySelector('goa-service-level-header');
    expect(el.getAttribute('version')).toEqual('v1.2.3');
  });
});
