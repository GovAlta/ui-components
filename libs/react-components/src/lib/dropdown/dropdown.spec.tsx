import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { GoADropdown } from './dropdown.component';
import { GoAOptionGroup } from './option-group/option-group.component';
import { GoAOption } from './option/option.component';
import { DropdownOption } from './dropdown.context';

afterEach(cleanup);

describe('GoA Dropdown', () => {
  const expandCollapseDropDown = (container: HTMLElement) => {
    const label = container.querySelector('.dropdown-label');
    // Check that the label is available
    expect(label).toBeTruthy();

    // Click the label to expand the dropdown
    fireEvent.click(label);
  }

  test('Expands and collapses', () => {
    const { container } = render(
      <GoADropdown
        label='Fruits'
        description='Choose your favourite friut.'
        selectionChanged={() => { }}
      >
        <GoAOption value="apple" label="Apple" defaultSelected></GoAOption>
        <GoAOption value="pear" label="Pear"></GoAOption>
        <GoAOption value="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    // Check that the options are NOT displayed
    expect(container.querySelector('.option')).toBeFalsy();

    //Expand the dropdown
    expandCollapseDropDown(container);

    // Check that the options are displayed
    expect(container.querySelector('.option')).toBeTruthy();

    //Collapse the dropdown
    expandCollapseDropDown(container);

    // Check that the options are NOT displayed
    expect(container.querySelector('.option')).toBeFalsy();

  });

  test('Nothing happens when disabled', () => {
    const { container } = render(
      <GoADropdown
        label='Fruits'
        description='Choose your favourite friut.'
        disabled={true}
        selectionChanged={() => { }}
      >
        <GoAOption value="apple" label="Apple" defaultSelected></GoAOption>
        <GoAOption value="pear" label="Pear"></GoAOption>
        <GoAOption value="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    expandCollapseDropDown(container);

    // Check that the options are NOT displayed
    expect(container.querySelector('.option')).toBeFalsy();
  });

  test('Contains all options', () => {
    const { container } = render(
      <GoADropdown
        label='Fruits'
        description='Choose your favourite friut.'
        selectionChanged={() => { }}
      >
        <GoAOption value="apple" label="Apple" defaultSelected></GoAOption>
        <GoAOption value="pear" label="Pear"></GoAOption>
        <GoAOption value="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    expandCollapseDropDown(container);

    const allLabels = ['Apple', 'Pear', 'Banana']
    // Find each of the options
    allLabels.forEach((l) => {
      expect(screen.getByText(l)).toBeTruthy();
    })
  });
  test('Renders options and groups', () => {
    const { container } = render(
      <GoADropdown
        label='Fruits'
        description='Choose your favourite friut.'
        multiple={false}
        selectionChanged={() => { }}
      >
        <GoAOptionGroup label="Group 1">
          <GoAOption value="apple" label="Apple" defaultSelected></GoAOption>
          <GoAOption value="pear" label="Pear"></GoAOption>
        </GoAOptionGroup>
        <GoAOption value="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    expandCollapseDropDown(container);

    // Find each of the options
    const allLabels = ['Apple', 'Pear', 'Banana']
    // Find each of the options
    allLabels.forEach((l) => {
      expect(screen.getByText(l)).toBeTruthy();
    })
  });

  test('Displays warning when is required and no items are selected', () => {
    const { container } = render(
      <GoADropdown
        label='Fruits'
        description='Choose your favourite friut.'
        required={true}
        selectionChanged={() => { }}
        errorMessage="Error of the component"
      >
        <GoAOptionGroup label="Group 1">
          <GoAOption value="apple" label="Apple"></GoAOption>
          <GoAOption value="pear" label="Pear"></GoAOption>
        </GoAOptionGroup>
        <GoAOption value="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    // Expand...
    expandCollapseDropDown(container);
    // Collapse...
    expandCollapseDropDown(container);

    // Check that the dropdown has the 'has-error' class
    const dropdownElement = container.querySelector('.goa-dropdown.has-error');
    expect(dropdownElement).toBeTruthy();

    // Check that the error span is displayed
    const errorSpanElement = container.querySelector('span.error-text');
    expect(errorSpanElement).toBeTruthy();

  });

  test('[selectionChanges] callback is invoked', async () => {
    let optionInCallback = {};
    const selectHandler = (option: DropdownOption) => {
      optionInCallback = option;
    }
    const { container } = render(
      <GoADropdown
        label='Fruits'
        description='Choose your favourite friut.'
        multiple={true}
        selectionChanged={selectHandler}
      >
        <GoAOptionGroup label="Group 1">
          <GoAOption value="apple" label="Apple"></GoAOption>
          <GoAOption value="pear" label="Pear"></GoAOption>
        </GoAOptionGroup>
        <GoAOption value="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    expandCollapseDropDown(container);

    // Select all three options
    const option = screen.queryByText('Apple');
    expect(option).toBeTruthy();
    await fireEvent.click(option);
    expect(optionInCallback.value).toBe('apple');
  });

  test('Dynamic loading', () => {
    const items = [{ value: 'apple', label: 'Apple' }, { value: 'banana', label: 'Banana' }]
    const { container } = render(
      <GoADropdown
        label="Fruits"
        description="Choose your favourite fruit!"
        multiple={false}
        selectionChanged={() => { }}
      >
        {
          items.map((i) => <GoAOption key={i.value} value={i.value} label={i.label} />)
        }
      </GoADropdown>
    )

    expandCollapseDropDown(container);

    const displayedOtions = container.querySelectorAll('.goa-option');

    // Check that all options are displayed
    for (let i = 0; i < items.length; i += 1) {
      const op = items[i];
      const label = op.label;

      let foundItem = false;
      for (let j = 0; j < displayedOtions.length; j += 1) {
        const op = displayedOtions.item(j);
        const text = op.textContent;
        if (text === label) {
          foundItem = true;
          break;
        }
      }
      expect(foundItem).toBeTruthy();
    }
  });
})
