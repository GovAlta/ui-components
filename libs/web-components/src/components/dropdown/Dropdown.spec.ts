import '@testing-library/jest-dom';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/svelte';
import GoADropdownWrapper from './DropdownWrapper.test.svelte';
import GoADropdown from './Dropdown.svelte';
import { deleteContext } from '../../common/context-store';

afterEach(() => {
  deleteContext("favcolor")
  cleanup()
  jest.clearAllMocks();
});

describe('GoADropdownWrapper', () => {

  it('dropdown should render', async () => {
    const items = ["red", "blue", "orange"];
    const result = render(GoADropdownWrapper, {
      name: 'favcolor',
      value: 'orange',
      items,
    });

    const dropdown = result.queryByTestId("favcolor-dropdown");
    const inputField = dropdown.querySelector('goa-input');

    // show menu
    await fireEvent.click(inputField);

    await waitFor(() => {
      for (const item of items) {
        const option = result.queryByTestId(`dropdown-item-${item}`);
        expect(option).toBeTruthy();
        expect(option).toHaveTextContent(item);
      }
    });
  });

  describe("single selection", () => {
    it('has a preselected value', async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        value: 'orange',
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const inputField = dropdown.querySelector('goa-input');

      // show menu
      await fireEvent.click(inputField);

      dropdown.addEventListener('_change', (e) => {
        const { name } = e["detail"];
        expect(name).toBe("favcolor");
      })

      await waitFor(() => {
        // validate input label
        const input = result.container.querySelector("[data-testid=favcolor-dropdown-input]");
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
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
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
        const option = result.queryByTestId("dropdown-item-orange");
        await fireEvent.click(option);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(selectedValue).toEqual("orange");
      });
    });
  })

  describe("disabled", () => {
    it('can be enabled', async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        disabled: false,
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
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
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        disabled: true,
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
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
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        error: false,
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const inputField = dropdown.querySelector('goa-input');

      // show menu
      await fireEvent.focus(inputField);

      const option = result.container.querySelector("goa-input[error=false]");
      expect(option).not.toBeNull();
    });

    it('shows an error state', async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        error: true,
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
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
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');
      expect(input).not.toHaveAttribute("leadingicon", "add");
    });

    it('shows a leading icon', async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        leadingicon: "add",
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');
      expect(input).toHaveAttribute("leadingicon", "add");
    });
  })

  describe("placeholder", () => {
    it('does not show a placeholder', async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');
      expect(input).toHaveAttribute("placeholder", "");
    });

    it('shows a placeholder', async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        placeholder: "some text",
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');
      expect(input).toHaveAttribute("placeholder", "some text");
    });
  })

  describe("width", () => {
    it("dropdown should have the default width", async () => {
      const items = ["red", "blue", "pink"];
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');

      await waitFor(() => {
        expect(dropdown).toHaveStyle("--width: 20ch");
        expect(input).toHaveAttribute("width", "100%");  // 20ch is min width when being calculated
      })
    });

    it("uses the non-percent width supplied", async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        width: "500px",
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');

      await waitFor(() => {
        expect(dropdown).toHaveStyle("--width: 500px");
        expect(input).toHaveAttribute("width", "100%");
      });
    });

    it("sets the input width to 100% when percent value used", async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        width: "100%",
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');

      await waitFor(() => {
        expect(dropdown).toHaveStyle("--width: 100%");
        expect(input).toHaveAttribute("width", "100%");
      });
    });
  })

  describe("maxheight", () => {
    it("uses the default max height", async () => {
      const items = ["red", "blue", "pink"];
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');
      fireEvent.click(input);

      const menu = result.queryByTestId("dropdown-menu");
      await waitFor(() => {
        expect(menu).toHaveStyle("max-height: 276px");  // 276px is default value
      })
    });

    it("uses the height when supplied", async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name: 'favcolor',
        maxheight: "400px",
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');
      fireEvent.click(input);

      const menu = result.queryByTestId("dropdown-menu");
      await waitFor(() => {
        expect(menu).toHaveStyle("max-height: 400px");
      });
    });
  })

  describe("aria-labels", () => {
    it("show the aria label", async () => {
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name: 'favcolor3',
        value: "orange",
        arialabel: 'Favourite Color',
        items,
      });

      const dropdown = result.queryByTestId("favcolor3-dropdown");
      const input = dropdown.querySelector('goa-input');

      // selected value
      expect(input).toHaveAttribute("aria-label", "Favourite Color")

      await fireEvent.click(input);

      const menu = result.queryByTestId("dropdown-menu");
      await waitFor(() => {
        expect(menu).toHaveStyle("max-height: 276px");  // 276px is default value

        for (const item of items) {
          const option = result.queryByTestId(`dropdown-item-${item}`);
          expect(option).toBeTruthy();
          expect(option).toHaveAttribute("aria-label", item)
        }
      })
    });
  })

  describe.skip("keyboard bindings", () => {
    const space = new KeyboardEvent('keydown', {
      keyCode: 32, key: " ", code: "Space"
    });
    const enter = new KeyboardEvent('keydown', {
      keyCode: 13, key: "Enter"
    });
    // const downArrow = new KeyboardEvent('keydown', {
    //   keyCode: 40, key: "ArrowDown", code: "ArrowDown"
    // });
    // const upArrow = new KeyboardEvent('keydown', {
    //   keyCode: 38, key: "ArrowUp", code: "ArrowUp"
    // });
    // const altDownArrow = new KeyboardEvent('keydown', {
    //   altKey: true, keyCode: 40, key: "ArrowDown", code: "ArrowDown"
    // });
    // const altUpArrow = new KeyboardEvent('keydown', {
    //   altKey: true, keyCode: 38, key: "ArrowUp", code: "ArrowUp"
    // });

    const items = ["red", "blue", "pink"];

    for (const event of [space, enter]) {
      it(`should show the dropdown menu on <${event.key}>`, async () => {

        const user = {};

        const result = render(GoADropdownWrapper, { name: 'favcolor', items, value: "red" });
        // const dropdown = result.queryByTestId("favcolor-dropdown");
        const input = result.queryByTestId('favcolor-dropdown-input');

        // == Focus menu
        // await fireEvent.focus(input);
        // // input.focus();
        // expect(input).toHaveFocus();

        await fireEvent.click(input)

        // == Open menu
        // method 1
        // await fireEvent.keyDown(menu, {key: " ", code: "Space", keyCode: 32})
        // method 2
        // await user.keyboard("[Space]")
        // method 3
        // document.dispatchEvent(event);
        const menu = result.queryByTestId("dropdown-menu");
        await waitFor(() => {
          expect(menu.classList).toContain("dropdown-active")
        })

        // == Select third item
        // method 1
        // await fireEvent.keyDown(menu, {key: "ArrowDown", code: "ArrowDown", keyCode: 40})
        // await fireEvent.keyDown(menu, {key: "ArrowDown", code: "ArrowDown", keyCode: 40})
        // await fireEvent.keyDown(menu, {key: " ", code: "Space", keyCode: 32})

        // method 2
        // await user.keyboard("{ArrowDown}")
        // await user.keyboard("{ArrowDown}")
        // await user.keyboard("{Space}")

        // method 3
        // document.dispatchEvent(downArrow)
        // document.dispatchEvent(downArrow)
        // document.dispatchEvent(space)

        const menuItem = result.queryByTestId("dropdown-item-pink");
        await waitFor(() => {
          expect(input.innerHTML).toContain("pink")
          expect(menuItem.getAttribute("aria-selected")).toBe("true");
        })
      })
    }
  })

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoADropdown, {
        name: "test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const dropdown = await baseElement.findByTestId("test-dropdown");

      expect(dropdown).toBeTruthy();
      expect(dropdown).toHaveStyle("margin-top:var(--goa-spacing-s)");
      expect(dropdown).toHaveStyle("margin-bottom:var(--goa-spacing-m)");
      expect(dropdown).toHaveStyle("margin-right:var(--goa-spacing-l)");
      expect(dropdown).toHaveStyle("margin-left:var(--goa-spacing-xl)");
    });
  });
});
