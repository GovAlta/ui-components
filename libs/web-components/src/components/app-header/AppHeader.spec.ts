import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import GoABadge from './AppHeader.svelte'

describe('GoAAppHeaderComponent', () => {
  it('should render - success', async () => {
    const baseElement = render(GoABadge, { testId: "app-header-test", url: "www.test.com", title: 'Complete' });
    const appHeader = await baseElement.findByTestId('app-header-test');
    const link = appHeader.firstElementChild;

    expect(appHeader).toBeTruthy();
    expect(link).toBeTruthy();
    expect(link).toHaveAttribute("href","www.test.com");
    expect(appHeader).toContainHTML("Complete")
  });
});
