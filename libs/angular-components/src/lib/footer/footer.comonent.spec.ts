import { render, screen, fireEvent } from '@testing-library/angular';
import { GoAFooterComponent } from './footer.component';

describe('Goa Button', () => {
  const serviceName = 'DIO service';

  test('should render f', async () => {
    await render(GoAFooterComponent, {
      componentProperties: { serviceName: serviceName },
    });

    expect(screen.getByText(serviceName))
    expect(screen.getByText('An official site of the'))
  });

});