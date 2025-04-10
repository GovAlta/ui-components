import { render } from '@testing-library/svelte';
import FooterMetaSectionWrapper from './FooterMetaSectionWrapper.test.svelte';
import { fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom';
describe('FooterMetaSection', () => {
  it('should display and handle link clicks correctly', async () => {
    const { getByTestId, getByText } = render(FooterMetaSectionWrapper);

    const link1 = getByText('Link 1');
    const link2 = getByTestId('specialClick');
    expect(link1).toBeTruthy();
    expect(link2).toBeTruthy();
    await fireEvent.click(link2);
    await fireEvent.click(link2);
    const clickedText = getByTestId('link-is-clicked');
    expect(clickedText).toHaveTextContent('Link 2 clicked');
  });
});
