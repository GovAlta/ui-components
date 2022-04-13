import '@testing-library/jest-dom';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/svelte';
import GoADropdown from './DropdownWrapper.test.svelte';

afterEach(cleanup);

describe('GoADropdown', () => {

  it('should render', async () => {
    const items = ["red", "blue", "orange"];
    const baseElement = render(GoADropdown, {
      testid: 'test-id',
      name: 'favcolor',
      values: ['orange'],
      items,
    });

    const dropDown = baseElement.queryByTestId("test-id");
    const inputField = dropDown.querySelector('goa-input');
    await fireEvent.focus(inputField);

    for (const item of items) {
      const option = baseElement.queryByTestId(`dropdown-item-${item}`);
      expect(option).toBeTruthy();
      expect(option).toHaveTextContent(item);
    }
  });

  describe("single selection", () => {
    it('has a preselected value', async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        values: ['orange'],
        items,
      });

      const dropDown = result.queryByTestId("test-id");
      const inputField = dropDown.querySelector('goa-input');
      await fireEvent.focus(inputField);

      dropDown.addEventListener('_change', (e) => {
        const { name } = e["detail"];
        expect(name).toBe("favcolor");
      })

      // validate comma delimited values
      const input = result.container.querySelector("#favcolor-dropdown-input");
      expect(input).toBeTruthy();
      expect(input.getAttribute('value')).toContain('orange');

      const option = result.queryByTestId("dropdown-item-orange");
      expect(option).not.toBeNull();
    });

    it('selects a value', async () => {
      const onClick = jest.fn();
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        items,
      });

      const dropDown = result.queryByTestId("test-id");
      const inputField = dropDown.querySelector('goa-input');
      await fireEvent.focus(inputField);

      let selectedValue = [];

      dropDown.addEventListener('_change', (e) => {
        const { name, value } = e["detail"];
        selectedValue = value;
        expect(name).toBe("favcolor");
        onClick();
      })

      // select item
      const option = result.queryByTestId("dropdown-item-orange");
      await fireEvent.click(option);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(selectedValue).toEqual(["orange"]);
    });
  })

  describe("multi selection", () => {
    it('has preselected values', async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        values: '["orange", "red"]',
        multiselect: true,
        items,
      });

      const dropDown = result.queryByTestId("test-id");
      const inputField = dropDown.querySelector('goa-input');
      await fireEvent.focus(inputField);

      dropDown.addEventListener('_change', (e) => {
        const { name } = e["detail"];
        expect(name).toBe("favcolor");
      })

      // validate comma delimited values
      const input = result.container.querySelector("#favcolor-dropdown-input");
      expect(input).toBeTruthy();
      expect(input.getAttribute('value')).toContain('red');
      expect(input.getAttribute('value')).toContain('orange');

      // validate they are selected
      const orange = result.queryByTestId("dropdown-item-orange");
      expect(orange).not.toBeNull();
      const red = result.queryByTestId("dropdown-item-red");
      expect(red).not.toBeNull();
    });

    it('selects values', async () => {
      const onClick = jest.fn();
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        values: [],
        multiselect: "true",
        items,
      });

      const dropDown = result.queryByTestId("test-id");
      const inputField = dropDown.querySelector('goa-input');
      await fireEvent.focus(inputField);

      let selectedValue = [];

      dropDown.addEventListener('_change', (e) => {
        const { name, value } = e["detail"];
        selectedValue = value;
        expect(name).toBe("favcolor");
        onClick();
      })

      // select first item
      const option1 = result.queryByTestId("dropdown-item-orange");
      await fireEvent.click(option1);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(selectedValue).toEqual(["orange"]);

      // select second item
      const option2 = result.queryByTestId("dropdown-item-red");
      await fireEvent.click(option2);
      expect(onClick).toHaveBeenCalledTimes(2);
      expect(selectedValue).toContain("orange");
      expect(selectedValue).toContain("red");

      // deselect second item
      await fireEvent.click(option2);
      expect(onClick).toHaveBeenCalledTimes(3);
      expect(selectedValue).toContain("orange");
      expect(selectedValue).not.toContain("red");
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

    const dropDown = result.queryByTestId("test-id");
    const inputField = dropDown.querySelector('goa-input');
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

    const dropDown = result.queryByTestId("test-id");
    const inputField = dropDown.querySelector('goa-input');
    await fireEvent.focus(inputField);

    console.log(result.container.outerHTML);
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

    const dropDown = result.queryByTestId("test-id");
    const input = dropDown.querySelector('goa-input');
    expect(input).toHaveAttribute("leadingicon", "add");
  });

  it.skip('allows for filtering of the items', async () => {
    const items = ["red", "blue", "orange"];
    const result = render(GoADropdown, {
      testid: 'test-id',
      name: 'favcolor',
      filterable: "true",
      items,
    });

    const dropDown = result.queryByTestId("test-id");
    const inputField = dropDown.querySelector('goa-input');
    await fireEvent.focus(inputField);
    const filterField = dropDown.querySelector('#favcolor-dropdown-filter');

    // FIXME: can't get a response to the changing of the goa-input filter value
    filterField.setAttribute("value", "o");
    dropDown.addEventListener('_change', (e) => {
      const { name } = e["detail"];
      expect(name).toBe("favcolor");
    })

    await waitFor(() => {
      // select item
      const orange = result.queryByTestId("dropdown-item-orange");
      expect(orange).not.toBeNull();
      const blue = result.queryByTestId("dropdown-item-blue");
      expect(blue).toBeNull();
    })

  });
});
