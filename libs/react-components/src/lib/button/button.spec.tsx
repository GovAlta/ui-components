import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import GoAButton from './button';

describe('GoA Button', () => {
  const buttonTitle = 'Test Title';
  const buttonClassName = 'goa-button';
  const buttonSecondaryClassName = 'goa--secondary';
  const buttonTertiaryClassName = 'goa--tertiary';
  const buttonSmallClassName = 'btn-small';
  const buttonTooltip = 'hovering';

  it('should render content', () => {
    const { baseElement } = render(<GoAButton
      buttonType='primary'
      buttonSize='normal'
      content={buttonTitle}
    />);

    expect(baseElement).toBeTruthy();

    expect(screen.getByText(buttonTitle));
  });

  test('buttonType=primary should render primary styling', () => {
    render(<GoAButton
      buttonType='primary'
      buttonSize='normal'
      content={buttonTitle}
    />);


    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  test('buttonType=secondary should render secondary styling', () => {
    render(<GoAButton
      buttonType='secondary'
      content={buttonTitle}
    />);

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  test('buttonType=tertiary should render tertiary styling', () => {
    render(<GoAButton
      buttonType='tertiary'
      content={buttonTitle}
    />);

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).toContain(buttonTertiaryClassName);
  });

  test('buttonSize=small should render small styling', () => {
    render(<GoAButton
      buttonType='tertiary'
      buttonSize='small'
      content={buttonTitle}
    />);


    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonSmallClassName);
  });

  test('buttonSize unset should render no small styling', () => {
    render(<GoAButton
      buttonType='tertiary'
      content={buttonTitle}
    />);

    const button = screen.getByRole('button');
    expect(button.className).not.toContain(buttonSmallClassName);
  });

  test('tooltip is set to button title', () => {
    render(<GoAButton
      buttonType='tertiary'
      content={buttonTitle}
      tooltip={buttonTooltip}
    />);

    const button = screen.getByRole('button');
    expect(button.title).toContain(buttonTooltip);
  });

  test('responds to events', () => {
    const onClickStub = jest.fn()
    render(<GoAButton
      data-testid="goaButton"
      buttonType='tertiary'
      content={buttonTitle}
      onClick={onClickStub}
    />);
    const button = screen.getByTestId('goaButton');
    userEvent.click(button)
    expect(onClickStub).toHaveBeenCalled()
  });

});
