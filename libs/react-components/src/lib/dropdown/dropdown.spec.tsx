import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { GoADropdown } from './dropdown.component';
import { GoAOptionGroup } from './option-group/option-group.component';
import { GoAOption } from './option/option.component';
import { DropdownOption } from './dropdown.context';
import { screen } from '@testing-library/dom';

afterEach(cleanup);

describe('GoA Dropdown', () => {
  const expandCollapseDropDown = async () => {

    const container = await screen.findByTestId('dropdown-container');
    // Check that the label is available
    expect(container).toBeTruthy();
    // Click the label to expand the dropdown
    fireEvent.click(container);
  }

  test('Expands and collapses', async () => {
    const { container } = render(
      <GoADropdown
        title='Fruits'
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
    await expandCollapseDropDown();

    // Check that the options are displayed
    expect(container.querySelector('.option')).toBeTruthy();

    //Collapse the dropdown
    await expandCollapseDropDown();

    // Check that the options are NOT displayed
    expect(container.querySelector('.option')).toBeFalsy();

  });

  test('Nothing happens when disabled', async () => {
    const { container } = render(
      <GoADropdown
        title='Fruits'
        description='Choose your favourite friut.'
        disabled={true}
        selectionChanged={() => { }}
      >
        <GoAOption value="apple" label="Apple" defaultSelected></GoAOption>
        <GoAOption value="pear" label="Pear"></GoAOption>
        <GoAOption value="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    await expandCollapseDropDown();

    // Check that the options are NOT displayed
    expect(container.querySelector('.option')).toBeFalsy();
  });

  test('Contains all options', async () => {
    const { container } = render(
      <GoADropdown
        title='Fruits'
        description='Choose your favourite friut.'
        selectionChanged={() => { }}
      >
        <GoAOption value="apple" label="Apple" defaultSelected></GoAOption>
        <GoAOption value="pear" label="Pear"></GoAOption>
        <GoAOption value="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    await expandCollapseDropDown();

    const allLabels = ['Apple', 'Pear', 'Banana']
    // Find each of the options
    allLabels.forEach((l) => {
      expect(screen.getByText(l)).toBeTruthy();
    })
  });
  test('Renders options and groups', async () => {
    const { container } = render(
      <GoADropdown
        title='Fruits'
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

    await expandCollapseDropDown();

    // Find each of the options
    const allLabels = ['Apple', 'Pear', 'Banana']
    // Find each of the options
    allLabels.forEach((l) => {
      expect(screen.getByText(l)).toBeTruthy();
    })
  });

  test('Displays warning when is required and no items are selected', async () => {
    const { container } = render(
      <GoADropdown
        title='Fruits'
        description='Choose your favourite friut.'
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
    await expandCollapseDropDown();
    // Collapse...
    await expandCollapseDropDown();

    // Check that the dropdown has the 'has-error' class
    const dropdownElement = container.querySelector('.goa-dropdown.has-error');
    expect(dropdownElement).toBeTruthy();

    // Check that the error span is displayed
    const errorSpanElement = container.querySelector('span.error-text');
    expect(errorSpanElement).toBeTruthy();

  });

  test('[selectionChanges] callback is invoked', async () => {
    let optionInCallback: DropdownOption;
    const selectHandler = (option: DropdownOption) => {
      optionInCallback = option;
    }
    render(
      <GoADropdown
        title='Fruits'
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

    await expandCollapseDropDown();

    // Select all three options
    const option = screen.queryByText('Apple');
    expect(option).toBeTruthy();
    await fireEvent.click(option);
    expect(optionInCallback.value).toBe('apple');
  });

  test('Test open property', async () => {
    let optionInCallback: DropdownOption;
    const selectHandler = (option: DropdownOption) => {
      optionInCallback = option;
    }
    const dropdown = render(
      <GoADropdown
        title='Fruits'
        description='Choose your favourite friut.'
        multiple={false}
        open={true}
        selectionChanged={selectHandler}
      >
        <GoAOptionGroup label="Group 1">
          <GoAOption value="apple" label="Apple"></GoAOption>
          <GoAOption value="pear" label="Pear"></GoAOption>
        </GoAOptionGroup>
        <GoAOption value="banana" label="Banana"></GoAOption>
      </GoADropdown>);
    // No further expect is required. Will throw exception, if dropdown-menu is missing
    await dropdown.findByTestId('dropdown-menu');
  });

  test('Test menuEditable and menuInputFn properties', async () => {
    let inputText: string;

    const menuInputhandler = (text: string) => {
      inputText = text;
    }
    const inputValue = 'mock-test'
    render(
      <GoADropdown
        title='Fruits'
        description='Choose your favourite friut.'
        multiple={false}
        open={true}
        menuEditable={true}
        menuInputChanged={menuInputhandler}
        selectionChanged={null}
      >
        <GoAOptionGroup label="Group 1">
          <GoAOption value="apple" label="Apple"></GoAOption>
          <GoAOption value="pear" label="Pear"></GoAOption>
        </GoAOptionGroup>
        <GoAOption value="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    const input = await screen.findByTestId('menu-input')
    await fireEvent.change(input, { target: { value: inputValue } })
    expect(inputText).toBe(inputValue)
  });

  test('Test descriptionComponent property', async () => {

    render(
      <GoADropdown
        title='Fruits'
        descriptionComponent={<div data-testid='custom-description'></div>}
        multiple={false}
        open={true}
        menuEditable={true}
        selectionChanged={null}
      >
        <GoAOptionGroup label="Group 1">
          <GoAOption value="apple" label="Apple"></GoAOption>
          <GoAOption value="pear" label="Pear"></GoAOption>
        </GoAOptionGroup>
        <GoAOption value="banana" label="Banana"></GoAOption>
      </GoADropdown>);

    const customComponent = await screen.findByTestId('custom-description')
    expect(customComponent).toBeTruthy()
  });

  test('Dynamic loading', async () => {
    const items = [{ value: 'apple', label: 'Apple' }, { value: 'banana', label: 'Banana' }]
    const { container } = render(
      <GoADropdown
        title="Fruits"
        description="Choose your favourite fruit!"
        multiple={false}
        selectionChanged={() => { }}
      >
        {
          items.map((i) => <GoAOption key={i.value} value={i.value} label={i.label} />)
        }
      </GoADropdown>
    )

    await expandCollapseDropDown();

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
