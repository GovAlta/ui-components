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

    // show menu
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

      // show menu
      await fireEvent.click(inputField);

      dropdown.addEventListener('_change', (e) => {
        const { name } = e["detail"];
        expect(name).toBe("favcolor");
      })

      await waitFor(() => {
        // validate input label
        const input = result.container.querySelector("#favcolor-dropdown-input");
        expect(input).toBeTruthy();

        // validate the label
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

      // show menu
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

  describe("disabled", () => {
    it('can be enabled', async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        disabled: false,
        items,
      });

      const dropdown = result.queryByTestId("test-id");
      const inputField = dropdown.querySelector('goa-input');
      await fireEvent.click(inputField);

      const onClick = jest.fn()
      dropdown.addEventListener('_change', () => {
        onClick();
      })

      await waitFor(async () => {
        const menu = result.queryByTestId("dropdown-menu");
        expect(menu).toBeVisible()
      });
    });

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
      await fireEvent.click(inputField);

      const onClick = jest.fn()
      dropdown.addEventListener('_change', () => {
        onClick();
      })

      await waitFor(async () => {
        const menu = result.queryByTestId("dropdown-menu");
        expect(menu).not.toBeVisible()
      });
    });

  })

  describe("error state", () => {

    it('does not show an error state', async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        error: false,
        items,
      });

      const dropdown = result.queryByTestId("test-id");
      const inputField = dropdown.querySelector('goa-input');

      // show menu
      await fireEvent.focus(inputField);

      const option = result.container.querySelector("goa-input[error=false]");
      expect(option).not.toBeNull();
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

      // show menu
      await fireEvent.focus(inputField);

      const option = result.container.querySelector("goa-input[error=true]");
      expect(option).not.toBeNull();
    });
  })


  describe("leading icon", () => {
    it('does not show a leading icon', async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        items,
      });

      const dropdown = result.queryByTestId("test-id");
      const input = dropdown.querySelector('goa-input');
      expect(input).not.toHaveAttribute("leadingicon", "add");
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
  })

  describe("placeholder", () => {
    it('does not show a placeholder', async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        items,
      });

      const dropdown = result.queryByTestId("test-id");
      const input = dropdown.querySelector('goa-input');
      expect(input).toHaveAttribute("placeholder", "");
    });

    it('shows a placeholder', async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        placeholder: "some text",
        items,
      });

      const dropdown = result.queryByTestId("test-id");
      const input = dropdown.querySelector('goa-input');
      expect(input).toHaveAttribute("placeholder", "some text");
    });
  })

  describe("width", () => {
    it("uses calculated width when not supplied", async () => {
      const items = ["red", "blue", "pink"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        items,
      });

      const dropdown = result.queryByTestId("test-id");
      const input = dropdown.querySelector('goa-input');

      await waitFor(() => {
        expect(input).toHaveAttribute("width", "20ch");  // 20ch is min width when being calculated
      }) 
    });

    it("uses the width supplied", async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        width: "50%",
        items,
      });

      const dropdown = result.queryByTestId("test-id");
      const input = dropdown.querySelector('goa-input');

      await waitFor(() => {
        expect(input).toHaveAttribute("width", "50%");
      });
    });
  })

  describe("maxheight", () => {
    it("uses the default max height", async () => {
      const items = ["red", "blue", "pink"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        items,
      });

      const dropdown = result.queryByTestId("test-id");
      const input = dropdown.querySelector('goa-input');
      fireEvent.click(input);

      const menu = result.queryByTestId("dropdown-menu");
      await waitFor(() => {
        expect(menu).toHaveStyle("max-height: 300px");  // 300px is default value 
      }) 
    });

    it("uses the height when supplied", async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        testid: 'test-id',
        name: 'favcolor',
        maxheight: "400px",
        items,
      });

      const dropdown = result.queryByTestId("test-id");
      const input = dropdown.querySelector('goa-input');
      fireEvent.click(input);

      const menu = result.queryByTestId("dropdown-menu");
      await waitFor(() => {
        expect(menu).toHaveStyle("max-height: 400px");
      });
    });
  })

});
