import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
        selectionChanged={() => {}}
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
        selectionChanged={() => {}}
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
        selectionChanged={() => {}}
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

  test('Has initial selected value', () => {
    const { getByRole } = render(
      <GoADropdown
        label='Fruits'
        description='Choose your favourite friut.'
        value='pear'
        selectionChanged={() => {}}
      >
        <GoAOption value="apple" label="Apple"></GoAOption>
        <GoAOption value="pear" label="Pear"></GoAOption>
        <GoAOption value="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    const searchInput = getByRole('searchbox') as HTMLInputElement;
    expect(searchInput.value).toEqual('Pear')

    fireEvent.click(searchInput)
    const selected = document.querySelectorAll('.option.selected');
    expect(selected.length).toEqual(1);
    expect(selected[0].textContent).toEqual('Pear');
  });

  test('Has initial selected values', () => {
    const { getByRole } = render(
      <GoADropdown
        label='Fruits'
        description='Choose your favourite friut.'
        values={['pear', 'banana']}
        selectionChanged={() => {}}
      >
        <GoAOption value="apple" label="Apple"></GoAOption>
        <GoAOption value="pear" label="Pear"></GoAOption>
        <GoAOption value="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    const searchInput = getByRole('searchbox') as HTMLInputElement;
    expect(searchInput.value).toEqual('Pear, Banana')

    fireEvent.click(searchInput)
    const selected = document.querySelectorAll('.option.selected');
    expect(selected.length).toEqual(2);
    expect(selected[0].textContent).toEqual('Pear');
    expect(selected[1].textContent).toEqual('Banana');
  });

  test('Renders options and groups', () => {
    const { container } = render(
      <GoADropdown
        label='Fruits'
        description='Choose your favourite friut.'
        multiple={false}
        selectionChanged={() => {}}
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

  test('Multiselect options being selected', () => {
    const { container } = render(
      <GoADropdown
        label='Fruits'
        description='Choose your favourite friut.'
        multiple={true}
        selectionChanged={() => {}}
      >
        <GoAOptionGroup label="Group 1">
          <GoAOption value="apple" label="Apple"></GoAOption>
          <GoAOption value="pear" label="Pear"></GoAOption>
        </GoAOptionGroup>
        <GoAOption value="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    // Get the descripion and check that it is blank since nothing is selected
    const inputElement = container.querySelector('input.dropdown-textbox');
    expect(inputElement).toBeTruthy();
    let inputText = inputElement.getAttribute('value');
    expect(inputText === '').toBeTruthy();

    // Expand the dropdown and selected an item
    expandCollapseDropDown(container);

    for (let i = 0; i < 3; i++) {
      const notSelectedOption = container.querySelector('.option:not(.selected)');
      expect(notSelectedOption).toBeTruthy();
      fireEvent.click(notSelectedOption);
    }

    inputText = inputElement.getAttribute('value');
    expect(inputText === 'Apple, Pear, Banana').toBeTruthy();
  })

  test('Displays warning when is required and no items are selected', () => {
    const { container } = render(
      <GoADropdown
        label='Fruits'
        description='Choose your favourite friut.'
        required={true}
        selectionChanged={() => {}}
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

  // TODO: add tests for initial values to dropdown

  test('[selectionChanges] callback is invoked', () => {
    let count = 0;
    const selectHandler = (options: DropdownOption[]) => {
      count += 1;
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

    const labels = ['Apple', 'Pear', 'Banana'];

    // Select all three options
    for (let i = 0; i < 3; i++) {
      const option = screen.queryByText(labels[i]);
      expect(option).toBeTruthy();
      fireEvent.click(option);
    }

    expect(count > 0).toBeTruthy();
  });

  test('TypeAhead - startsWith', () => {
    const { getByRole, queryAllByRole } = render(
      <GoADropdown
        label="Fruits"
        description="Choose your favourite fruit!"
        typeAheadMode="startsWith"
        selectionChanged={() => {}}
      >
        <GoAOptionGroup label="Group 2">
          <GoAOption value="mango" label="Mango"></GoAOption>
          <GoAOption value="lime" label="Lime"></GoAOption>
          <GoAOption value="pineapple" label="Pineapple"></GoAOption>
        </GoAOptionGroup>
        <GoAOption value="apple" label="Apple"></GoAOption>
        <GoAOption value="banana" label="Banana"></GoAOption>
        <GoAOption value="orange" label="Orange"><span>Orange 🍊</span></GoAOption>
        <GoAOption value="kiwi" label="Kiwi"></GoAOption>
        <GoAOption value="lemon" label="Lemon"></GoAOption>
      </GoADropdown>
    )

    // Find the filter input
    const filter = 'l';
    const searchBox = getByRole('searchbox') as HTMLInputElement;

    // Open menu
    userEvent.click(searchBox);
    expect(searchBox).toBeTruthy();
    expect(queryAllByRole('listitem').length).toEqual(8);

    // Enter search text
    fireEvent.change(searchBox, { target: { value: filter } })

    // Get all options currently visible
    const filteredOptions = queryAllByRole('listitem')
    expect(filteredOptions.length).toEqual(2);

    // Check that all options match the filter (startsWith)
    filteredOptions.forEach(option => {
      const text = option.textContent.toLocaleLowerCase();
      expect(text.startsWith(filter.toLowerCase())).toBeTruthy();
    });
  });

  test('TypeAhead - contains', () => {
    const { getByRole, queryAllByRole } = render(
      <GoADropdown
        label="Fruits"
        description="Choose your favourite fruit!"
        typeAheadMode="contains"
        selectionChanged={() => {}}
      >
        <GoAOptionGroup label="Group 1">
          <GoAOption value="apple" label="Apple"></GoAOption>
          <GoAOption value="banana" label="Banana"></GoAOption>
          <GoAOption value="orange" label="Orange"><span>Orange 🍊</span></GoAOption>
        </GoAOptionGroup>
        <GoAOption value="kiwi" label="Kiwi"></GoAOption>
        <GoAOption value="lemon" label="Lemon"></GoAOption>
        <GoAOption value="pineapple" label="Pineapple"></GoAOption>
        <GoAOptionGroup label="Group 2">
          <GoAOption value="mango" label="Mango"></GoAOption>
          <GoAOption value="lime" label="Lime"></GoAOption>
          <GoAOption value="plantain" label="Plantain"></GoAOption>
        </GoAOptionGroup>
      </GoADropdown>
    )

    // Find the filter input
    const filter = 'pp';
    const searchBox = getByRole('searchbox') as HTMLInputElement;

    // Open menu
    userEvent.click(searchBox);
    expect(searchBox).toBeTruthy();
    expect(queryAllByRole('listitem').length).toEqual(9);

    // Enter search text
    fireEvent.change(searchBox, { target: { value: filter } })

    // Get all options currently visible
    const filteredOptions = queryAllByRole('listitem')
    expect(filteredOptions.length).toEqual(2);

    // Check that all options match the filter (startsWith)
    filteredOptions.forEach(option => {
      const text = option.textContent.toLocaleLowerCase();
      expect(text.includes(filter.toLowerCase())).toBeTruthy();
    });
  });

  test('Dynamic loading', () => {
    const items = [{ value: 'apple', label: 'Apple' }, { value: 'banana', label: 'Banana' }]
    const { container } = render(
      <GoADropdown
        label="Fruits"
        description="Choose your favourite fruit!"
        multiple={false}
        typeAheadMode="none"
        selectionChanged={() => {}}
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
