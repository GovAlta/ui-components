import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';

import GoABadge from './Badge.svelte'

describe('GoAAppVersionHeaderComponent', () => {
  it('should render', async () => {
    const baseElement = render(GoABadge, { testId: "badge-test", type: "success", icon: "true", content: 'Complete' });

    const badge = await baseElement.findByTestId('badge-test');
    expect(badge).toBeTruthy();
    expect(badge).toHaveClass("badge-success");
    expect(badge).toContainHTML("Complete")
  });
});
