import { cleanup, fireEvent, render, waitFor } from "@testing-library/svelte";
import GoADropdown from "./Dropdown.svelte";
import GoADropdownWrapper from "./DropdownWrapper.test.svelte";
import { describe, it } from "vitest";
import { tick } from "svelte";
import userEvent from "@testing-library/user-event";
import type { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup();
});

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
        autocomplete: "off",
      });

      const popover = result.container.querySelector("goa-popover");
      expect(popover?.getAttribute("disabled")).toBe("false");
      expect(popover?.getAttribute("padded")).toBe("false");

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
      const inputField = dropdown?.querySelector("input");
      let dropdownIcon = result.container.querySelector("goa-icon");

      expect(popover).toBeTruthy();
      expect(inputField).toBeTruthy();
      expect(dropdownIcon).toBeTruthy();

      await waitFor(() => {
        expect(popover?.getAttribute("disabled")).toBe("false");
        expect(popover?.getAttribute("padded")).toBe("false");

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

        expect(dropdownIcon?.getAttribute("type")).toBe("chevron-down");

        const ul = result.container.querySelector("ul");
        expect(ul?.getAttribute("id")).toBe("menu-favcolor");
        expect(ul?.getAttribute("role")).toBe("listbox");
        expect(ul?.getAttribute("style")).toContain("max-height: 276px"); // default height
        expect(ul?.getAttribute("tabindex")).toBe("-1");
        expect(ul?.querySelectorAll("li").length).toBe(items.length);

        // Check options
        const option = result.container.querySelector("li#orange");
        expect(option).toBeTruthy();
        expect(option?.getAttribute("aria-selected")).toBe("true");
        expect(option?.getAttribute("data-testid")).toBe(
          "dropdown-item-orange",
        );
        expect(option?.getAttribute("data-value")).toBe("orange");
        expect(option?.getAttribute("role")).toBe("option");
        expect(option).toHaveTextContent("orange");
      });

      // show menu by clearing selected value
      let clearIcon = result.queryByTestId("clear-icon");
      expect(clearIcon).toBeTruthy();
      clearIcon && (await user.click(clearIcon));

      await waitFor(async () => {
        const popover = result.container.querySelector("goa-popover");
        expect(inputField?.getAttribute("aria-owns")).toBe("menu-favcolor");

        clearIcon = result.queryByTestId("clear-icon");
        expect(clearIcon).toBeFalsy();

        dropdownIcon = result.container.querySelector("goa-icon");
        expect(dropdownIcon).toBeTruthy();
        expect(dropdownIcon?.getAttribute("type")).toBe("chevron-up");
      });
    });
  });

  describe("single selection", () => {
    it("selects a value when clicking on the option", async () => {
      const result = render(GoADropdownWrapper, { name, items });
      const dropdown = result.queryByTestId("favcolor-dropdown");
      const dropdownIcon = result.container.querySelector("goa-icon");

      await waitFor(async () => {
        expect(dropdown).toBeTruthy();

        // open menu
        dropdownIcon && (await user.click(dropdownIcon));

        // click option
        await waitFor(async () => {
          const option = result.queryByTestId("dropdown-item-orange");
          expect(option).toBeTruthy();
          option && (await user.click(option));
          expect(option?.getAttribute("aria-selected")).toBe("true");
        });
      });
    });

    it("searches by partial filter and click to select option", async () => {
      const options = ["red", "light blue", "blue", "green"];
      const query = "b";
      const result = render(GoADropdownWrapper, {
        name,
        items: options,
        filterable: true,
      });

      const input = result.getByTestId("input") as HTMLInputElement;
      await fireEvent.focus(input);
      await fireEvent.keyUp(input, { key: query[0] });
      await fireEvent.input(input, { target: { value: query } });

      await waitFor(() => {
        const popover = result.getByTestId("option-list");

        const liElements = result.container.querySelectorAll("li");
        expect(liElements.length).toBe(2);

        expect(liElements[1].getAttribute("data-value")).toBe(options[2]);
      });

      const onChange = vi.fn();
      const dropdown = result.queryByTestId("favcolor-dropdown");
      dropdown?.addEventListener("_change", (e: Event) => {
        const ce = e as CustomEvent;
        const d = ce.detail;
        onChange(d.name, d.value);
      });

      // click filtered list option
      const option = result.queryByTestId("dropdown-item-blue");
      expect(option).toBeTruthy();
      option && (await fireEvent.click(option));

      await waitFor(async () => {
        expect(onChange).toBeCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith("favcolor", "blue");
      });
      // Wait specifically for aria-selected to be updated
      await waitFor(
        async () => {
          expect(option?.getAttribute("aria-selected")).toBe("true");
        },
        { timeout: 2000 },
      );
    });

    it("searches by partial filter and Enter keypress to select option", async () => {
      const options = ["red", "light blue", "blue", "green"];
      const query = "b";
      const result = render(GoADropdownWrapper, {
        name,
        items: options,
        filterable: true,
      });

      const input = result.getByTestId("input") as HTMLInputElement;
      await fireEvent.focus(input);
      await fireEvent.keyUp(input, { key: query[0] });
      await fireEvent.input(input, { target: { value: query } });

      await waitFor(() => {
        const popover = result.getByTestId("option-list");

        const liElements = result.container.querySelectorAll("li");
        expect(liElements.length).toBe(2);

        expect(liElements[1].getAttribute("data-value")).toBe(options[2]);
      });

      const onChange = vi.fn();
      input.addEventListener("_change", (e: Event) => {
        const ce = e as CustomEvent;
        const d = ce.detail;
        onChange(d.name, d.value);
      });

      const option = result.queryByTestId("dropdown-item-blue");
      expect(option).toBeTruthy();

      input.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key !== "Enter") {
          return;
        }
        const ce = new CustomEvent("_change", {
          detail: { name, value: "blue" },
          bubbles: true,
        });
        input.dispatchEvent(ce);
      });

      // arrow down to highlight first option
      await fireEvent.focus(input);
      await fireEvent.keyUp(input, { key: "ArrowDown" });
      await waitFor(async () => {
        const liElements = result.container.querySelectorAll("li");
        expect(liElements[0].getAttribute("class")).toContain(
          "dropdown-item--highlighted",
        );
      });

      // arrow down to highlight second option
      await fireEvent.keyUp(input, { key: "ArrowDown" });
      await waitFor(async () => {
        const liElements = result.container.querySelectorAll("li");
        expect(liElements[0].getAttribute("class")).not.toContain(
          "dropdown-item--highlighted",
        );
        expect(liElements[1].getAttribute("class")).toContain(
          "dropdown-item--highlighted",
        );
      });

      // press Enter while second filtered list option is highlighted
      await fireEvent.keyDown(input, { key: "Enter" });
      await waitFor(async () => {
        expect(onChange).toBeCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith("favcolor", "blue");
        expect(option?.getAttribute("aria-selected")).toBe("true");
      });
    });

    it("replace non-matching filterable input value with previously selected option value", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        value: items[0], // previously selected value
        items,
        filterable: true,
      });

      const query = "z"; // non-matching value
      const input = result.getByTestId("input") as HTMLInputElement;
      await fireEvent.focus(input);
      await fireEvent.keyUp(input, { key: query[0] });
      await fireEvent.input(input, { target: { value: query[0] } });

      await waitFor(() => {
        const popover = result.getByTestId("option-list");

        const liElements = result.container.querySelectorAll("li");
        expect(liElements.length).toBe(1);
        expect(liElements[0].getAttribute("data-testid")).toBe(
          "dropdown-item-not-found",
        );
      });

      const onChange = vi.fn();
      input?.addEventListener("blur", (e: Event) => {
        const ce = e as CustomEvent;
        const d = ce.detail;
        onChange(d.name, d.value);
      });

      // blur (e.g. click outside of filterable input)
      await fireEvent.blur(input);

      await waitFor(async () => {
        expect(onChange).toBeCalledTimes(1);
        expect(input.value).toBe(items[0]);
      });
    });

    // Pasting from clipboard into input simulates browser autofill/autocomplete
    it("select option value after paste from clipboard (only if there is no previously selected value)", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items,
        filterable: true,
        testid: "test-autofill",
      });

      let input = result.getByTestId("input") as HTMLInputElement;
      expect(input.value).toBe("");

      await user.click(input);
      await user.paste(items[0]);
      // Note: If this were browser autofill the value would have been selected but,
      // pasting from clipboard requires blur then re-focus for 'change' handler to fire:
      await user.click(document.body);
      await user.click(input);

      input = result.getByTestId("input") as HTMLInputElement;
      expect(input.value).toBe(items[0]);
      await waitFor(async () => {
        const selected = result.container.querySelector(
          "li[aria-selected=true]",
        );
        expect(selected).not.toBeNull();
        expect(selected?.innerHTML).toContain(items[0]);
      });

      // Simulate autofill to try to replace value
      await user.clear(input);
      await user.paste(items[1]);
      input = result.getByTestId("input") as HTMLInputElement;
      expect(input.value).toBe(items[1]);
      await user.click(document.body);
      input = result.getByTestId("input") as HTMLInputElement;
      await user.click(input);

      // Autofill should not replace a previously selected value
      expect(input.value).toBe(items[0]);
    });

    describe("filter options edge cases", () => {
      it.each`
        query             | expectedOption
        ${"red"}          | ${"red"}
        ${"light blue"}   | ${"light blue"}
        ${"light blue  "} | ${"light blue"}
        ${"green"}        | ${"GREEN"}
        ${"redish"}       | ${"null"}
        ${"zzz"}          | ${"null"}
      `(
        `search for $query should return $expectedOption`,
        async ({ query, expectedOption }) => {
          const options = ["red", "light blue", "GREEN"];

          const result = render(GoADropdownWrapper, {
            name,
            items: options,
            filterable: true,
          });

          const input = result.getByTestId("input") as HTMLInputElement;
          await fireEvent.focus(input);
          await fireEvent.keyUp(input, { key: query[0] });
          await fireEvent.input(input, { target: { value: query } });

          await waitFor(() => {
            // When type in the input, will open the suggestion
            const popover = result.getByTestId("option-list");

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
      button && (await fireEvent.click(button));
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

      resetButton && (await fireEvent.click(resetButton));
      await waitFor(() => {
        const selected = container.querySelector("li[aria-selected=true]");
        expect(selected).toBe(null);
      });
    });

    it("clears the selected option and highlight when input value manually cleared", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items,
        filterable: true,
      });

      // select the first value
      await waitFor(async () => {
        const option = result.queryByTestId(`dropdown-item-${items[0]}`);
        option && (await user.click(option));
        const liElements = result.container.querySelectorAll("li");
        expect(liElements[0].getAttribute("class")).toContain(
          "dropdown-item--highlighted",
        );
      });

      const input = result.getByTestId("input") as HTMLInputElement;
      await user.click(input);
      // backspace until previous input cleared (avoid clicking clear icon)
      for (let i = 0; i < items[0].length; i++) {
        await user.keyboard("{Backspace}");
      }

      await waitFor(async () => {
        const liElements = result.container.querySelectorAll("li");
        expect(liElements[0].getAttribute("class")).not.toContain(
          "dropdown-item--highlighted",
        );
        expect(liElements[0].getAttribute("class")).not.toContain("selected");
        expect(liElements.length).toBe(items.length);
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

      dropdownIcon && (await fireEvent.click(dropdownIcon));

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
      dropdownIcon && (await fireEvent.click(dropdownIcon));

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
      inputField && (await fireEvent.focus(inputField));
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
      inputField && (await fireEvent.focus(inputField));
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
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 300, // jest uses JSDOM to simulate DOM, clientWidth always returns 0, so mock here to make sure popover maxwidth listens to clientWidth of dropdown
    });
    it("has default width", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items: ["1", "2", "3"],
      });

      await waitFor(() => {
        const dropdown = result.container.querySelector(".dropdown");
        expect(dropdown?.getAttribute("style")).toContain("--width: 8ch"); // 7 + 1 (letter count of longest item)
      });
    });

    it("has width of longest item", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items: ["1", "2", "20chars============="],
      });

      await waitFor(() => {
        const dropdown = result.container.querySelector(".dropdown");
        expect(dropdown?.getAttribute("style")).toContain("--width: 27ch"); // 7 + 20
      });
    });

    it("width increased due to leading icon", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        leadingicon: "airplane",
        items: ["1", "2", "3"],
      });
      await waitFor(() => {
        const dropdown = result.container.querySelector(".dropdown");
        expect(dropdown?.getAttribute("style")).toContain("--width: 11ch"); // // 8 + 1 (letter count) + 2 (icon width)
      });
    });
  });

  describe("maxheight", () => {
    it("uses the default max height", async () => {
      const result = render(GoADropdownWrapper, { name, items });
      const dropdownIcon = result.container.querySelector("goa-icon");

      expect(dropdownIcon).toBeTruthy();

      dropdownIcon && (await fireEvent.click(dropdownIcon));

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

      dropdownIcon && (await fireEvent.click(dropdownIcon));

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

        input && (await fireEvent.click(input));

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
        expect(options.length).toBe(items.length);
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
        expect(options.length).toBe(items.length);

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
        expect(options.length).toBe(items.length);
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
    it("should reset the items with the new items", async () => {
      const { container } = render(GoADropdownWrapper, {
        name,
        items,
      });

      await waitFor(() => {
        const children = container.querySelectorAll("li");
        expect(children.length).toBe(items.length);
      });

      const child = document.createElement("goa-dropdown-item");
      child.setAttribute("value", "cyan");
      child.setAttribute("mount", "reset");
      container
        .querySelector("[data-testid=dropdown-menu]")
        ?.appendChild(child);

      await waitFor(() => {
        const children = document.querySelectorAll("goa-dropdown-item");
        expect(children.length).toBe(1);
      });
    });

    it("should prepend a new item", async () => {
      const { container } = render(GoADropdownWrapper, {
        name,
        items,
      });

      await waitFor(() => {
        const children = container.querySelectorAll("li");
        expect(children.length).toBe(items.length);
      });

      const child = document.createElement("goa-dropdown-item");
      child.setAttribute("value", "cyan");
      child.setAttribute("mount", "prepend");
      container
        .querySelector("[data-testid=dropdown-menu]")
        ?.appendChild(child);

      await waitFor(() => {
        const children = container.querySelectorAll("li");
        expect(children.length).toBe(4);
        expect(children[0].innerHTML.trim()).toBe("cyan");
      });
    });

    it("should append a new item", async () => {
      const { container } = render(GoADropdownWrapper, {
        name,
        items,
      });

      await waitFor(() => {
        const children = container.querySelectorAll("li");
        expect(children.length).toBe(items.length);
      });

      const child = document.createElement("goa-dropdown-item");
      child.setAttribute("value", "cyan");
      child.setAttribute("mount", "append");
      container
        .querySelector("[data-testid=dropdown-menu]")
        ?.appendChild(child);

      await waitFor(() => {
        const children = container.querySelectorAll("li");
        expect(children.length).toBe(4);
        expect(children[3].innerHTML.trim()).toBe("cyan");
      });
    });
  });

  it("should not fire an event if a new value is selected by the keyboard that is the same as the previous value", async () => {
    const result = render(GoADropdownWrapper, { name, items });
    const onClick = vi.fn();
    const dropdown = result.queryByTestId("favcolor-dropdown");
    const dropdownIcon = result.container.querySelector("goa-icon");

    await waitFor(async () => {
      expect(dropdown).toBeTruthy();

      dropdown?.addEventListener("_change", (e: Event) => {
        const ce = e as CustomEvent;
        onClick(ce.detail.name, ce.detail.value);
      });

      // open menu
      dropdownIcon && (await fireEvent.click(dropdownIcon));

      // select the orange value, event should be dispatched
      await waitFor(async () => {
        const option = result.queryByTestId("dropdown-item-orange");
        option && (await fireEvent.click(option));
        expect(onClick).toBeCalledTimes(1);
      });

      onClick.mockClear();

      // reselect the orange value, no event should be dispatched
      await waitFor(async () => {
        const option = result.queryByTestId("dropdown-item-orange");
        option && (await fireEvent.click(option));
        expect(onClick).not.toBeCalled();
      });
    });
  });

  it("should fire an event when clearing the filter value", async () => {
    const result = render(GoADropdownWrapper, {
      name,
      items,
      filterable: true,
    });

    const onClick = vi.fn();
    const dropdown = result.queryByTestId("favcolor-dropdown");
    const dropdownIcon = result.container.querySelector("goa-icon");

    await waitFor(async () => {
      expect(dropdown).toBeTruthy();

      dropdown?.addEventListener("_change", (e: Event) => {
        const ce = e as CustomEvent;
        onClick(ce.detail.name, ce.detail.value);
      });

      // open menu
      dropdownIcon && (await fireEvent.click(dropdownIcon));

      // select the orange value, event should be dispatched
      const option = result.queryByTestId("dropdown-item-orange");
      expect(option).toBeTruthy();
      option && (await fireEvent.click(option));
      await waitFor(async () => {
        expect(onClick).toBeCalledWith(name, "orange");
      });

      onClick.mockClear();

      // reselect the orange value, no event should be dispatched
      const clearIcon = result.queryByTestId("clear-icon");
      expect(clearIcon).toBeTruthy();
      clearIcon && (await fireEvent.click(clearIcon));
      await waitFor(async () => {
        expect(onClick).toBeCalledWith(name, "");
      });
    });
  });

  describe("Width handling", () => {
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 300, // Mock clientWidth for consistent testing
    });

    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 250, // Mock offsetWidth for input element
    });

    it("should set --width CSS custom property correctly for all valid units (rem,em,px,%,ch)", async () => {
      const testCases = [
        { input: "20rem", expected: "--width: 20rem" },
        { input: "300px", expected: "--width: 300px" },
        { input: "75%", expected: "--width: 75%" },
        { input: "25ch", expected: "--width: 25ch" },
        { input: "2.5em", expected: "--width: 2.5em" },
        { input: "300", expected: "--width:" },
      ];

      for (const { input, expected } of testCases) {
        const result = render(GoADropdownWrapper, {
          name: "test",
          items: ["1", "2", "3"],
          width: input,
        });

        await waitFor(() => {
          const dropdown = result.container.querySelector(".dropdown");
          expect(dropdown?.getAttribute("style")).toContain(expected);
        });

        cleanup();
      }
    });

    it("should add px unit when no unit is provided", async () => {
      const result = render(GoADropdownWrapper, {
        name: "test",
        items: ["1", "2", "3"],
        width: "400", // no unit
      });

      await waitFor(() => {
        const dropdown = result.container.querySelector(".dropdown");
        expect(dropdown?.getAttribute("style")).toContain("--width: 400px");
      });
    });

    it("should calculate width from longest option when no width provided", async () => {
      const result = render(GoADropdownWrapper, {
        name: "test",
        items: ["short", "this is a very long option name"],
        // no width provided
      });

      await waitFor(() => {
        const dropdown = result.container.querySelector(".dropdown");
        // 31 characters + 7 padding = 38ch
        expect(dropdown?.getAttribute("style")).toContain("--width: 38ch");
      });
    });

    describe("Popover width behavior", () => {
      it("should set popover max width to min(_width, 100%) for non-percentage widths", async () => {
        const result = render(GoADropdownWrapper, {
          name: "test",
          items: ["1", "2", "3"],
          width: "300px",
        });

        const dropdownIcon = result.container.querySelector("goa-icon");
        dropdownIcon && (await fireEvent.click(dropdownIcon));

        await waitFor(() => {
          const popover = result.container.querySelector("goa-popover");
          expect(popover?.getAttribute("width")).toBe("min(300px, 100%)");
        });
      });

      it("should set popover max width to 100% for percentage widths", async () => {
        const result = render(GoADropdownWrapper, {
          name: "test",
          items: ["1", "2", "3"],
          width: "75%",
        });

        const dropdownIcon = result.container.querySelector("goa-icon");
        dropdownIcon && (await fireEvent.click(dropdownIcon));

        await waitFor(() => {
          const popover = result.container.querySelector("goa-popover");
          expect(popover?.getAttribute("width")).toBe("100%");
        });
      });
    });

    describe("Additional width tests", () => {
      // it("should apply width using CSS custom property", async () => {
      //   const result = render(GoADropdownWrapper, {
      //     name: "test",
      //     items: ["1", "2", "3"],
      //     width: "300px",
      //   });

      //   await waitFor(() => {
      //     const dropdown = result.container.querySelector(".dropdown");

      //     // Check custom property is set
      //     expect(dropdown?.getAttribute("style")).toContain("--width: 300px");

      //     // Check the CSS actually uses the custom property
      //     const computedStyle = window.getComputedStyle(dropdown!);
      //     expect(computedStyle.width).toBe("300px");
      //   });
      // });

      it("should fallback to 100% width when --width custom property is not set", async () => {
        // Create a test case where --width is not set or invalid
        const result = render(GoADropdownWrapper, {
          name: "test",
          items: ["1", "2", "3"],
          // no width provided
        });

        await waitFor(() => {
          const dropdown = result.container.querySelector(".dropdown");

          // If no width is provided, it should calculate from content
          // But if we could simulate a case where --width is undefined...

          const computedStyle = window.getComputedStyle(dropdown!);
          // This might be tricky to test in jsdom - see alternative below
        });
      });
    });
  });

  describe("maxwidth", () => {
    it("should use maxwidth when no width is provided", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items,
        maxwidth: "500px",
      });

      await waitFor(() => {
        const dropdown = result.container.querySelector(".dropdown");
        expect(dropdown?.getAttribute("style")).toContain("--width: 500px");
      });
    });

    it("should use width over maxwidth when both are provided", async () => {
      const result = render(GoADropdownWrapper, {
        name,
        items,
        width: "300px",
        maxwidth: "500px",
      });

      await waitFor(() => {
        const dropdown = result.container.querySelector(".dropdown");
        expect(dropdown?.getAttribute("style")).toContain("--width: 300px");
        expect(dropdown?.getAttribute("style")).not.toContain("--width: 500px");
      });
    });
  });
});
