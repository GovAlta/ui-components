import React from 'react';
import { render } from '@testing-library/react';

import DoDont from './DoDont';

describe(' DoDont', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DoDont />);
    expect(baseElement).toBeTruthy();
  });
});
