import { render, screen, fireEvent } from '@testing-library/angular';
import { GoAFooterComponent } from './footer.component';

describe('GoA footer', () => {
  const serviceName = 'DIO service';

  test('should render footer', async () => {
    await render(GoAFooterComponent, {
      componentProperties: { serviceName: serviceName },
    });

    const footerLogo = screen.findByTestId('goa-footer-logo');
    const footerTopBar = screen.findByTestId('goa-footer-top-bar');

    expect(screen.getByText(serviceName))
    expect(screen.getByText('An official site of the'))
    expect((await footerLogo).className).toContain('logo')
    expect((await footerTopBar).className).toContain('top-bar')
  });

});