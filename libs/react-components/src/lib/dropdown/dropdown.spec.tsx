import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GoADropdown } from './dropdown.component';
import { GoAOptionGroup } from './option-group/option-group.component';
import { GoAOption } from './option/option.component';
import { DropdownOption } from './dropdown.context';

afterEach(cleanup);

describe('GoA Dropdown', () => {

  //#region Helper functions
  const expandCollapseDropDown = (container: HTMLElement) => {
    const label = container.querySelector('.dropdown-label');

    // Check that the label is available
    expect(label).toBeTruthy();

    // Click the label to expand the dropdown
    fireEvent.click(label);
  }
  //#endregion

  test('Expands and collapses', () => {
    const { container } = render(
      <GoADropdown label='Fruits' description='Choose your favourite friut.'>
        <GoAOption id="apple" label="Apple" defaultSelected></GoAOption>
        <GoAOption id="pear" label="Pear"></GoAOption>
        <GoAOption id="banana" label="Banana"></GoAOption>
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
      <GoADropdown label='Fruits' description='Choose your favourite friut.' disabled={true}>
        <GoAOption id="apple" label="Apple" defaultSelected></GoAOption>
        <GoAOption id="pear" label="Pear"></GoAOption>
        <GoAOption id="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    expandCollapseDropDown(container);

    // Check that the options are NOT displayed
    expect(container.querySelector('.option')).toBeFalsy();
  });

  test('Contains all options', () => {
    const { container } = render(
      <GoADropdown label='Fruits' description='Choose your favourite friut.'>
        <GoAOption id="apple" label="Apple" defaultSelected></GoAOption>
        <GoAOption id="pear" label="Pear"></GoAOption>
        <GoAOption id="banana" label="Banana"></GoAOption>
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
      <GoADropdown label='Fruits' description='Choose your favourite friut.' multiple={false}>
        <GoAOptionGroup label="Group 1">
          <GoAOption id="apple" label="Apple" defaultSelected></GoAOption>
          <GoAOption id="pear" label="Pear"></GoAOption>
        </GoAOptionGroup>
        <GoAOption id="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    expandCollapseDropDown(container);

    // Find each of the options
    const allLabels = ['Apple', 'Pear', 'Banana']
    // Find each of the options
    allLabels.forEach((l) => {
      expect(screen.getByText(l)).toBeTruthy();
    })

  });

  test('Multiselect options being selected', () => {
    const { container } = render(
      <GoADropdown label='Fruits' description='Choose your favourite friut.' multiple={true}>
        <GoAOptionGroup label="Group 1">
          <GoAOption id="apple" label="Apple"></GoAOption>
          <GoAOption id="pear" label="Pear"></GoAOption>
        </GoAOptionGroup>
        <GoAOption id="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    // Get the descripion and check that it is blank since nothing is selected
    const inputElement = container.querySelector('input.dropdown-textbox');
    expect(inputElement).toBeTruthy();
    let inputText = inputElement.getAttribute('value');
    expect(inputText == '').toBeTruthy();

    // Expand the dropdown and selected an item
    expandCollapseDropDown(container);

    for (let i = 0; i < 3; i++) {
      let notSelectedOption = container.querySelector('.option:not(.selected)');
      expect(notSelectedOption).toBeTruthy();
      fireEvent.click(notSelectedOption);
    }

    inputText = inputElement.getAttribute('value');
    expect(inputText == '(3 options selected)').toBeTruthy();
  })

  test('Displays warning when is required and no items are selected', () => {
    const { container } = render(
      <GoADropdown label='Fruits' description='Choose your favourite friut.' required={true}>
        <GoAOptionGroup label="Group 1">
          <GoAOption id="apple" label="Apple"></GoAOption>
          <GoAOption id="pear" label="Pear"></GoAOption>
        </GoAOptionGroup>
        <GoAOption id="banana" label="Banana"></GoAOption>
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

  test('[selectionChanges] callback is invoked', () => {
    let count: number = 0;
    const selectHandler = (options: DropdownOption[]) => {
      count += 1;
    }
    const { container } = render(
      <GoADropdown label='Fruits' description='Choose your favourite friut.' multiple={true} selectionChanged={selectHandler}>
        <GoAOptionGroup label="Group 1">
          <GoAOption id="apple" label="Apple"></GoAOption>
          <GoAOption id="pear" label="Pear"></GoAOption>
        </GoAOptionGroup>
        <GoAOption id="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    expandCollapseDropDown(container);

    let labels = ['Apple', 'Pear', 'Banana'];

    // Select all three options
    for (let i = 0; i < 3; i++) {
      let option = screen.queryByText(labels[i]);
      expect(option).toBeTruthy();
      fireEvent.click(option);
    }

    expect(count > 0).toBeTruthy();
  });

  test('TypeAhead - startsWith', () => {
    const { container } = render(
      <GoADropdown
        label="Fruits"
        description="Choose your favourite fruit!"
        multiple={true}
        typeAheadMode="startsWith"
      >
        <GoAOptionGroup label="Group 1">
          <GoAOption id="apple" label="Apple" defaultSelected></GoAOption>
          <GoAOption id="banana" label="Banana"></GoAOption>
          <GoAOption id="orange" label="Orange"><span>Orange 🍊</span></GoAOption>
        </GoAOptionGroup>
        <GoAOption id="kiwi" label="Kiwi"></GoAOption>
        <GoAOption id="lemon" label="Lemon"></GoAOption>
        <GoAOption id="lime" label="Lime" defaultSelected></GoAOption>
        <GoAOptionGroup label="Group 2">
          <GoAOption id="mango" label="Mango"></GoAOption>
          <GoAOption id="pineapple" label="Pineapple"></GoAOption>
          <GoAOption id="plantain" label="Plantain" defaultSelected></GoAOption>
        </GoAOptionGroup>
      </GoADropdown>
    )

    // Find the filter input
    const filterInputElement = container.querySelector('.dropdown-textbox');
    expect(filterInputElement).toBeTruthy();

    const filter = 'bAn'

    // Type the filter condition
    userEvent.type(filterInputElement, filter);

    // Get all options currently visible
    const filteredOptions = container.querySelectorAll('.goa-option');
    expect(filteredOptions.length === 1).toBeTruthy();

    // Check that all options match the filter (startsWith)
    for (let i = 0; i < filteredOptions.length; i += 1) {
      const op = filteredOptions.item(i);
      const text = op.textContent;
      expect(text.toLocaleLowerCase().startsWith(filter.toLowerCase())).toBeTruthy();
    }
  });

  test('TypeAhead - contains', () => {
    const { container } = render(
      <GoADropdown
        label="Fruits"
        description="Choose your favourite fruit!"
        multiple={true}
        typeAheadMode="contains"
      >
        <GoAOptionGroup label="Group 1">
          <GoAOption id="apple" label="Apple" defaultSelected></GoAOption>
          <GoAOption id="banana" label="Banana"></GoAOption>
          <GoAOption id="orange" label="Orange"><span>Orange 🍊</span></GoAOption>
        </GoAOptionGroup>
        <GoAOption id="kiwi" label="Kiwi"></GoAOption>
        <GoAOption id="lemon" label="Lemon"></GoAOption>
        <GoAOption id="pineapple" label="Pineapple"></GoAOption>
        <GoAOptionGroup label="Group 2">
          <GoAOption id="mango" label="Mango"></GoAOption>
          <GoAOption id="lime" label="Lime" defaultSelected></GoAOption>
          <GoAOption id="plantain" label="Plantain" defaultSelected></GoAOption>
        </GoAOptionGroup>
      </GoADropdown>
    )

    // Find the filter input
    const filterInputElement = container.querySelector('.dropdown-textbox');
    expect(filterInputElement).toBeTruthy();

    const filter = 'pp'

    // Type the filter condition
    userEvent.type(filterInputElement, filter);

    // Get all options currently visible
    const filteredOptions = container.querySelectorAll('.goa-option');
    expect(filteredOptions.length === 2).toBeTruthy();

    // Check that all options match the filter (contains)
    for (let i = 0; i < filteredOptions.length; i += 1) {
      const op = filteredOptions.item(i);
      const text = op.textContent;
      expect(text.toLocaleLowerCase().indexOf(filter) >= 0).toBeTruthy();
    }
  });

  test('Dynamic loading', () => {
    const items = [{ id: 'apple', label: 'Apple' }, { id: 'banana', label: 'Banana' }]
    const { container } = render(
      <GoADropdown
        label="Fruits"
        description="Choose your favourite fruit!"
        multiple={false}
        typeAheadMode="none"
      >
        {
          items.map((i) => <GoAOption key={i.id} id={i.id} label={i.label} />)
        }
      </GoADropdown>
    )

    expandCollapseDropDown(container);

    const displayedOtions = container.querySelectorAll('.goa-option');

    // Check that all options are displayed
    for (let i = 0; i < items.length; i += 1) {
      const op = items[i];
      const label = op.label;
      console.log('Looking for ' + label);

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
