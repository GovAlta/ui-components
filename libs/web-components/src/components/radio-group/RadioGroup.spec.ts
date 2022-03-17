import '@testing-library/jest-dom';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/svelte';
import GoARadioGroup from './RadioGroupWrapper.test.svelte';

afterEach(cleanup);

describe('GoARadioGroup Component', () => {

  it('should render', async () => {
    const items = ["red", "blue", "orange"];
    const baseElement = render(GoARadioGroup, {
      name: 'favcolor',
      value: 'orange',
      testid: 'test-id',
      items,
    });

    const radioGroup = await baseElement.findByTestId('test-id');
    for (const item of items) {
      const radio = radioGroup.querySelector(`[data-testid=radio-item-${item}]`);
      expect(radio).toBeTruthy();
      expect(radio).toHaveAttribute("name", "favcolor");
      expect(radio).toHaveAttribute("label", item);
    }
  });

  it.skip('should handle the events', async () => {
    const items = ["red", "blue", "orange"];
    const baseElement = render(GoARadioGroup, {
      name: 'favcolor',
      value: 'orange',
      testid: 'test-id',
      items,
    });

    const radioGroup = await baseElement.findByTestId('test-id');

    const radios = radioGroup.querySelectorAll<HTMLInputElement>('input[type=radio]');
    // FIX: the elements within the shadow DOM are not able to be referenced making it impossible to test the events
    console.log("Radio Group", radioGroup, radioGroup.shadowRoot.querySelectorAll('input[type=radio]')); // shadow root is null
    console.log("Shadow Root", radios[0].shadowRoot) // radios[0] is null

  });
});
