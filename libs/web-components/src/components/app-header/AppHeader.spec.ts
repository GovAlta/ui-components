import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import GoABadge from './AppHeader.svelte'

describe('GoAAppHeader', () => {
  it('should render', async () => {
    const baseElement = render(GoABadge, { testid: "app-header-test", url: "www.test.com", heading: 'Complete' });
    const appHeader = await baseElement.findByTestId('app-header-test');
    const link = appHeader.firstElementChild;

    expect(appHeader).toBeTruthy();
    expect(link).toBeTruthy();
    expect(link).toHaveAttribute("href", "www.test.com");
    expect(appHeader).toContainHTML("Complete")
  });
});
