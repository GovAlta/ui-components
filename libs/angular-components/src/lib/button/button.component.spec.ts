import { render, screen, fireEvent } from '@testing-library/angular';
import { GoAButtonComponent } from './button.component';

describe('GoA Button', () => {
  const buttonTitle = 'Test Title';
  const buttonClassName = 'goa-button';
  const buttonSecondaryClassName = 'goa--secondary';
  const buttonTertiaryClassName = 'goa--tertiary';
  const buttonSmallClassName = 'btn-small';

  test('should render content', async () => {
    await render(GoAButtonComponent, {
      template: `<button data-testid='testid' goa-button buttonType='primary'>${buttonTitle}</button>`,
    });

    expect(screen.getByText(buttonTitle));
  });

  test('buttonType=primary should render primary styling', async () => {
    await render(GoAButtonComponent, {
      template: `<button data-testid='testid' goa-button buttonType='primary'>${buttonTitle}</button>`,
    });

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  test('buttonType=secondary should render secondary styling', async () => {
    await render(GoAButtonComponent, {
      template: `<button data-testid='testid' goa-button buttonType='secondary'>${buttonTitle}</button>`,
    });

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  test('buttonType=tertiary should render tertiary styling', async () => {
    await render(GoAButtonComponent, {
      template: `<button data-testid='testid' goa-button buttonType='tertiary'>${buttonTitle}</button>`,
    });

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).toContain(buttonTertiaryClassName);
  });

  test('buttonSize=small should render small styling', async () => {
    await render(GoAButtonComponent, {
      template: `<button goa-button buttonType='tertiary' buttonSize='small'>${buttonTitle}</button>`,
    });

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonSmallClassName);
  });

  test('buttonSize unset should render no small styling', async () => {
    await render(GoAButtonComponent, {
      template: `<button goa-button buttonType='tertiary'>${buttonTitle}</button>`,
    });

    const button = screen.getByRole('button');
    expect(button.className).not.toContain(buttonSmallClassName);
  });
});
