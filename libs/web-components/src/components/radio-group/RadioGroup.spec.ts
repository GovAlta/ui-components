import '@testing-library/jest-dom';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/svelte';
import { triggerAsyncId } from 'async_hooks';
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
      const input = radio.querySelector('input');
      expect(input).toHaveAttribute("name", "favcolor");
    }
  });

  it('should handle the events', async () => {
    const items = ["red", "blue", "orange"];
    const baseElement = render(GoARadioGroup, {
      name: 'favcolor',
      value: 'orange',
      testid: 'test-id',
      items,
    });

    const radioGroup = await baseElement.findByTestId('test-id');
    const orange = radioGroup.querySelector<HTMLInputElement>('input[type=radio][value=orange]');
    const red = radioGroup.querySelector<HTMLInputElement>('input[type=radio][value=red]');

    // initial state
    expect(red.checked).toBe(false);
    expect(orange.checked).toBe(true);

    fireEvent.click(red)
    expect(red.checked).toBe(true);
    expect(orange.checked).toBe(false);
  });
});
