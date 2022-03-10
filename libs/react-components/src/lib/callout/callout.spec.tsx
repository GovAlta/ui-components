import React from 'react';
import { render } from '@testing-library/react';
import GoACallout from './callout';

describe('Callout', () => {
  test('Callout shall render', async () => {
    const result = render(
      <GoACallout
        type='information'
        title='Callout Title'
      >
        Information to the user goes in the content. Information can include markup as desired.
      </GoACallout>
    );

    const el = result.container.querySelector("goa-callout");
    expect(el.getAttribute('title')).toContain('Callout Title');
    expect(el.getAttribute('type')).toContain('information');
  });
});
