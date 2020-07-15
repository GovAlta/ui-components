import React from 'react';
import { render } from '@testing-library/react';

import { DoDont } from './DoDont';

describe(' DoDont', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DoDont dos={"Test do's"} donts={"Test dont's"} />);
    expect(baseElement).toBeTruthy();
  });
});
