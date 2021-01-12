import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { GoARadioGroup, GoARadio } from './radio-group';

describe('RadioGroup', () => {
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

  function getTemplate(data) {
    return (
      <GoARadioGroup
        name="fruits"
        title={data.title}
        helperText={data.helperText}
        disabled={data.disabled}
        labelPosition={data.labelPosition}
        required={data.required}
        value={data.value}
        requiredErrorMessage={data.requiredErrorMessage}
        onChange={() => {}}
      >
        {data.radios.map((radio) => (
          <GoARadio key={radio.value} value={radio.value}>
            {radio.text}
          </GoARadio>
        ))}
      </GoARadioGroup>
    );
  }

  function getDynamicTemplate(data) {
    return (
      <GoARadioGroup
        name="dynamic-fruits"
        title={data.title}
        helperText={data.helperText}
        disabled={data.disabled}
        labelPosition={data.labelPosition}
        required={data.required}
        value={data.value}
        requiredErrorMessage={data.requiredErrorMessage}
        items={data.radios}
        onChange={() => {}}
      />
    );
  }

  describe('Basic rendering', () => {
    let mockData = { ...baseMockData };

    it('should render successfully', async () => {
      const { baseElement } = render(getTemplate(baseMockData));
      expect(baseElement).toBeTruthy();
    });

    it('should render dynamic successfully', async () => {
      const { baseElement } = render(getDynamicTemplate(baseMockData));
      expect(baseElement).toBeTruthy();
    });

    test('should render bound labels', async () => {
      render(getTemplate({ ...mockData, required: true }));

      expect(
        screen.queryByText(mockData.title, { exact: false })
      ).not.toBeNull();
      expect(
        screen.queryByText(mockData.helperText, { exact: false })
      ).not.toBeNull();
      expect(
        screen.queryByText(mockData.requiredErrorMessage, { exact: false })
      ).not.toBeNull();
    });

    test('should render dynamic bound labels', async () => {
      render(getDynamicTemplate(mockData));

      expect(
        screen.queryByText(mockData.title, { exact: false })
      ).not.toBeNull();
      expect(
        screen.queryByText(mockData.helperText, { exact: false })
      ).not.toBeNull();
      expect(
        screen.queryByText(mockData.requiredErrorMessage, { exact: false })
      ).not.toBeNull();
    });
  });

  describe('Is Required Tests', () => {
    let mockData;
    beforeEach(() => {
      mockData = { ...baseMockData, required: true };
    });

    test('should render required indicator', async () => {
      render(getTemplate(mockData));
      expect(screen.queryByText('(Required)')).not.toBeNull();
    });

    test('should render required error message when not selected', async () => {
      render(getTemplate(mockData));
      expect(screen.queryByText(mockData.requiredErrorMessage)).not.toBeNull();
    });

    test('should not render required error message when is selected', async () => {
      render(getTemplate(mockData));

      const orangesRadioControl = screen.getByText('Oranges');
      fireEvent.click(orangesRadioControl);

      expect(screen.queryByText(mockData.requiredErrorMessage)).toBeNull();
    });

    test('should render red radios when not selected', async () => {
      render(getTemplate(mockData));
      const onScreenRadios = document.querySelectorAll('.goa-radio');

      onScreenRadios.forEach((r) => {
        expect(r.classList).toContain('has-error');
      });
    });
  });

  describe('Is Not Required Tests', () => {
    let mockData;
    beforeEach(() => {
      mockData = { ...baseMockData, required: false };
    });

    test('should not render required indicator', async () => {
      render(getTemplate(mockData));
      expect(screen.queryByText('(Required)')).toBeNull();
    });

    test('should not render required error message when not selected', async () => {
      render(getTemplate(mockData));
      expect(screen.queryByText(mockData.requiredErrorMessage)).toBeNull();
    });

    test('should not render red radios when not selected', async () => {
      render(getTemplate(mockData));
      const onScreenRadios = document.querySelectorAll('.goa-radio');

      onScreenRadios.forEach((r) => {
        expect(r.classList).not.toContain('has-error');
      });
    });
  });

  describe('Initial data', () => {
    const selectedValue = 'oranges';

    let mockData;
    beforeEach(() => {
      mockData = { ...baseMockData, value: selectedValue };
    });

    test('initial data is set', async () => {
      render(getTemplate(mockData));

      const radios = document.querySelectorAll<HTMLInputElement>(
        'input[type=radio]'
      );
      radios.forEach((radio) => {
        expect(radio.checked).toBe(radio.value === selectedValue);
      });
    });
  });

  describe('Selection Change Tests', () => {
    const selectedValue = 'oranges';

    let mockData;
    beforeEach(() => {
      mockData = { ...baseMockData, value: selectedValue };
    });

    test('change event should work', async () => {
      render(getTemplate(mockData));

      const radios = screen.getAllByRole('radio', {});
      fireEvent.click(radios[0]);

      const checked = screen.getByRole('radio', { checked: true }) as HTMLInputElement;
      expect(checked.value).toBe('apples');
    });
  });
});
