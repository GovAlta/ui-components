import React from 'react';
import {render } from '@testing-library/react';
import GoAServiceLevelHeader, { ServiceLevel } from './service-level-header';
import "goa-web-components";

describe('Header', () => {
  it('should show the all the flairs', async function () {
    ['alpha', 'beta', 'live'].forEach(async (mode: ServiceLevel) => {
      render(<GoAServiceLevelHeader level={mode} />);
        const el = document.querySelector('goa-service-level-header');
        expect(el).not.toBeNull();
        expect(el.getAttribute('level')).toEqual('alpha');
    })
  });
});
