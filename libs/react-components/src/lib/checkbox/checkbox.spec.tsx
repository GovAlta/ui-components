import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import GoACheckbox from './checkbox';

describe('GoA Checkbox', () => {
  const label = 'label test';

  it('should render label', () => {
    render(<GoACheckbox>{label}</GoACheckbox>);

    expect(screen.getByText(label)).not.toBeNull();
  });

  test('should render checkmark svg when checked', async () => {
    render(<GoACheckbox checked={false}>{label}</GoACheckbox>);

    userEvent.click(screen.getByText(label));

    const checkmark = document.getElementById('checkmark');
    const dashmark = document.getElementById('dashmark');

    expect(checkmark).not.toBeNull();
    expect(dashmark).toBeNull();
  });

describe('Indeterminate', () => {
  test('should render dash svg when checked is true', () => {
    render(<GoACheckbox checked={true} indeterminate={true} />);

    const checkmark = document.getElementById('checkmark');
    const dashmark = document.getElementById('dashmark');

    expect(dashmark).not.toBeNull();
    expect(checkmark).toBeNull();
  });

  test('should render dash svg when checked is false', () => {
    render(<GoACheckbox checked={false} indeterminate={true} />);

    const checkmark = document.getElementById('checkmark');
    const dashmark = document.getElementById('dashmark');

    expect(dashmark).not.toBeNull();
    expect(checkmark).toBeNull();
  });

  test('buttonSize=small should render small styling', () => {
    render(<GoACheckbox
      buttonType='tertiary'
      buttonSize='small'
      content={buttonTitle}
    />);


    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonSmallClassName);
  });

  test('buttonSize unset should render no small styling', () => {
    render(<GoACheckbox
      buttonType='tertiary'
      content={buttonTitle}
    />);

    const button = screen.getByRole('button');
    expect(button.className).not.toContain(buttonSmallClassName);
  });

  test('tooltip is set to button title', () => {
    render(<GoACheckbox
      buttonType='tertiary'
      content={buttonTitle}
      tooltip={buttonTooltip}
    />);

    const button = screen.getByRole('button');
    expect(button.title).toContain(buttonTooltip);
  });
  
  test('responds to events', () => {
    const onClickStub = jest.fn()
    render(<GoACheckbox
      data-testid="goaButton"
      buttonType='tertiary'
      content={buttonTitle}
      onClick={onClickStub}
    />);
    const button = screen.getByTestId('goaButton');
    userEvent.click(button)
    expect(onClickStub).toHaveBeenCalled
  });

});
