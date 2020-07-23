import { render, screen, fireEvent } from '@testing-library/angular';
import { GoAButtonComponent } from './button.component';

describe('Goa Button', () => {
  const buttonTitle = 'Test Title';
  const buttonClassName = 'goa-button';
  const buttonSecondaryClassName = 'goa--secondary';
  const buttonTertiaryClassName = 'goa--tertiary';

  test('should render title', async () => {
    await render(GoAButtonComponent, {
      componentProperties: { title: buttonTitle },
    });

    expect(screen.getByText(buttonTitle))
  });

  test('buttonType=primary should render primary styling', async () => {
    await render(GoAButtonComponent, {
      componentProperties: { buttonType: 'primary', title: buttonTitle },
    });  
    
    const button = screen.getByText(buttonTitle);
    expect(button.className).toContain(buttonClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  test('buttonType=secondary should render secondary styling', async () => {
    await render(GoAButtonComponent, {
      componentProperties: { buttonType: 'secondary', title: buttonTitle },
    });   

    const button = screen.getByText(buttonTitle);
    expect(button.className).toContain(buttonClassName);
    expect(button.className).toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  test('buttonType=tertiary should render tertiary styling', async () => {
    await render(GoAButtonComponent, {
      componentProperties: { buttonType: 'tertiary', title: buttonTitle },
    });   

    const button = screen.getByText(buttonTitle);
    expect(button.className).toContain(buttonClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).toContain(buttonTertiaryClassName);
  });
});