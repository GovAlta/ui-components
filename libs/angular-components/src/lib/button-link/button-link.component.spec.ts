import { render, screen, fireEvent } from '@testing-library/angular';
import { GoAButtonLinkComponent } from './button-link.component';

describe('GoA Button Link', () => {
  const buttonTitle = 'Test Title';
  const buttonClassName = 'goa-link-button';
  const buttonSmallClassName = 'btn-small';

  test('should render content', async () => {
    await render(GoAButtonLinkComponent, {
      template: `<a href='test' goa-button linkType='up'>${buttonTitle}</a>`,
    });

    expect(screen.getByText(buttonTitle))
  });

  test('should render link-button styling', async () => {
    await render(GoAButtonLinkComponent, {
      template: `<a href='test' goa-button linkType='up'>${buttonTitle}</a>`,
    });
    
    const button = screen.getByRole('link');
    expect(button.className).toContain(buttonClassName);
  });

  test('linkType="up" should render up styling', async () => {
    await render(GoAButtonLinkComponent, {
      template: `<a href='test' goa-button linkType='up'>${buttonTitle}</a>`,
    });
    
    const button = screen.getByRole('link');
    expect(button.className).toContain('up-arrow');
  });

  test('linkType="right" should render right styling', async () => {
    await render(GoAButtonLinkComponent, {
      template: `<a href='test' goa-button linkType='right'>${buttonTitle}</a>`,
    });
    
    const button = screen.getByRole('link');
    expect(button.className).toContain('right-arrow');
  });

  test('buttonSize=small should render small styling', async () => {
    await render(GoAButtonLinkComponent, {
      template: `<a href='test' goa-button buttonSize='small' linkType='up'>${buttonTitle}</a>`,
    });

    const button = screen.getByRole('link');
    expect(button.className).toContain(buttonSmallClassName);
  });

  test('buttonSize unset should render no small styling', async () => {
    await render(GoAButtonLinkComponent, {
      template: `<a href='test' goa-button linkType='up'>${buttonTitle}</a>`,
    });

    const button = screen.getByRole('link');
    expect(button.className).not.toContain(buttonSmallClassName);
  });
});