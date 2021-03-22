import React from 'react';
import { render } from '@testing-library/react';
import { GoABadge } from './badge.component';

describe('GoA Badge', () => {

  it('should render', () => {
    const { baseElement } = render(<GoABadge type='information' content="Text Content" />);

    expect(baseElement).toBeTruthy();
  });
});
