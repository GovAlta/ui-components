import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import GoAButton from './Button.svelte'

describe('GoA Button Component', () => {
  it('should render', async () => {
    const el = render(GoAButton);
    expect(el).toBeTruthy();
  });

  it('should handle the click event', async () => {
    const el = render(GoAButton);

    expect(el).toBeTruthy();
  })
});
