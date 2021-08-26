import React from 'react';
import { render } from '@testing-library/react';

import {GoAPageLoader} from './page-loader'

describe('PageLoader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GoAPageLoader
      visible={true}
      message='Loading...'
    />);
    expect(baseElement).toBeTruthy();
  });
});
