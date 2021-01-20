window.MutationObserver = MutationObserver
import { render, screen, fireEvent } from '@testing-library/vue';
import RadioGroup from './radioGroup.vue';

describe('Goa Vue Radio Buttons', () => {
  const baseMockData = {
    title: 'mock title',
    helperText: 'mock helper text',
    disabled: false,
    labelPosition: 'after',
    required: true,
    requiredErrorMessage: 'mock required error message',

    radios: [
      { text: 'Apples', value: 'apples' },
      { text: 'Oranges', value: 'oranges' },
      { text: 'Bananas', value: 'bananas' },
    ],
  };


  test('should render the Vue Radio Buttons Title and HelperText', () => {
    const { baseElement } = render(RadioGroup, {
      props: { title: baseMockData.title,
               helperText: baseMockData.helperText,
               items: baseMockData.radios,
               requiredErrorMessage: baseMockData.requiredErrorMessage }
    });

    expect(baseElement).toBeTruthy();
    expect(screen.queryAllByText(baseMockData.title));
    expect(screen.queryAllByText(baseMockData.helperText));
  });

  describe('Is Required', () => {
    beforeEach(() => {
      render(RadioGroup, {
        props: { title: baseMockData.title,
                 helperText: baseMockData.helperText,
                 items: baseMockData.radios,
                 requiredErrorMessage: baseMockData.requiredErrorMessage,
                 required: true }
      });
    });

    test('should render required indicator', () => {
      expect(screen.queryByText('(Required)')).not.toBeNull();
    });

    test('should render required error message when not selected', () => {
      expect(screen.queryByText(baseMockData.requiredErrorMessage)).not.toBeNull();
    });

    test('should not render required error message when is selected', async () => {
      const radios = screen.getAllByRole('radio', {});
      await fireEvent.click(radios[0]);
      expect(screen.queryByText(baseMockData.requiredErrorMessage)).toBeNull();
    });
  });

  describe('Is Not Required Tests', () => {
    beforeEach(() => {
      render(RadioGroup, {
        props: { title: baseMockData.title,
                helperText: baseMockData.helperText,
                items: baseMockData.radios,
                required: false }
      });
    });

    test('should not render required indicator', () => {
      expect(screen.queryByText('(Required)')).toBeNull();
    });

    test('should not render required error message when not selected', async () => {
      const orangesRadioControl = screen.getByText('Oranges');

      await fireEvent.click(orangesRadioControl);
      expect(screen.queryByText(baseMockData.requiredErrorMessage)).toBeNull();
    });

    test('should not render red radios when not selected', () => {
      const onScreenRadios = document.querySelectorAll('.goa-radio');

      onScreenRadios.forEach((r) => {
        expect(r.classList).not.toContain('has-error');
      });
    });

  });

  describe('Initial data', () => {
    const selectedValue = 'oranges';

    beforeEach(() => {
      render(RadioGroup, {
        props: { title: baseMockData.title,
                helperText: baseMockData.helperText,
                items: baseMockData.radios,
                required: false,
                value: selectedValue }
      });
    });

    test('initial data is set',  () => {
      const radios = document.querySelectorAll<HTMLInputElement>(
        'input[type=radiox]'
      );
      radios.forEach((radio) => {
        expect(radio.checked).toBe(radio.value === selectedValue);
      });
    });
  });

  describe('Selection Change Tests', () => {
    const selectedValue = 'oranges';

    beforeEach(() => {
      render(RadioGroup, {
        props: { title: baseMockData.title,
                helperText: baseMockData.helperText,
                items: baseMockData.radios,
                required: false,
                value: selectedValue }
      });
    });

    test('change event should work', async () => {
      const radios = screen.getAllByRole('radio', {});
      await fireEvent.click(radios[0]);
      const checked = <HTMLInputElement>screen.getByRole('radio', { checked: true });
      expect(checked.value).toBe('apples');
    });
  });
});
