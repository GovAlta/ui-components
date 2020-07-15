import React from 'react';
import { render } from '@testing-library/react';

import { DoDont } from './DoDont';

describe('DoDont', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DoDont dos={"Test do's"} donts={"Test dont's"} />);
    expect(baseElement).toBeTruthy();
  });

  it(`should render both do's and dont's` , () => {
    const { getByText } = render(<DoDont dos={"Test do's"} donts={"Test dont's"} />);
    expect(getByText(`Test do's`)).toBeTruthy();
    expect(getByText(`Test dont's`)).toBeTruthy();
  });
});
