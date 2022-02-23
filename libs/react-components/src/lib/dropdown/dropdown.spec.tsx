import '@testing-library/jest-dom';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { useState } from 'react';
import { GoADropdown, GoADropdownOption } from './dropdown';

afterEach(cleanup);

describe.skip('GoADropdown', () => {
  it('should allow for a single selection', async () => {
    let selectedColors: string[];

    const TestComponent = () => {
      const [colors, setColors] = useState([]);
      const selectColor = (colors: string[]) => {
        setColors(colors);
        selectedColors = colors;
      }
      return (
        <GoADropdown testId="favColor-dropdown" name="favColor" selectedValues={colors} onChange={(_name, value) => selectColor(value)}>
          <GoADropdownOption testId="favColor-dropdown-option--red" name="favColor" label="Red" value="red" />
          <GoADropdownOption testId="favColor-dropdown-option--blue" name="favColor" label="Blue" value="blue" />
          <GoADropdownOption testId="favColor-dropdown-option--yellow" name="favColor" label="Yellow" value="yellow" />
        </GoADropdown>
      )
    };

    const { queryByTestId } = render(<TestComponent />);
    fireEvent.click(queryByTestId('favColor-dropdown'));

    // expect(queryByTestId('favColor-dropdown-background')).toBeInTheDocument();
    expect(queryByTestId('favColor-dropdown-option--red')).toBeInTheDocument();
    expect(queryByTestId('favColor-dropdown-option--blue')).toBeInTheDocument();
    expect(queryByTestId('favColor-dropdown-option--yellow')).toBeInTheDocument();
    fireEvent.click(queryByTestId('favColor-dropdown-option--blue'));
    await waitFor(() => {
      expect(selectedColors).toContain('blue');
    });
  })

  it('should allow for multi-selection', async () => {
    let selectedColors: string[];

    const TestComponent = () => {
      const [colors, setColors] = useState([]);
      const selectColor = (colors: string[]) => {
        setColors(colors);
        selectedColors = colors;
      }
      return (
        <GoADropdown name="favColor" multiSelect={true} selectedValues={colors} onChange={(_name, value) => selectColor(value)}>
          <GoADropdownOption name="favColor" label="Red" value="red" />
          <GoADropdownOption name="favColor" label="Blue" value="blue" />
          <GoADropdownOption name="favColor" label="Yellow" value="yellow" />
        </GoADropdown>
      )
    };

    const { queryByTestId } = render(<TestComponent />);

    fireEvent.click(queryByTestId('favColor-dropdown'));

    expect(queryByTestId('favColor-dropdown-option--red')).toBeInTheDocument();
    expect(queryByTestId('favColor-dropdown-option--blue')).toBeInTheDocument();
    expect(queryByTestId('favColor-dropdown-option--yellow')).toBeInTheDocument();

    fireEvent.click(queryByTestId('favColor-dropdown-option--blue'));
    fireEvent.click(queryByTestId('favColor-dropdown-option--red'));

    await waitFor(() => {
      expect(selectedColors).toContain('blue');
      expect(selectedColors).toContain('red');
    });

    // close
    fireEvent.click(queryByTestId('favColor-dropdown-background'));
    expect(queryByTestId('favColor-dropdown-option--red')).not.toBeInTheDocument();
  })

  it('should show a leading icon', async () => {
    const TestComponent = () => {
      return (
        <GoADropdown leadingIcon="color-wand" name="favColor" multiSelect={true} selectedValues={[]} onChange={() => { }}>
          <GoADropdownOption name="favColor" label="Red" value="red" />
          <GoADropdownOption name="favColor" label="Blue" value="blue" />
          <GoADropdownOption name="favColor" label="Yellow" value="yellow" />
        </GoADropdown>
      )
    };

    const { queryByTestId } = render(<TestComponent />);
    expect(queryByTestId('favColor-dropdown')).toBeInTheDocument();
  })

  it('should allow for autocomplete', async () => {
    let selectedColors: string[];

    const TestComponent = () => {
      const [colors, setColors] = useState([]);
      const selectColor = (colors: string[]) => {
        setColors(colors);
        selectedColors = colors;
      }
      return (
        <GoADropdown name="favColor" autoComplete={true} selectedValues={colors} onChange={(_name, value) => selectColor(value)}>
          <GoADropdownOption name="favColor" label="Red" value="red" />
          <GoADropdownOption name="favColor" label="Blue" value="blue" />
          <GoADropdownOption name="favColor" label="Yellow" value="yellow" />
        </GoADropdown>
      )
    };

    const { queryByTestId } = render(<TestComponent />);

    fireEvent.click(queryByTestId('favColor-dropdown'));

    const filter = queryByTestId('favColor-dropdown-filter');

    waitFor(() => {
      expect(filter).toBeInTheDocument();
      expect(queryByTestId('favColor-dropdown-option--red')).toBeInTheDocument();
      expect(queryByTestId('favColor-dropdown-option--blue')).toBeInTheDocument();
      expect(queryByTestId('favColor-dropdown-option--yellow')).toBeInTheDocument();

      fireEvent.change(filter, { target: { value: 'r' } });
      expect(queryByTestId('favColor-dropdown-option--red')).toBeVisible();
      expect(queryByTestId('favColor-dropdown-option--blue')).not.toBeVisible();

      // close
      fireEvent.click(queryByTestId('favColor-dropdown-background'));
      expect(queryByTestId('favColor-dropdown-option--red')).not.toBeInTheDocument();
    });

  })

  it('should clear the autocomplete filter', async () => {
    let selectedColors: string[];

    const TestComponent = () => {
      const [colors, setColors] = useState([]);
      const selectColor = (colors: string[]) => {
        setColors(colors);
        selectedColors = colors;
      }
      return (
        <GoADropdown name="favColor" autoComplete={true} selectedValues={colors} onChange={(_name, value) => selectColor(value)}>
          <GoADropdownOption name="favColor" label="Red" value="red" />
          <GoADropdownOption name="favColor" label="Blue" value="blue" />
          <GoADropdownOption name="favColor" label="Yellow" value="yellow" />
        </GoADropdown>
      )
    };

    const { queryByTestId } = render(<TestComponent />);

    fireEvent.click(queryByTestId('favColor-dropdown'));

    waitFor(() => {
      const filter = queryByTestId('favColor-dropdown-filter');
      fireEvent.change(filter, { target: { value: 'red' } });
      expect(filter).toHaveValue('red');
      expect(queryByTestId('favColor-dropdown-option--red')).toBeVisible();
      expect(queryByTestId('favColor-dropdown-option--blue')).not.toBeVisible();

      // reset filter
      fireEvent.click(queryByTestId('filter-input-trailing-button'));
      expect(filter).toHaveValue('');
      expect(queryByTestId('favColor-dropdown-option--red')).toBeVisible();
      expect(queryByTestId('favColor-dropdown-option--blue')).toBeVisible();
    });
  })

  it('should not be able to interact with when disabled', async () => {
    const TestComponent = () => {
      return (
        <GoADropdown disabled={true} name="favColor" multiSelect={true} selectedValues={[]} onChange={() => { }}>
          <GoADropdownOption name="favColor" label="Red" value="red" />
          <GoADropdownOption name="favColor" label="Blue" value="blue" />
          <GoADropdownOption name="favColor" label="Yellow" value="yellow" />
        </GoADropdown>
      )
    };

    const { queryByTestId } = render(<TestComponent />);

    fireEvent.click(queryByTestId('favColor-dropdown'));

    await waitFor(() => {
      expect(queryByTestId('favColor-dropdown-option--red')).not.toBeInTheDocument();
    });
  })
})
