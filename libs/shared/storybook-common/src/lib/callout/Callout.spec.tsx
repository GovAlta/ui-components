import React from 'react';
import { render } from '@testing-library/react';

import { Callout } from './Callout';

describe('Callout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Callout positive={true} content={'Test'} />);
    expect(baseElement).toBeTruthy();
  });
  
  it('positive render Do', () => {
    const { getByText } = render(<Callout positive={true} content={'Test'} />);
    expect(getByText('Do')).toBeTruthy();
  });

  it(`negative render Don't`, () => {
    const { getByText } = render(<Callout positive={false} content={'Test'} />);
    expect(getByText(`Don't`)).toBeTruthy();
  });
    
  it('render content', () => {
    const { getByText } = render(<Callout positive={true} content={'Test'} />);
    expect(getByText('Test')).toBeTruthy();
  });
});
