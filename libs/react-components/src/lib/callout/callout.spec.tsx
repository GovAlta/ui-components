import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom'
import GoACallout from './callout';

describe('Callout', () => {
  test('Callout shall render', async () => {
    render(<GoACallout
      type='information'
      title='Callout Title'
      content='Information to the user goes in the content. Information can include markup as desired.'
    />);
    const titleEl = await screen.getByTestId('callout-title')
    expect(titleEl.textContent).toEqual('Callout Title')
    const messageEl = await screen.getByTestId('callout-content')
    expect(messageEl.textContent).toContain('Information');
  });
});
