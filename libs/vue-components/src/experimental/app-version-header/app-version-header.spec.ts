import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import GoAAppVersionHeader from './app-version-header.vue';
import userEvent from '@testing-library/user-event';

describe('GoAAppVersionHeaderComponent', () => {
  it('should render', async () => {
    await render(GoAAppVersionHeader, {
      props: { isProdEnvironment: false, environment: 'test', version: "1.0" }
    });

    const content = screen.findByTestId('content-wrapper');
    expect(content).toBeTruthy();
  });

  it('should close the window when the x is clicked', async () => {
    const environment = "test";
    const version = "1.0";

    const content = screen.findByTestId('content-wrapper');
    expect(content).toBeTruthy();

    await render(GoAAppVersionHeader, {
      props: { isProdEnvironment: false, environment: environment, version: version }
    });

    expect(screen.queryByTestId('content-wrapper')).toBeInTheDocument();

    const closeButton = screen.queryByTestId('close');

    userEvent.click(closeButton);

    setTimeout(() => {
      expect(screen.queryByTestId('content-wrapper')).not.toBeInTheDocument();
    }, 1)
  });
});

