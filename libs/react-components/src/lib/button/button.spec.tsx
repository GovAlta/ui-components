import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import GoAButton from './button';

describe('GoA Button', () => {
  const buttonText = 'Test Title';
  const buttonClassName = 'goa-button';
  const buttonSecondaryClassName = 'goa--secondary';
  const buttonTertiaryClassName = 'goa--tertiary';
  const buttonSmallClassName = 'btn-small';
  const buttonTitle = 'hovering';

  it('should render content', () => {
    const { baseElement } = render(<GoAButton buttonType='primary' buttonSize='normal'>{buttonText}</GoAButton>);

    expect(baseElement).toBeTruthy();
    expect(screen.getByText(buttonText));
  });

  test('buttonType=primary should render primary styling', () => {
    render(<GoAButton buttonType='primary' buttonSize='normal'>{buttonText}</GoAButton>);

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  test('buttonType=secondary should render secondary styling', () => {
    render(<GoAButton buttonType='secondary'>{buttonText}</GoAButton>);

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  test('buttonType=tertiary should render tertiary styling', () => {
    render(<GoAButton buttonType='tertiary'>{buttonText}</GoAButton>);

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).toContain(buttonTertiaryClassName);
  });

  test('buttonSize=small should render small styling', () => {
    render(<GoAButton buttonType='tertiary' buttonSize='small'>{buttonText}</GoAButton>);


    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonSmallClassName);
  });

  test('buttonSize unset should render no small styling', () => {
    render(<GoAButton buttonType='tertiary'>{buttonText}</GoAButton>);

    const button = screen.getByRole('button');
    expect(button.className).not.toContain(buttonSmallClassName);
  });

  test('title is set to button title', () => {
    render(<GoAButton buttonType='tertiary' title={buttonTitle}>{buttonText}</GoAButton>);

    const button = screen.getByRole('button');
    expect(button.title).toContain(buttonTitle);
  });

  test('responds to events', () => {
    const onClickStub = jest.fn()
    render(<GoAButton data-testid="goaButton" buttonType='tertiary' onClick={onClickStub}>{buttonText}</GoAButton>);
    const button = screen.getByTestId('goaButton');
    userEvent.click(button)
    expect(onClickStub).toHaveBeenCalled()
  });

});
