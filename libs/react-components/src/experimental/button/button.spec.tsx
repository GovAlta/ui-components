import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import GoAButton from './button';

describe('GoA Button', () => {
  const buttonText = 'Test Title';
  const buttonPrimaryClassName = 'goa-button--primary';
  const buttonSecondaryClassName = 'goa-button--secondary';
  const buttonTertiaryClassName = 'goa-button--tertiary';
  const buttonSmallClassName = 'goa-button--small';
  const buttonTitle = 'hovering';

  it('should render content', () => {
    const { baseElement } = render(<GoAButton onClick={() => {}} type='primary' size='medium'>{buttonText}</GoAButton>);

    expect(baseElement).toBeTruthy();
    expect(screen.getByText(buttonText));
  });

  test('type=primary should render primary styling', () => {
    render(<GoAButton onClick={() => {}} type='primary' size='medium'>{buttonText}</GoAButton>);

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonPrimaryClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  test('type=secondary should render secondary styling', () => {
    render(<GoAButton onClick={() => {}} type='secondary'>{buttonText}</GoAButton>);

    const button = screen.getByRole('button');
    expect(button.className).not.toContain(buttonPrimaryClassName);
    expect(button.className).toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  test('type=tertiary should render tertiary styling', () => {
    render(<GoAButton onClick={() => {}} type='tertiary'>{buttonText}</GoAButton>);

    const button = screen.getByRole('button');
    expect(button.className).not.toContain(buttonPrimaryClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).toContain(buttonTertiaryClassName);
  });

  test('size=small should render small styling', () => {
    render(<GoAButton onClick={() => {}} type='tertiary' size='small'>{buttonText}</GoAButton>);

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonSmallClassName);
  });

  test('size unset should render no small styling', () => {
    render(<GoAButton onClick={() => {}} type='tertiary'>{buttonText}</GoAButton>);

    const button = screen.getByRole('button');
    expect(button.className).not.toContain(buttonSmallClassName);
  });

  test('title is set to button title', () => {
    render(<GoAButton onClick={() => {}} type='tertiary' title={buttonTitle}>{buttonText}</GoAButton>);

    const button = screen.getByRole('button');
    expect(button.title).toContain(buttonTitle);
  });

  test('responds to events', () => {
    const onClickStub = jest.fn()
    render(<GoAButton onClick={() => {}} data-testid="goaButton"  type='tertiary' onClick={onClickStub}>{buttonText}</GoAButton>);
    const button = screen.getByTestId('goaButton');
    userEvent.click(button)
    expect(onClickStub).toHaveBeenCalled()
  });

});
