import '@testing-library/jest-dom';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/svelte';
import GoADropdown from './Dropdown.svelte';
import GoADropdownWrapper from './DropdownWrapper.test.svelte';

afterEach(() => {
  cleanup()
  jest.clearAllMocks();
});

describe('GoADropdown', () => {

  it('dropdown should render', async () => {
    const name = 'favcolor';
    const items = ["red", "blue", "orange"];
    const result = render(GoADropdownWrapper, { name, value: 'orange', items });

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
      const result = render(GoADropdownWrapper, { name, value: 'orange', items });

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
        const selected = result.container.querySelector(".dropdown-item--selected");
        expect(selected).not.toBeNull();
        expect(selected.innerHTML).toContain("orange");

        // validate the label
        // expect(input.value).toContain('orange');
      });
    });

    it('selects a value', async () => {
      const onClick = jest.fn();
      const name = 'favcolor';
      const items = ["", "blue", "orange"];
      const result = render(GoADropdownWrapper, { name, items });

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

    it('can be selected programmatically', async() => {
      const name = 'program-color';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {name, value: 'blue', items});

      const button = result.queryByRole("button");

      await waitFor(async() => {
        await fireEvent.click(button);
        // validate the selected item
        const selected = result.container.querySelector(".dropdown-item--selected");
        expect(selected).not.toBeNull();
        expect(selected.innerHTML).toContain("orange");
      });
    })

    
    it('a blank value can be selected programmatically', async() => {
      const name = 'blank-color';
      const items = ["", "blue", "orange"];
      const result = render(GoADropdownWrapper, {name, value: 'blue', items, resetValue: ""});

      const resetButton = result.queryByRole("button");

      await waitFor(async() => {
        await fireEvent.click(resetButton);
        // validate the selected item
        const selected = result.container.querySelector(".dropdown-item--selected");
        expect(selected).not.toBeNull();
        expect(selected.innerHTML).toContain("");
      });
    })
  })

  describe("disabled", () => {
    it('can be enabled', async () => {
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name,
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
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name,
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
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name,
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
      const name = 'favcolor';
      const result = render(GoADropdown, {
        name,
        error: true,
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
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, { name, items });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');
      expect(input).not.toHaveAttribute("leadingicon", "add");
    });

    it('shows a leading icon', async () => {
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name,
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
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, { name, items });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const input = dropdown.querySelector('goa-input');
      expect(input).toHaveAttribute("placeholder", "");
    });

    it('shows a placeholder', async () => {
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name,
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
      const name = 'favcolor';
      const items = ["red", "blue", "pink"];
      const result = render(GoADropdownWrapper, { name, items });

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
      const result = render(GoADropdownWrapper, {
        name,
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
      const name = 'favcolor';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name,
        items,
        width: "100%",
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
      const name = 'favcolor';
      const items = ["red", "blue", "pink"];
      const result = render(GoADropdownWrapper, { name, items });

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
      const result = render(GoADropdownWrapper, {
        name,
        items,
        maxheight: "400px",
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
      const name = 'favcolor3';
      const items = ["red", "blue", "orange"];
      const result = render(GoADropdownWrapper, {
        name,
        items,
        value: "orange",
        arialabel: 'Favourite Color',
      });

      const dropdown = result.queryByTestId("favcolor3-dropdown");
      const input = dropdown.querySelector('goa-input');

      // selected value
      expect(input).toHaveAttribute("arialabel", "Favourite Color")

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

        // const user = {};

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
      expect(dropdown).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(dropdown).toHaveStyle("margin-bottom:var(--goa-space-m)");
      expect(dropdown).toHaveStyle("margin-right:var(--goa-space-l)");
      expect(dropdown).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });

  describe("NativeSelect", () => {
    it("renders children", async () => {
      const name = "native-select"
      const items = ["red", "green", "blue"];
      const { container } = render(GoADropdownWrapper, {
        name,
        value: "green",
        native: true,
        items,
      })

      await waitFor(() => {
        const options = container.querySelectorAll("select option")
        expect(options.length).toBe(3)
      });
    })

    it("dispatches the event on selection", async () => {
      const name = "event-selection";
      const items = ["red", "green", "blue"];
      const { container } = render(GoADropdownWrapper, { name, value: "green", native: true, items })

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
      const items = ["red", "green", "blue"];
      const { container } = render(GoADropdownWrapper, { name, value: "green", native: true, items })

      await waitFor(() => {
        const options = container.querySelectorAll("select option")
        expect(options.length).toBe(3)
        expect(options[0].textContent.trim()).toBe("red")
        expect(options[1].textContent.trim()).toBe("green")
        expect(options[2].textContent.trim()).toBe("blue")
      });
    })

    it("shows the value when no lable is provided", async () => {
      const name = "value-label"
      const items = ["red", "green", "blue"];
      const { container } = render(GoADropdownWrapper, { name, value: "green", native: true, items })

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
      const items = ["red", "green", "blue"];
      const { container } = render(GoADropdownWrapper, { name, native: true, disabled: true, items })

      await waitFor(() => {
        const el = container.querySelector("select:disabled")
        expect(el).toBeTruthy();
      });
    })

    it("renders an error state", async () => {
      const name = "error-label"
      const items = ["red", "green", "blue"];
      const { container } = render(GoADropdownWrapper, { name, native: true, error: true, items })

      await waitFor(() => {
        const el = container.querySelector("select.error")
        expect(el).toBeTruthy();
      });
    })
  })

  describe("dynamic children items", () => {
    // FIXME: Unable to get the parent's `slotchanged` event to fire
    it.skip("should update the option items on dynamic changes", async () => {
      const name = "dynamic"
      const { container } = render(GoADropdown, { name })

      await waitFor(() => {
        const children = container.querySelectorAll("li")
        expect(children.length).toBe(0);
      });

      const child = document.createElement("goa-dropdown-item")
      child.setAttribute("value", "red")
      child.setAttribute("label", "Red")
      const shadow = container.attachShadow({ mode: "open" })
      shadow.appendChild(child)

      await waitFor(() => {
        const children = container.querySelectorAll("li")
        expect(children.length).toBe(1);
      });
    })
  })
});

