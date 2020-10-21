import React from 'react';
import { render } from '@testing-library/react';

import Callout from './callout';

describe('Callout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Callout
      type='information'
      title='Callout Title'
      content='Information to the user goes in the content. Information can include markup as desired.'
    />);
    expect(baseElement).toBeTruthy();
  });
});
