import React from 'react';
import { render } from '@testing-library/react';
import GoACard from './container';

describe('GoA Card', () => {
  const title = 'My Card title';

  it('should render title', () => {
    const { baseElement } = render(
      <GoACard type="primary" title={title} />
    );

    expect(baseElement).toBeTruthy();
  });
});
