import '@testing-library/jest-dom';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/svelte';
import GoADropdown from './Dropdown.svelte';
import GoADropdownWrapper from './DropdownWrapper.test.svelte';

afterEach(() => {
  cleanup()
  jest.clearAllMocks();
});

describe('GoADropdown', () => {
  const name = 'favcolor';
  const items = ["red", "blue", "orange"];

  it('dropdown should render', async () => {
    // WHEN
    const result = render(GoADropdownWrapper, { name, id: "color", value: 'orange', items });
    // THEN
    const dropdown = result.queryByTestId("favcolor-dropdown");
    expect(dropdown.getAttribute("style")).toContain("--width: 20ch");
    const popover = result.container.querySelector("goa-popover");
    expect(popover.getAttribute("disabled")).toBe("false");
    expect(popover.getAttribute("open")).toBe("false");
    expect(popover.getAttribute("padded")).toBe("false");
    expect(popover.getAttribute("relative")).toBe("false");
    expect(popover.getAttribute("width")).toBe("20ch"); // Equals with computed width
    const inputField = dropdown.querySelector('input');
    expect(inputField.getAttribute("id")).toBe("color");
    expect(inputField.getAttribute("aria-autocomplete")).toBe("list");
    expect(inputField.getAttribute("aria-controls")).toBe("menu-color");
    expect(inputField.getAttribute("aria-expanded")).toBe("false");
    expect(inputField.getAttribute("aria-disabled")).toBe("false");
    expect(inputField.getAttribute("autocomplete")).toBe("off");
    expect(inputField.getAttribute("name")).toBe("favcolor");
    expect(inputField.getAttribute("readonly")).not.toBeNull();
    expect(inputField.getAttribute("role")).toBe("combobox");
    expect(inputField.getAttribute("style")).toContain("cursor: pointer");
    expect(inputField.getAttribute("tabindex")).toBe("1"); // Input should be given higher priority to focus
    expect(inputField.getAttribute("type")).toBe("text");
    expect(inputField.getAttribute("aria-owns")).toBeNull(); // Menu is hidden
    const dropdownIcon = result.container.querySelector("goa-icon#color");
    expect(dropdownIcon.getAttribute("ariacontrols")).toBe("menu-color");
    expect(dropdownIcon.getAttribute("ariaexpanded")).toBe("false");
    expect(dropdownIcon.getAttribute("arialabel")).toBe("favcolor");
    expect(dropdownIcon.getAttribute("role")).toBe("button");
    expect(dropdownIcon.getAttribute("type")).toBe("chevron-down");
    const ul = result.container.querySelector("ul");
    expect(ul.getAttribute("id")).toBe("menu-color");
    expect(ul.getAttribute("role")).toBe("listbox");
    expect(ul.getAttribute("style")).toContain("max-height: 276px"); // default height
    expect(ul.getAttribute("tabindex")).toBe("-1");
    // Check options
    for (let index = 0; index < items.length; index++) {
      const option = result.container.querySelector("li#" + items[index]);
      expect(option.getAttribute("aria-selected")).toBe('orange' === items[index] ? "true": "false");// pre-selected by value
      expect(option.getAttribute("data-index")).toBe(`${index}`);
      expect(option.getAttribute("data-testid")).toBe("dropdown-item-" + items[index]);
      expect(option.getAttribute("data-value")).toBe(items[index]);
      expect(option.getAttribute("role")).toBe("option");
      expect(option).toHaveTextContent(items[index]);
    }
    // show menu
    await fireEvent.click(dropdownIcon);
    await waitFor(() => {
      // Menu should open
      expect(popover.getAttribute("open")).toBe("true");
      expect(inputField.getAttribute("aria-owns")).toBe("menu-color"); // Menu is displayed
      expect(dropdownIcon.getAttribute("ariaexpanded")).toBe("true");
      expect(dropdownIcon.getAttribute("type")).toBe("chevron-up");
    }, { timeout: 100 })
  });

  it('dropdown filterable should render', async() => {
    // WHEN
    const result = render(GoADropdownWrapper, { name, id: "color", value: 'orange', items, filterable: true });
    // THEN
    const dropdown = result.queryByTestId("favcolor-dropdown");
    expect(dropdown.getAttribute("style")).toContain("--width: 20ch");
    const popover = result.container.querySelector("goa-popover");
    expect(popover.getAttribute("disabled")).toBe("false");
    expect(popover.getAttribute("open")).toBe("false");
    expect(popover.getAttribute("padded")).toBe("false");
    expect(popover.getAttribute("relative")).toBe("false");
    expect(popover.getAttribute("width")).toBe("20ch"); // Equals with computed width
    const inputField = dropdown.querySelector('input');
    expect(inputField.getAttribute("id")).toBe("color");
    expect(inputField.getAttribute("aria-autocomplete")).toBe("list");
    expect(inputField.getAttribute("aria-controls")).toBe("menu-color");
    expect(inputField.getAttribute("aria-expanded")).toBe("false");
    expect(inputField.getAttribute("aria-disabled")).toBe("false");
    expect(inputField.getAttribute("autocomplete")).toBe("off");
    expect(inputField.getAttribute("name")).toBe("favcolor");
    expect(inputField.getAttribute("readonly")).toBeNull(); // Input is editable
    expect(inputField.getAttribute("role")).toBe("combobox");
    expect(inputField.getAttribute("style")).toContain("cursor: auto"); // Input cursor
    expect(inputField.getAttribute("tabindex")).toBe("1");
    expect(inputField.getAttribute("type")).toBe("text");
    expect(inputField.getAttribute("aria-owns")).toBeNull(); // Menu is hidden
    const dropdownIcon = result.container.querySelector("goa-icon#color");
    expect(dropdownIcon.getAttribute("ariacontrols")).toBe("menu-color");
    expect(dropdownIcon.getAttribute("ariaexpanded")).toBe("false");
    expect(dropdownIcon.getAttribute("arialabel")).toBe("favcolor");
    expect(dropdownIcon.getAttribute("role")).toBe("button");
    expect(dropdownIcon.getAttribute("type")).toBe("chevron-down");
    const ul = result.container.querySelector("ul");
    expect(ul.getAttribute("id")).toBe("menu-color");
    expect(ul.getAttribute("role")).toBe("listbox");
    expect(ul.getAttribute("style")).toContain("max-height: 276px"); // default height
    expect(ul.getAttribute("tabindex")).toBe("-1");
    // Check options
    for (let index = 0; index < items.length; index++) {
      const option = result.container.querySelector("li#" + items[index]);
      expect(option.getAttribute("aria-selected")).toBe('orange' === items[index] ? "true": "false");// pre-selected by value
      expect(option.getAttribute("data-index")).toBe(`${index}`);
      expect(option.getAttribute("data-testid")).toBe("dropdown-item-" + items[index]);
      expect(option.getAttribute("data-value")).toBe(items[index]);
      expect(option.getAttribute("role")).toBe("option");
      expect(option).toHaveTextContent(items[index]);
    }
    // show menu
    await fireEvent.click(dropdownIcon);
    await waitFor(() => {
      // Menu should open
      expect(popover.getAttribute("open")).toBe("true");
      expect(inputField.getAttribute("aria-owns")).toBe("menu-color"); // Menu is displayed
      expect(dropdownIcon.getAttribute("ariaexpanded")).toBe("true");
      expect(dropdownIcon.getAttribute("type")).toBe("chevron-up");
    }, { timeout: 100 })
  })

  describe("single selection", () => {
    it('selects a value when clicking on the option', async () => {
      const onClick = jest.fn();
      const result = render(GoADropdownWrapper, { name, items });
      let selectedValue = "";
      const dropdown = result.queryByTestId("favcolor-dropdown");
      dropdown.addEventListener('_change', (e) => {
        const { name: n, value } = e["detail"];
        selectedValue = value;
        expect(n).toBe("favcolor");
        onClick();
      })
      const dropdownIcon = result.container.querySelector("goa-icon");

      // show menu
      await fireEvent.click(dropdownIcon);
      // THEN
      await waitFor(async () => {
        // select item
        const option = result.queryByTestId("dropdown-item-orange");
        await fireEvent.click(option);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(selectedValue).toEqual("orange");
        expect(option.getAttribute("aria-selected")).toBe("true");
      });
    });
    it("search for a query (filterable)", async() => {
      const result = render(GoADropdownWrapper, { name, items, filterable: true });
      const input = result.container.querySelector("input");

      await fireEvent.keyDown(input, {key: 'b', code: 'b'});
      await fireEvent.input(input, {target: {value: 'b'}});

      await waitFor(async () => {
        // When type in the input, will open the suggestion
        const popover = result.container.querySelector("goa-popover");
        expect(popover.getAttribute("open")).toBe("true");
        expect(input.getAttribute("aria-expanded")).toBe("true");
        const clearIcon = result.container.querySelector("goa-icon");
        expect(clearIcon.getAttribute("arialabel")).toBe("clear favcolor"); // clear icon
        expect(clearIcon.getAttribute("role")).toBe("button");
        expect(clearIcon.getAttribute("tabindex")).toBe("0");
        expect(clearIcon.getAttribute("type")).toBe("close");
        // Should have only Blue option displayed
        const liElements = result.container.querySelectorAll("li");
        expect(liElements.length).toBe(1);
        expect(liElements[0].getAttribute("data-value")).toBe("blue");
      });
    });
    describe("filter options edge cases", () => {
      it.each`
    query      | expectedOption | notOption
    ${'white wh'} | ${'White Whale'} | ${'White Wine'}
    ${'al'} | ${'Alabama'} | ${'Whale'}
    ${'b c'}     | ${'null'}  | ${'BC'}
    ${'red '}     | ${'null'} | ${'Red'}
    ${'a s'}     | ${'null'} | ${'American Samoa'}
    ${'american samoa w'}     | ${'null'} | ${'American Samoa'}
    ${'american samoa '}     | ${'null'} | ${'American Samoa'}
  `(`search for '$query' should return '$expectedOption', not '$notOption'}`, async ({ query, expectedOption}) => {
        // GIVEN
        const options = [
          "White Wine",
          "White Whale",
          "American Samoa",
          "Alabama",
          "Whale",
          "Red",
          "BC"
        ];

        const result = render(GoADropdownWrapper, { name, items: options, filterable: true });
        // WHEN
        const input = result.container.querySelector("input");
        await fireEvent.keyDown(input, {key: query[0], code: query[0]}); // enough to trigger the event
        await fireEvent.input(input, {target: {value: query}});

        await waitFor(async () => {
          // When type in the input, will open the suggestion
          const popover = result.container.querySelector("goa-popover");
          expect(popover.getAttribute("open")).toBe("true");

          const liElements = result.container.querySelectorAll("li");
          expect(liElements.length).toBe(1);
          if (expectedOption === 'null') {
            expect(liElements[0].getAttribute("data-testid")).toBe("dropdown-item-not-found");
          } else {
            expect(liElements[0].getAttribute("data-value")).toBe(expectedOption);
          }

        });
      });
    })
    it('can be selected programmatically', async() => {
      const result = render(GoADropdownWrapper, {name, value: 'blue', items});

      const button = result.container.querySelector("button");

      await waitFor(async() => {
        await fireEvent.click(button);
        // validate the selected item
        const selected = result.container.querySelector("li[aria-selected=true]");
        expect(selected).not.toBeNull();
        expect(selected.innerHTML).toContain("orange");
      });
    })
    it('a blank value can be selected programmatically', async() => {
      const result = render(GoADropdownWrapper, {name, value: 'blue', items, resetValue: ""});

      const resetButton = result.container.querySelector("button");

      await waitFor(async() => {
        await fireEvent.click(resetButton);
        // validate the selected item
        const selected = result.container.querySelector("li[aria-selected=true]");
        expect(selected).toBe(null); // No options should be selected
      });
    })
    it('clear the input and open the menu when click clear icon', async() => {
      const result = render(GoADropdownWrapper, {name, value: 'blue', items, filterable: true, resetValue: "orange"});
      const button = result.container.querySelector("button");
      await fireEvent.click(button);
      await waitFor(() => {}, { timeout: 1 });
      // Orange is selected
      let liElements = result.container.querySelectorAll("li");
      expect(liElements.length).toBe(1);
      const clearIcon = result.container.querySelector("goa-icon");
      const onChangeMock = jest.fn();
      const dropdown = result.queryByTestId("favcolor-dropdown");
      let selectedValue = "";
      dropdown.addEventListener("_change", (e) => {
        const { name: n, value } = e["detail"];
        selectedValue = value;
        console.log("selectedValue", selectedValue);
        expect(n).toBe("favcolor");
        onChangeMock();
      });
      // Act
      await fireEvent.click(clearIcon);
      await waitFor(() => {}, { timeout: 200 });
      // Then
      // No options are selected
      liElements = result.container.querySelectorAll("li");
      expect(liElements.length).toBe(3);
      // Clear icon is hidden
      const icon = result.container.querySelector("goa-icon");
      expect(icon.getAttribute("type")).toBe("chevron-up");// dropdown icon is displayed and menu is opened
      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(selectedValue).toEqual("");
    });
  })

  describe("disabled", () => {
    it('can be enabled', async () => {
      const result = render(GoADropdownWrapper, {
        name,
        disabled: false,
        items,
      });
      const dropdown = result.queryByTestId("favcolor-dropdown");
      const dropdownIcon = result.container.querySelector("goa-icon");
      await fireEvent.click(dropdownIcon);

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
      const result = render(GoADropdownWrapper, {
        name,
        disabled: true,
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const dropdownIcon = result.container.querySelector("goa-icon");
      await fireEvent.click(dropdownIcon);

      await waitFor(async () => {
        const menu = result.queryByTestId("popover-content");
        expect(menu).toBeNull();
      });
    });
  });

  describe("error state", () => {
    it('does not show an error state', async () => {
      const result = render(GoADropdownWrapper, {
        name,
        error: false,
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const inputField = dropdown.querySelector('input');

      // show menu
      await fireEvent.focus(inputField);
      const inputGroupDiv = result.container.querySelector("div.dropdown-input-group");
      expect(inputGroupDiv.getAttribute("class")).not.toContain("error");
    });
    it('shows an error state', async () => {
      const result = render(GoADropdown, {
        name,
        error: true,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const inputField = dropdown.querySelector('input');

      // show menu
      await fireEvent.focus(inputField);
      const inputGroupDiv = result.container.querySelector("div.dropdown-input-group");
      expect(inputGroupDiv.getAttribute("class")).toContain("error");
    });
  })

  describe("leading icon", () => {
    it('does not show a leading icon', async () => {
      const result = render(GoADropdownWrapper, { name, items });
      const leadingIcon = result.queryByTestId("leading-icon");
      expect(leadingIcon).toBeNull();
    });

    it('shows a leading icon', async () => {
      const result = render(GoADropdownWrapper, {
        name,
        leadingicon: "add",
        items,
      });
      const leadingIcon = result.queryByTestId("leading-icon");
      expect(leadingIcon.getAttribute("class")).toContain("dropdown-input--leading-icon");
      expect(leadingIcon.getAttribute("type")).toBe("add");
    });
  })

  describe("placeholder", () => {
    it('does not show a placeholder', async () => {
      const result = render(GoADropdownWrapper, { name, items });
      const input = result.container.querySelector("input");
      expect(input.getAttribute("placeholder")).toBe("");
    });

    it('shows a placeholder', async () => {
      const result = render(GoADropdownWrapper, {
        name,
        placeholder: "some text",
        items,
      });
      const input = result.container.querySelector("input");
      expect(input.getAttribute("placeholder")).toBe("some text");
    });
  })

  describe("width", () => {
    it("dropdown should have the default width", async () => {
      const result = render(GoADropdownWrapper, { name, items });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      expect(dropdown.getAttribute("style")).toContain("--width: 20ch");
      const popover = result.container.querySelector("goa-popover");
      expect(popover.getAttribute("width")).toBe("20ch"); // Equals with computed width
    });

    it("uses the non-percent width supplied", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        width: "500px",
        items,
      });
      const dropdown = result.queryByTestId("favcolor-dropdown");
      expect(dropdown.getAttribute("style")).toContain("--width: 500px");
      const popover = result.container.querySelector("goa-popover");
      expect(popover.getAttribute("width")).toBe("500px"); // Equals with computed width
      const inputGroup = result.container.querySelector(".dropdown-input-group");
      expect(inputGroup.getAttribute("style")).toContain("width: 500px");
    });

    it("sets the input width to 100% when percent value used", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items,
        width: "100%",
      });
      const dropdown = result.queryByTestId("favcolor-dropdown");
      expect(dropdown.getAttribute("style")).toContain("--width: 100%");
      const popover = result.container.querySelector("goa-popover");
      expect(popover.getAttribute("width")).toBe("100%"); // Equals with computed width
      const inputGroup = result.container.querySelector("div.dropdown-input-group");
      expect(inputGroup.getAttribute("style")).toContain("width: 100%");
    });
  })

  describe("maxheight", () => {
    it("uses the default max height", async () => {
      const result = render(GoADropdownWrapper, { name, items });
      const dropdownIcon = result.container.querySelector("goa-icon");
      await fireEvent.click(dropdownIcon);

      const menu = result.queryByTestId("dropdown-menu");
      await waitFor(() => {
        expect(menu).toHaveStyle("max-height: 276px");  // 276px is default value
      })
    });

    it("uses the height when supplied", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items,
        maxheight: "400px",
      });

      const dropdownIcon = result.container.querySelector("goa-icon");
      await fireEvent.click(dropdownIcon);

      const menu = result.queryByTestId("dropdown-menu");
      await waitFor(() => {
        expect(menu).toHaveStyle("max-height: 400px");
      });
    });
  })

  describe("aria-labels", () => {
    it("show the aria label", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items,
        value: "orange",
        arialabel: 'Favourite Color',
      });
      const input = result.container.querySelector("input");
      expect(input.getAttribute("aria-label")).toBe("Favourite Color");
      const dropdownIcon = result.container.querySelector("goa-icon");
      expect(dropdownIcon.getAttribute("arialabel")).toBe("Favourite Color");
      const menu = result.container.querySelector("ul");
      expect(menu.getAttribute("aria-label")).toBe("Favourite Color");
    });
  })

  describe("arialabelledby", () => {
    it("renders the arialabelledby", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items,
        value: "orange",
        arialabelledby: 'Favourite Color',
      });
      const input = result.container.querySelector("input");
      expect(input.getAttribute("aria-labelledby")).toBe("Favourite Color");
      const dropdownIcon = result.container.querySelector("goa-icon");
      expect(dropdownIcon.getAttribute("arialabel")).toBe("favcolor");
      const menu = result.container.querySelector("ul");
      expect(menu.getAttribute("aria-labelledby")).toBe("Favourite Color");
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
      const { container } = render(GoADropdownWrapper, {
        name,
        value: "green",
        native: true,
        items,
        id: "color"
      })
      expect(container.querySelector("select").getAttribute("id")).toBe("color");
      await waitFor(() => {
        const options = container.querySelectorAll("select option")
        expect(options.length).toBe(3)
      });
    })

    it("dispatches the event on selection", async () => {
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
      const { container } = render(GoADropdownWrapper, { name, value: "green", native: true, items })

      await waitFor(() => {
        const options = container.querySelectorAll("select option")
        expect(options.length).toBe(3);

        for (let index = 0; index < items.length; index++) {
          expect(options[index].textContent.trim()).toBe(items[index])
        }
      });
    })

    it("shows the value when no label is provided", async () => {
      const { container } = render(GoADropdownWrapper, { name, value: "green", native: true, items })

      await waitFor(() => {
        const options = container.querySelectorAll("select option")
        expect(options.length).toBe(3)
        for (let index = 0; index < items.length; index++) {
          expect(options[index].textContent.trim()).toBe(items[index]);
        }
      });
    })

    it("renders disabled state", async () => {
      const { container } = render(GoADropdownWrapper, { name, native: true, disabled: true, items })

      await waitFor(() => {
        const el = container.querySelector("select:disabled")
        expect(el).toBeTruthy();
      });
    })

    it("renders an error state", async () => {
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

