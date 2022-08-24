import '@testing-library/jest-dom';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/svelte';
import GoARadioGroup from './RadioGroupWrapper.test.svelte';

afterEach(() => {
  cleanup()
  jest.clearAllMocks();
});

describe('GoARadioGroup Component', () => {

  it('should render', async () => {
    const items = ["red", "blue", "orange"];
    const result = render(GoARadioGroup, {
      name: 'favcolor',
      value: 'orange',
      testid: 'test-id',
      items,
    });

    await waitFor(() => {
      for (const item of items) {
        const radio = result.queryByTestId(`radio-option-${item}`);
        expect(radio).toBeTruthy();
        const input = radio.querySelector('input');
        expect(input).toHaveAttribute("name", "favcolor");
      }
    })
  });

  it("raise an error if name is not supplied", () => {
    jest.spyOn(console, "error");
    const items = ["red", "blue", "orange"];
    render(GoARadioGroup, {
      items,
    });

    expect(console.error["mock"].calls.length).toBe(4);  // 4 = 1 parent + 3 chilren
  });

  it('should handle the events', async () => {
    const items = ["red", "blue", "orange"];
    const result = render(GoARadioGroup, {
      name: 'favcolor',
      value: 'orange',
      testid: 'test-id',
      items,
    });

    const radioGroup = await result.findByTestId('test-id');

    // initial state
    await waitFor(() => {
      const orange = radioGroup.querySelector<HTMLInputElement>('input[type=radio][value=orange]');
      const red = radioGroup.querySelector<HTMLInputElement>('input[type=radio][value=red]');
      expect(red.checked).toBe(false);
      expect(orange.checked).toBe(true);

      fireEvent.click(red)
      expect(red.checked).toBe(true);
      expect(orange.checked).toBe(false);
    });
  });
});
