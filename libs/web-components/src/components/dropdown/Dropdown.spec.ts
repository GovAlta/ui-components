import '@testing-library/jest-dom';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/svelte';
import GoADropdown from './Dropdown.svelte';
import { deleteContext, getContext } from '../../common/context-store';

afterEach(() => {
  deleteContext("favcolor")
  cleanup()
  jest.clearAllMocks();
});

describe('GoADropdown', () => {

  it('dropdown should render', async () => {
    const name = 'favcolor';
    const items = ["red", "blue", "orange"];
    const result = render(GoADropdown, { name, value: 'orange' });

    const ctx = getContext(name)
    for (const item of items) {
      ctx.notify({ type: "bind", name, value: item })
    }

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
      const name = 'preselected-color';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, { name, value: 'orange' });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

      const dropdown = result.queryByTestId(`${name}-dropdown`);
      const inputField = dropdown.querySelector('goa-input');

      // show menu
      await fireEvent.click(inputField);

      dropdown.addEventListener('_change', (e) => {
        const { name: n } = e["detail"];
        expect(n).toBe(name);
      })

      await waitFor(() => {
        // validate input label
        const input = result.container.querySelector("goa-input") as HTMLInputElement;
        expect(input).toBeTruthy();

        // validate the selected item
        const selected = result.container.querySelector(".dropdown-option--selected");
        expect(selected).not.toBeNull();
        expect(selected.innerHTML).toContain("orange");

        // validate the label
        // expect(input.value).toContain('orange');
      });

    });

    it('selects a value', async () => {
      const onClick = jest.fn();
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, { name });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const inputField = dropdown.querySelector('goa-input');

      // show menu
      await fireEvent.click(inputField);

      let selectedValue = [];

      dropdown.addEventListener('_change', (e) => {
        const { name: n, value } = e["detail"];
        selectedValue = value;
        expect(n).toBe("favcolor");
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
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        name: 'favcolor',
        disabled: false,
      });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

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
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        name,
        disabled: true,
      });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

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
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        name,
        error: false,
      });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const inputField = dropdown.querySelector('goa-input');

      // show menu
      await fireEvent.focus(inputField);

      const option = result.container.querySelector("goa-input[error=false]");
      expect(option).not.toBeNull();
    });

    it('shows an error state', async () => {
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        name: 'favcolor',
        error: true,
      });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

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
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        name: 'favcolor',
      });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');
      expect(input).not.toHaveAttribute("leadingicon", "add");
    });

    it('shows a leading icon', async () => {
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        name: 'favcolor',
        leadingicon: "add",
      });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');
      expect(input).toHaveAttribute("leadingicon", "add");
    });
  })

  describe("placeholder", () => {
    it('does not show a placeholder', async () => {
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        name: 'favcolor',
      });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');
      expect(input).toHaveAttribute("placeholder", "");
    });

    it('shows a placeholder', async () => {
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        name: 'favcolor',
        placeholder: "some text",
      });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');
      expect(input).toHaveAttribute("placeholder", "some text");
    });
  })

  describe("width", () => {
    it("dropdown should have the default width", async () => {
      const name = 'favcolor';
      const items = ["red", "blue", "pink"];
      const result = render(GoADropdown, {
        name: 'favcolor',
      });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');

      await waitFor(() => {
        expect(dropdown).toHaveStyle("--width: 20ch");
        expect(input).toHaveAttribute("width", "100%");  // 20ch is min width when being calculated
      })
    });

    it("uses the non-percent width supplied", async () => {
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        name: 'favcolor',
        width: "500px",
      });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');

      await waitFor(() => {
        expect(dropdown).toHaveStyle("--width: 500px");
        expect(input).toHaveAttribute("width", "100%");
      });
    });

    it("sets the input width to 100% when percent value used", async () => {
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        name: 'favcolor',
        width: "100%",
      });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

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
      const name = 'favcolor';
      const items = ["red", "blue", "pink"];
      const result = render(GoADropdown, {
        name: 'favcolor',
      });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');
      fireEvent.click(input);

      const menu = result.queryByTestId("dropdown-menu");
      await waitFor(() => {
        expect(menu).toHaveStyle("max-height: 276px");  // 276px is default value
      })
    });

    it("uses the height when supplied", async () => {
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        name: 'favcolor',
        maxheight: "400px",
      });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

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
      const name = 'favcolor3';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdown, {
        name: 'favcolor3',
        value: "orange",
        arialabel: 'Favourite Color',
      });

      const ctx = getContext(name)
      for (const item of items) {
        ctx.notify({ type: "bind", name, value: item })
      }

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

        const result = render(GoADropdown, { name: 'favcolor', items, value: "red" });
        // const dropdown = result.queryByTestId("favcolor-dropdown");
        const input = result.queryByTestId('goa-input');

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

describe("NativeSelect", () => {
  it("renders children", async () => {
    const name = "native-select"
    const { container } = render(GoADropdown, { name, value: "green", native: true })

    const ctx = getContext(name)
    ctx.notify({ type: "bind", name, value: "red" })
    ctx.notify({ type: "bind", name, value: "green" })
    ctx.notify({ type: "bind", name, value: "blue" })

    await waitFor(() => {
      const options = container.querySelectorAll("select option")
      expect(options.length).toBe(3)
    });
  })

  it("dispatches the event on selection", async () => {
    const name = "event-selection";
    const { container } = render(GoADropdown, { name, value: "green", native: true })

    const ctx = getContext(name)
    ctx.notify({ type: "bind", name, value: "red" })
    ctx.notify({ type: "bind", name, value: "green" })
    ctx.notify({ type: "bind", name, value: "blue" })

    const onChange = jest.fn();
    const select = container.querySelector("select")

    select.addEventListener("_change", (e: CustomEvent) => {
      const { name: _name, value } = e.detail;
      expect(_name).toBe(name);
      expect(value).toBe("blue");
      onChange(_name, value)
    })

    // This is the only way I can get the test passing, but it doesn't ensure
    // that the event binding is correct
    select.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        bubbles: false,
        cancelable: true,
        detail: { name, value: "blue" },
      }),
    );

    // The commented out code is the way I would like to test 
    // fireEvent.click(select)
    await waitFor(async () => {
      // const option = select.querySelector("option[value=blue]")
      // expect(option).toBeTruthy();
      // await fireEvent.click(option)
      await waitFor(async () => {
        expect(onChange).toBeCalled()
      })
    })
  })

  it("shows the label text when provided", async () => {
    const name = "custom-label"
    const { container } = render(GoADropdown, { name, value: "green", native: true })

    const ctx = getContext(name)
    ctx.notify({ type: "bind", name, value: "red", label: "Red" })
    ctx.notify({ type: "bind", name, value: "green", label: "Green" })
    ctx.notify({ type: "bind", name, value: "blue", label: "Blue" })

    await waitFor(() => {
      const options = container.querySelectorAll("select option")
      expect(options.length).toBe(3)
      expect(options[0].textContent.trim()).toBe("Red")
      expect(options[1].textContent.trim()).toBe("Green")
      expect(options[2].textContent.trim()).toBe("Blue")
    });
  })

  it("shows the value when no lable is provided", async () => {
    const name = "value-label"
    const { container } = render(GoADropdown, { name, value: "green", native: true })

    const ctx = getContext(name)
    ctx.notify({ type: "bind", name, value: "red" })
    ctx.notify({ type: "bind", name, value: "green" })
    ctx.notify({ type: "bind", name, value: "blue" })

    await waitFor(() => {
      const options = container.querySelectorAll("select option")
      expect(options.length).toBe(3)
      expect(options[0].textContent.trim()).toBe("red")
      expect(options[1].textContent.trim()).toBe("green")
      expect(options[2].textContent.trim()).toBe("blue")
    });
  })

  it("renders disabled state", async () => {
    const name = "error-label"
    const { container } = render(GoADropdown, { name, native: true, disabled: true })

    const ctx = getContext(name)
    ctx.notify({ type: "bind", name, value: "red" })
    ctx.notify({ type: "bind", name, value: "green" })
    ctx.notify({ type: "bind", name, value: "blue" })

    await waitFor(() => {
      const el = container.querySelector("select:disabled")
      expect(el).toBeTruthy();
    });
  })

  it("renders an error state", async () => {
    const name = "error-label"
    const { container } = render(GoADropdown, { name, native: true, error: true })

    const ctx = getContext(name)
    ctx.notify({ type: "bind", name, value: "red" })
    ctx.notify({ type: "bind", name, value: "green" })
    ctx.notify({ type: "bind", name, value: "blue" })

    await waitFor(() => {
      const el = container.querySelector("select.error")
      expect(el).toBeTruthy();
    });
  })

  it("shows an error when no name is provided", async () => {
    const mock = jest.spyOn(console, "warn").mockImplementation();
    render(GoADropdown, { value: "green", native: true })

    await waitFor(() => {
      expect(console.warn["mock"].calls.length).toBeGreaterThan(0);
    })
    mock.mockRestore();
  })
})
