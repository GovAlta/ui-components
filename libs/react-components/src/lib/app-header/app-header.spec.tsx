import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { GoAAppHeader } from './app-header';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

describe.skip('GoAAppHeaderComponent', () => {
  it('should render', () => {
    const { baseElement } = render(
      <GoAAppHeader
        isProdEnvironment={false}
        environment='test'
        version="1.0" />);

    const badge = screen.findByTestId('badge-test');
    expect(badge).toBeTruthy();
  });

  it('should close the window when the x is clicked', () => {
    const environment = "test";
    const version = "1.0";

    const content = screen.findByTestId('content-wrapper');
    expect(content).toBeTruthy();

    const { baseElement } = render(<GoAAppHeader
      isProdEnvironment={false}
      environment={environment}
      version={version} />);

    expect(screen.queryByTestId('content-wrapper')).toBeInTheDocument();

    const closeButton = screen.getByTestId('close');
    userEvent.click(closeButton);

    expect(screen.queryByTestId('content-wrapper')).not.toBeInTheDocument();
  });
});
