import '@testing-library/jest-dom';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/svelte';
import GoADropdown from './DropdownWrapper.test.svelte';

afterEach(cleanup);

describe('GoADropdown', () => {

  it('should render', async () => {
    const items = ["red", "blue", "orange"];
    const result = render(GoADropdown, {
      testid: 'test-id',
      name: 'favcolor',
      value: 'orange',
      items,
    });

    const dropdown = result.queryByTestId("test-id");
    const inputField = dropdown.querySelector('goa-input');
    await fireEvent.click(inputField);

    await waitFor(() => {
      for (const item of items) {
        const option = result.queryByTestId(`${item}-dropdown-item`);
        expect(option).toBeTruthy();
        expect(option).toHaveTextContent(item);
      }
    });
  });

  describe("single selection", () => {
    it('has a preselected value', async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        value: 'orange',
        items,
      });

      const dropdown = result.queryByTestId("test-id");
      const inputField = dropdown.querySelector('goa-input');
      await fireEvent.click(inputField);

      dropdown.addEventListener('_change', (e) => {
        const { name } = e["detail"];
        expect(name).toBe("favcolor");
      })

      await waitFor(() => {
        // validate input label
        const input = result.container.querySelector("#favcolor-dropdown-input");
        expect(input).toBeTruthy();
        expect(input.getAttribute('value')).toContain('orange');

        // validate the selected item
        const selected = result.container.querySelector(".goa-dropdown-option--selected");
        expect(selected).not.toBeNull();
      });
    });

    it('selects a value', async () => {
      const onClick = jest.fn();
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        items,
      });

      const dropdown = result.queryByTestId("test-id");
      const inputField = dropdown.querySelector('goa-input');
      await fireEvent.click(inputField);

      let selectedValue = [];

      dropdown.addEventListener('_change', (e) => {
        const { name, value } = e["detail"];
        selectedValue = value;
        expect(name).toBe("favcolor");
        onClick();
      })

      await waitFor(async () => {
        // select item
        const option = result.queryByTestId("orange-dropdown-item");
        await fireEvent.click(option);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(selectedValue).toEqual("orange");
      });
    });
  })

  it('can be disabled', async () => {
    const items = ["red", "blue", "orange"];
    const result = render(GoADropdown, {
      testid: 'test-id',
      name: 'favcolor',
      disabled: true,
      items,
    });

    const dropdown = result.queryByTestId("test-id");
    const inputField = dropdown.querySelector('goa-input');
    await fireEvent.focus(inputField);

    const option = result.queryByTestId("dropdown-item-red");
    expect(option).toBeNull();
  });

  it('shows an error state', async () => {
    const items = ["red", "blue", "orange"];
    const result = render(GoADropdown, {
      testid: 'test-id',
      name: 'favcolor',
      error: true,
      items,
    });

    const dropdown = result.queryByTestId("test-id");
    const inputField = dropdown.querySelector('goa-input');
    await fireEvent.focus(inputField);

    const option = result.container.querySelector("goa-input[error]");
    expect(option).not.toBeNull();
  });

  it('shows a leading icon', async () => {
    const items = ["red", "blue", "orange"];
    const result = render(GoADropdown, {
      testid: 'test-id',
      name: 'favcolor',
      leadingicon: "add",
      items,
    });

    const dropdown = result.queryByTestId("test-id");
    const input = dropdown.querySelector('goa-input');
    expect(input).toHaveAttribute("leadingicon", "add");
  });

});
