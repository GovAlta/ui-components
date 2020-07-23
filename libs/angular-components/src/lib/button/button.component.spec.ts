import { render, screen, fireEvent } from '@testing-library/angular';
import { GoAButtonComponent } from './button.component';

describe('Goa Button', () => {
  test('should render title', async () => {
    await render(GoAButtonComponent, {
      componentProperties: { title: 'Test Title' },
    });

    expect(screen.getByText('Test Title'))
  });

  test('buttonType=primary should render primary styling', async () => {
    await render(GoAButtonComponent, {
      componentProperties: { buttonType: 'primary', title: 'Test Title' },
    });  
    
    const button = screen.getByText('Test Title');
    expect(button.className).toContain('goa-button');
    expect(button.className).not.toContain('goa--secondary');
    expect(button.className).not.toContain('goa--tertiary');
  });

  test('buttonType=secondary should render secondary styling', async () => {
    await render(GoAButtonComponent, {
      componentProperties: { buttonType: 'secondary', title: 'Test Title' },
    });   

    const button = screen.getByText('Test Title');
    expect(button.className).toContain('goa-button');
    expect(button.className).toContain('goa--secondary');
    expect(button.className).not.toContain('goa--tertiary');
  });

  test('buttonType=tertiary should render tertiary styling', async () => {
    await render(GoAButtonComponent, {
      componentProperties: { buttonType: 'tertiary', title: 'Test Title' },
    });   

    const button = screen.getByText('Test Title');
    expect(button.className).toContain('goa-button');
    expect(button.className).not.toContain('goa--secondary');
    expect(button.className).toContain('goa--tertiary');
  });
});