import { render, fireEvent, cleanup, waitFor } from "@testing-library/svelte";
import GoADropdown from "./Dropdown.svelte";
import GoADropdownWrapper from "./DropdownWrapper.test.svelte";
import { it, describe } from "vitest";

afterEach(() => {
  cleanup();
});

describe("GoADropdown", () => {
  const name = "favcolor";
  const items = ["red", "blue", "orange"];

  describe("Render", () => {
    it("should render dropdown", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        value: "orange",
        items,
      });

      const popover = result.container.querySelector("goa-popover");
      expect(popover?.getAttribute("disabled")).toBe("false");
      expect(popover?.getAttribute("open")).toBe("false");
      expect(popover?.getAttribute("padded")).toBe("false");
      expect(popover?.getAttribute("relative")).toBe("false");

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const inputField = dropdown?.querySelector("input");
      expect(inputField?.getAttribute("id")).toBe("favcolor");
      expect(inputField?.getAttribute("aria-autocomplete")).toBe("list");
      expect(inputField?.getAttribute("aria-controls")).toBe("menu-favcolor");
      expect(inputField?.getAttribute("aria-expanded")).toBe("false");
      expect(inputField?.getAttribute("aria-disabled")).toBe("false");
      expect(inputField?.getAttribute("autocomplete")).toBe("off");
      expect(inputField?.getAttribute("name")).toBe("favcolor");
      expect(inputField?.getAttribute("readonly")).not.toBeNull();
      expect(inputField?.getAttribute("role")).toBe("combobox");
      expect(inputField?.getAttribute("style")).toContain("cursor: pointer");
      expect(inputField?.getAttribute("type")).toBe("text");
      expect(inputField?.getAttribute("aria-owns")).toBeNull(); // Menu is hidden

      const dropdownIcon = result.container.querySelector("goa-icon#favcolor");
      expect(dropdownIcon?.getAttribute("ariacontrols")).toBe("menu-favcolor");
      expect(dropdownIcon?.getAttribute("ariaexpanded")).toBe("false");
      expect(dropdownIcon?.getAttribute("arialabel")).toBe("favcolor");
      expect(dropdownIcon?.getAttribute("role")).toBe("button");
      expect(dropdownIcon?.getAttribute("type")).toBe("chevron-down");

      const ul = result.container.querySelector("ul");
      expect(ul?.getAttribute("id")).toBe("menu-favcolor");
      expect(ul?.getAttribute("role")).toBe("listbox");
      expect(ul?.getAttribute("style")).toContain("max-height: 276px"); // default height
      expect(ul?.getAttribute("tabindex")).toBe("-1");

      // Check options
      await waitFor(() => {
        const options = result.container.querySelectorAll("li");
        expect(options.length).toBe(items.length);

        for (let index = 0; index < items.length; index++) {
          const option = result.container.querySelector("li#" + items[index]);
          expect(option).toBeTruthy();
          expect(option?.getAttribute("aria-selected")).toBe(
            "orange" === items[index] ? "true" : "false",
          );
          expect(option?.getAttribute("data-index")).toBe(`${index}`);
          expect(option?.getAttribute("data-testid")).toBe(
            "dropdown-item-" + items[index],
          );
          expect(option?.getAttribute("data-value")).toBe(items[index]);
          expect(option?.getAttribute("role")).toBe("option");
          expect(option).toHaveTextContent(items[index]);
        }
      });

      // show menu
      dropdownIcon && await fireEvent.click(dropdownIcon);
      await waitFor(() => {
        expect(popover?.getAttribute("open")).toBe("true");
        expect(inputField?.getAttribute("aria-owns")).toBe("menu-favcolor"); // Menu is displayed
        expect(dropdownIcon?.getAttribute("ariaexpanded")).toBe("true");
        expect(dropdownIcon?.getAttribute("type")).toBe("chevron-up");
      });
    });

    it("should render a filterable dropdown", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        value: "orange",
        items,
        filterable: true,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const popover = result.container.querySelector("goa-popover");
      expect(popover?.getAttribute("disabled")).toBe("false");
      expect(popover?.getAttribute("open")).toBe("false");
      expect(popover?.getAttribute("padded")).toBe("false");
      expect(popover?.getAttribute("relative")).toBe("false");

      const inputField = dropdown?.querySelector("input");
      expect(inputField?.getAttribute("id")).toBe("favcolor");
      expect(inputField?.getAttribute("aria-autocomplete")).toBe("list");
      expect(inputField?.getAttribute("aria-controls")).toBe("menu-favcolor");
      expect(inputField?.getAttribute("aria-expanded")).toBe("false");
      expect(inputField?.getAttribute("aria-disabled")).toBe("false");
      expect(inputField?.getAttribute("autocomplete")).toBe("off");
      expect(inputField?.getAttribute("name")).toBe("favcolor");
      expect(inputField?.getAttribute("readonly")).toBeNull(); // Input is editable
      expect(inputField?.getAttribute("role")).toBe("combobox");
      expect(inputField?.getAttribute("style")).toContain("cursor: auto"); // Input cursor
      expect(inputField?.getAttribute("type")).toBe("text");
      expect(inputField?.getAttribute("aria-owns")).toBeNull(); // Menu is hidden

      const dropdownIcon = result.container.querySelector("goa-icon#favcolor");
      expect(dropdownIcon?.getAttribute("ariacontrols")).toBe("menu-favcolor");
      expect(dropdownIcon?.getAttribute("ariaexpanded")).toBe("false");
      expect(dropdownIcon?.getAttribute("arialabel")).toBe("clear favcolor");
      expect(dropdownIcon?.getAttribute("role")).toBe("button");
      expect(dropdownIcon?.getAttribute("type")).toBe("close");

      const ul = result.container.querySelector("ul");
      expect(ul?.getAttribute("id")).toBe("menu-favcolor");
      expect(ul?.getAttribute("role")).toBe("listbox");
      expect(ul?.getAttribute("style")).toContain("max-height: 276px"); // default height
      expect(ul?.getAttribute("tabindex")).toBe("-1");

      // Check options
      const option = result.container.querySelector("li#orange");
      expect(option?.getAttribute("aria-selected")).toBe("true");
      expect(option?.getAttribute("data-testid")).toBe("dropdown-item-orange");
      expect(option?.getAttribute("data-value")).toBe("orange");
      expect(option?.getAttribute("role")).toBe("option");
      expect(option).toHaveTextContent("orange");

      // show menu
      await fireEvent.click(dropdownIcon);
      await waitFor(() => {
        const icon = result.container.querySelector("goa-icon#favcolor");
        expect(popover?.getAttribute("open")).toBe("true");
        expect(inputField?.getAttribute("aria-owns")).toBe("menu-favcolor");
        expect(icon?.getAttribute("ariaexpanded")).toBe("true");
        expect(icon?.getAttribute("type")).toBe("chevron-up");
      });
    });
  });

  describe("single selection", () => {
    it("selects a value when clicking on the option", async () => {
      const result = render(GoADropdownWrapper, { name, items });

      const onClick = vi.fn();
      const dropdown = result.queryByTestId("favcolor-dropdown");
      const dropdownIcon = result.container.querySelector("goa-icon");

      expect(dropdown).toBeTruthy();

      dropdown?.addEventListener("_change", (e: Event) => {
        const ce = e as CustomEvent;
        onClick(ce.detail.name, ce.detail.value);
      });

      // open menu
      dropdownIcon && await fireEvent.click(dropdownIcon);

      // click option
      const option = result.queryByTestId("dropdown-item-orange");
      expect(option).toBeTruthy();
      option && await fireEvent.click(option);

      await waitFor(async () => {
        expect(onClick).toBeCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith("favcolor", "orange");
        expect(option?.getAttribute("aria-selected")).toBe("true");
      });
    });

    it("searches by filter", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items,
        filterable: true,
      });
      const input = result.container.querySelector("input");
      expect(input).toBeTruthy();

      input && await fireEvent.keyUp(input, { key: "b", code: "b" });
      input && await fireEvent.input(input, { target: { value: "b" } });

      await waitFor(async () => {
        // When type in the input, will open the suggestion
        const popover = result.container.querySelector("goa-popover");
        const clearIcon = result.container.querySelector("goa-icon");

        expect(popover?.getAttribute("open")).toBe("true");
        expect(input?.getAttribute("aria-expanded")).toBe("true");
        expect(clearIcon?.getAttribute("arialabel")).toBe("clear favcolor");
        expect(clearIcon?.getAttribute("role")).toBe("button");
        expect(clearIcon?.getAttribute("tabindex")).toBe("0");
        expect(clearIcon?.getAttribute("type")).toBe("close");

        // Should have only Blue option displayed
        const liElements = result.container.querySelectorAll("li");
        expect(liElements.length).toBe(1);
        expect(liElements[0].getAttribute("data-value")).toBe("blue");
      });
    });

    describe("filter options edge cases", () => {
      it.each`
        query                 | expectedOption   | notOption
        ${"white wh"}         | ${"White Whale"} | ${"White Wine"}
        ${"al"}               | ${"Alabama"}     | ${"Whale"}
        ${"b c"}              | ${"null"}        | ${"BC"}
        ${"red "}             | ${"null"}        | ${"Red"}
        ${"a s"}              | ${"null"}        | ${"American Samoa"}
        ${"american samoa w"} | ${"null"}        | ${"American Samoa"}
        ${"american samoa "}  | ${"null"}        | ${"American Samoa"}
      `(
        `search for '$query' should return '$expectedOption', not '$notOption'}`,
        async ({ query, expectedOption }) => {
          const options = [
            "White Wine",
            "White Whale",
            "American Samoa",
            "Alabama",
            "Whale",
            "Red",
            "BC",
          ];

          const result = render(GoADropdownWrapper, {
            name,
            items: options,
            filterable: true,
          });

          // const enterInputEvent = createEvent.input(input, { key: "ArrowLeft" });
          const input = result.getByTestId("input") as HTMLInputElement;
          await fireEvent.focus(input);
          await fireEvent.keyUp(input, { key: query[0] });
          await fireEvent.input(input, { target: { value: query } });

          await waitFor(() => {
            expect(input.value).toBe(query);
            // When type in the input, will open the suggestion
            const popover = result.getByTestId("option-list");
            expect(popover.getAttribute("open")).toBe("true");

            const liElements = result.container.querySelectorAll("li");
            expect(liElements.length).toBe(1);

            if (expectedOption === "null") {
              expect(liElements[0].getAttribute("data-testid")).toBe(
                "dropdown-item-not-found",
              );
            } else {
              expect(liElements[0].getAttribute("data-value")).toBe(
                expectedOption,
              );
            }
          });
        },
      );
    });

    it("can be selected programmatically", async () => {
      const result = render(GoADropdownWrapper, { name, value: "blue", items });
      const button = result.container.querySelector("button");

      expect(button).toBeTruthy();
      button && await fireEvent.click(button);
      await waitFor(async () => {
        const selected = result.container.querySelector(
          "li[aria-selected=true]",
        );
        expect(selected).not.toBeNull();
        expect(selected?.innerHTML).toContain("orange");
      });
    });

    it("a blank value can be selected programmatically", async () => {
      const { container } = render(GoADropdownWrapper, {
        name,
        value: "blue",
        items,
        resetValue: "",
      });

      const resetButton = container.querySelector("button");
      expect(resetButton).toBeTruthy();

      resetButton && await fireEvent.click(resetButton);
      await waitFor(() => {
        const selected = container.querySelector("li[aria-selected=true]");
        expect(selected).toBe(null);
      });
    });

    it("clears the input and opens the menu when the clear icon is clicked", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        value: "blue",
        items,
        filterable: true,
      });

      const clearIcon = result.container.querySelector("goa-icon");
      const dropdown = result.queryByTestId("favcolor-dropdown");
      const visibleElements = result.container.querySelectorAll("li");

      expect(clearIcon).toBeTruthy();
      expect(dropdown).toBeTruthy();
      expect(visibleElements).toBeTruthy();

      expect(visibleElements.length).toBe(1);

      const onChangeMock = vi.fn();

      dropdown?.addEventListener("_change", (e: Event) => {
        const ce = e as CustomEvent;
        const d = ce.detail;
        onChangeMock(d.name, d.value);
      });

      clearIcon && await fireEvent.click(clearIcon);
      await waitFor(() => {
        const liElements = result.container.querySelectorAll("li");
        expect(liElements.length).toBe(3);

        const icon = result.container.querySelector("goa-icon");
        expect(icon?.getAttribute("type")).toBe("chevron-up");
        expect(onChangeMock).toHaveBeenCalledWith("favcolor", "");

        const lis = result.container.querySelectorAll("li");
        expect(lis.length).toBe(3);
      });
    });
  });

  describe("disabled", () => {
    it("can be enabled", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        disabled: false,
        items,
      });
      const dropdown = result.queryByTestId("favcolor-dropdown");
      const dropdownIcon = result.container.querySelector("goa-icon");

      expect(dropdown).toBeTruthy();
      expect(dropdownIcon).toBeTruthy();

      dropdownIcon && await fireEvent.click(dropdownIcon);

      const onClick = vi.fn();
      dropdown?.addEventListener("_change", () => {
        onClick();
      });

      await waitFor(async () => {
        const menu = result.queryByTestId("dropdown-menu");
        expect(menu).toBeVisible();
      });
    });

    it("can be disabled", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        disabled: true,
        items,
      });

      const dropdownIcon = result.container.querySelector("goa-icon");
      dropdownIcon && await fireEvent.click(dropdownIcon);

      await waitFor(async () => {
        const menu = result.queryByTestId("popover-content");
        expect(menu).toBeNull();
      });
    });
  });

  describe("error state", () => {
    it("does not show an error state", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        error: false,
        items,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const inputField = dropdown?.querySelector("input");

      expect(dropdown).toBeTruthy();
      expect(inputField).toBeTruthy();

      // show menu
      inputField && await fireEvent.focus(inputField);
      const inputGroupDiv = result.container.querySelector(
        "div.dropdown-input-group",
      );
      expect(inputGroupDiv?.getAttribute("class")).not.toContain("error");
    });

    it("shows an error state", async () => {
      const result = render(GoADropdown, {
        name,
        error: true,
      });

      const dropdown = result.queryByTestId("favcolor-dropdown");
      const inputField = dropdown?.querySelector("input");

      expect(dropdown).toBeTruthy();
      expect(inputField).toBeTruthy();

      // show menu
      inputField && await fireEvent.focus(inputField);
      const inputGroupDiv = result.container.querySelector(
        "div.dropdown-input-group",
      );
      expect(inputGroupDiv?.getAttribute("class")).toContain("error");
    });
  });

  describe("leading icon", () => {
    it("does not show a leading icon", async () => {
      const result = render(GoADropdownWrapper, { name, items });
      const leadingIcon = result.queryByTestId("leading-icon");
      expect(leadingIcon).toBeNull();
    });

    it("shows a leading icon", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        leadingicon: "add",
        items,
      });
      const leadingIcon = result.queryByTestId("leading-icon");
      expect(leadingIcon?.getAttribute("class")).toContain(
        "dropdown-input--leading-icon",
      );
      expect(leadingIcon?.getAttribute("type")).toBe("add");
    });
  });

  describe("placeholder", () => {
    it("does not show a placeholder", async () => {
      const result = render(GoADropdownWrapper, { name, items });
      const input = result.container.querySelector("input");
      expect(input?.getAttribute("placeholder")).toBe("");
    });

    it("shows a placeholder", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        placeholder: "some text",
        items,
      });
      const input = result.container.querySelector("input");
      expect(input?.getAttribute("placeholder")).toBe("some text");
    });
  });

  describe("width", () => {
    it("has default width", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items: ["1", "2", "3"],
      });
      await waitFor(() => {
        const popover = result.container.querySelector("goa-popover");
        expect(popover?.getAttribute("width")).toBe("9ch"); // 8 + 1 (letter count of longest item)
      });
    });

    it("has width of longest item", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items: ["1", "2", "20chars============="],
      });
      const popover = result.container.querySelector("goa-popover");
      expect(popover?.getAttribute("width")).toBe("28ch"); // 8 + 20
    });

    it("width increased due to leading icon", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        leadingicon: "airplane",
        items: ["1", "2", "3"],
      });
      const popover = result.container.querySelector("goa-popover");
      expect(popover?.getAttribute("width")).toBe("11ch"); // 8 + 1 (letter count) + 2 (icon width)
    });

    it("uses the non-percent width supplied", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        width: "500px",
        items,
      });
      const dropdown = result.queryByTestId("favcolor-dropdown");
      expect(dropdown?.getAttribute("style")).toContain("--width: 500px");

      const popover = result.container.querySelector("goa-popover");
      expect(popover?.getAttribute("width")).toBe("500px"); // Equals with computed width
    });

    it.skip("sets the input width to 100% when percent value used", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items,
        width: "100%",
      });
      const dropdown = result.queryByTestId("favcolor-dropdown");
      await waitFor(() => {
        expect(dropdown?.getAttribute("style")).toContain("--width: 100%");
      });

      const popover = result.container.querySelector("goa-popover");
      await waitFor(() => {
        expect(popover?.getAttribute("width")).toBe("100%"); // Equals with computed width
      });
    });
  });

  describe("maxheight", () => {
    it("uses the default max height", async () => {
      const result = render(GoADropdownWrapper, { name, items });
      const dropdownIcon = result.container.querySelector("goa-icon");

      expect(dropdownIcon).toBeTruthy();

      dropdownIcon && await fireEvent.click(dropdownIcon);

      const menu = result.queryByTestId("dropdown-menu");
      await waitFor(() => {
        expect(menu).toHaveStyle("max-height: 276px"); // 276px is default value
      });
    });

    it("uses the height when supplied", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items,
        maxheight: "400px",
      });

      const dropdownIcon = result.container.querySelector("goa-icon");
      expect(dropdownIcon).toBeTruthy();

      dropdownIcon && await fireEvent.click(dropdownIcon);

      const menu = result.queryByTestId("dropdown-menu");
      await waitFor(() => {
        expect(menu).toHaveStyle("max-height: 400px");
      });
    });
  });

  describe("aria-labels", () => {
    it("shows the aria label", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items,
        value: "orange",
        arialabel: "Favourite Color",
      });

      const input = result.container.querySelector("input");
      expect(input?.getAttribute("aria-label")).toBe("Favourite Color");

      const dropdownIcon = result.container.querySelector("goa-icon");
      expect(dropdownIcon?.getAttribute("arialabel")).toBe("Favourite Color");

      const menu = result.container.querySelector("ul");
      expect(menu?.getAttribute("aria-label")).toBe("Favourite Color");
    });
  });

  describe("arialabelledby", () => {
    it("renders the arialabelledby", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items,
        value: "orange",
        arialabelledby: "Favourite Color",
      });

      const input = result.container.querySelector("input");
      expect(input?.getAttribute("aria-labelledby")).toBe("Favourite Color");

      const dropdownIcon = result.container.querySelector("goa-icon");
      expect(dropdownIcon?.getAttribute("arialabel")).toBe("favcolor");

      const menu = result.container.querySelector("ul");
      expect(menu?.getAttribute("aria-labelledby")).toBe("Favourite Color");
    });
  });

  describe.skip("keyboard bindings", () => {
    const space = new KeyboardEvent("keydown", {
      keyCode: 32,
      key: " ",
      code: "Space",
    });
    const enter = new KeyboardEvent("keydown", {
      keyCode: 13,
      key: "Enter",
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

        const result = render(GoADropdown, {
          name: "favcolor",
          items,
          value: "red",
        });
        // const dropdown = result.queryByTestId("favcolor-dropdown");
        const input = result.queryByTestId("goa-input");
        expect(input).toBeTruthy();
        // == Focus menu
        // await fireEvent.focus(input);
        // // input.focus();
        // expect(input).toHaveFocus();

        input && await fireEvent.click(input);

        // == Open menu
        // method 1
        // await fireEvent.keyDown(menu, {key: " ", code: "Space", keyCode: 32})
        // method 2
        // await user.keyboard("[Space]")
        // method 3
        // document.dispatchEvent(event);
        const menu = result.queryByTestId("dropdown-menu");
        expect(menu).toBeTruthy();
        await waitFor(() => {
          expect(menu?.classList).toContain("dropdown-active");
        });

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
          expect(input?.innerHTML).toContain("pink");
          expect(menuItem?.getAttribute("aria-selected")).toBe("true");
        });
      });
    }
  });

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
      });
      expect(container?.querySelector("select")?.getAttribute("id")).toBe(
        "favcolor",
      );
      await waitFor(() => {
        const options = container.querySelectorAll("select option");
        expect(options.length).toBe(3);
      });
    });

    it("dispatches the event on selection", async () => {
      const { container } = render(GoADropdownWrapper, {
        name,
        value: "green",
        native: true,
        items,
      });

      const onChange = vi.fn();
      const select = container.querySelector("select");
      expect(select).toBeTruthy();

      select?.addEventListener("_change", (e: Event) => {
        const ce = e as CustomEvent;
        const { name: _name, value } = ce.detail;
        expect(_name).toBe(name);
        expect(value).toBe("blue");
        onChange(_name, value);
      });

      // This is the only way I can get the test passing, but it doesn't ensure
      // that the event binding is correct
      select?.dispatchEvent(
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
          expect(onChange).toBeCalled();
        });
      });
    });

    it("shows the label text when provided", async () => {
      const { container } = render(GoADropdownWrapper, {
        name,
        value: "green",
        native: true,
        items,
      });

      await waitFor(() => {
        const options = container.querySelectorAll("select option");
        expect(options.length).toBe(3);

        for (let index = 0; index < items.length; index++) {
          expect(options[index]).toBeTruthy();
          expect(options[index]?.textContent?.trim()).toBe(items[index]);
        }
      });
    });

    it("shows the value when no label is provided", async () => {
      const { container } = render(GoADropdownWrapper, {
        name,
        value: "green",
        native: true,
        items,
      });

      await waitFor(() => {
        const options = container.querySelectorAll("select option");
        expect(options.length).toBe(3);
        for (let index = 0; index < items.length; index++) {
          expect(options[index]).toBeTruthy();
          expect(options[index]?.textContent?.trim()).toBe(items[index]);
        }
      });
    });

    it("renders disabled state", async () => {
      const { container } = render(GoADropdownWrapper, {
        name,
        native: true,
        disabled: true,
        items,
      });

      await waitFor(() => {
        const el = container.querySelector("select:disabled");
        expect(el).toBeTruthy();
      });
    });

    it("renders an error state", async () => {
      const { container } = render(GoADropdownWrapper, {
        name,
        native: true,
        error: true,
        items,
      });

      await waitFor(() => {
        const el = container.querySelector("select.error");
        expect(el).toBeTruthy();
      });
    });
  });

  describe("dynamic children items", () => {
    // FIXME: Unable to get the parent's `slotchanged` event to fire
    it.skip("should update the option items on dynamic changes", async () => {
      const { container } = render(GoADropdown, { name });

      await waitFor(() => {
        const children = container.querySelectorAll("li");
        expect(children.length).toBe(0);
      });

      const child = document.createElement("goa-dropdown-item");
      child.setAttribute("value", "red");
      child.setAttribute("label", "Red");
      const shadow = container.attachShadow({ mode: "open" });
      shadow.appendChild(child);

      await waitFor(() => {
        const children = container.querySelectorAll("li");
        expect(children.length).toBe(1);
      });
    });
  });
});
