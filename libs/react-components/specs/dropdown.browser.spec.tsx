import { render } from "vitest-browser-react";

import { GoabAccordion, GoabDropdown, GoabDropdownItem } from "../src";
import { expect, describe, it, vi } from "vitest";
import { page, userEvent } from "@vitest/browser/context";

// Slotted content's DOM parent stays in the light DOM even once assigned, so
// closest("li") can't cross the shadow boundary into the menu. Item content
// crosses two shadow boundaries (the item's own default slot, then the
// dropdown's named option-{value} slot), so walk assignedSlot repeatedly,
// hopping to each slot's shadow host, until the named option slot is found.
function findAssignedSlot(el: Element | null): HTMLSlotElement | null {
  let current: Element | null = el;
  while (current) {
    const slot = (current as HTMLElement).assignedSlot;
    if (!slot) {
      current = current.parentElement;
      continue;
    }
    if (slot.getAttribute("name")?.startsWith("option-")) {
      return slot;
    }
    const root = slot.getRootNode();
    current = root instanceof ShadowRoot ? (root.host as Element) : null;
  }
  return null;
}

describe("Dropdown", () => {
  const noop = () => {
    // noop
  };

  describe("Dropdown", () => {

    it("should render with the default props", async () => {

      // Setup

      const Component = () => {
        return (
          <GoabDropdown name="favcolor" testId="dropdown" onChange={noop}>
            <GoabDropdownItem label="Red" value="red" />
            <GoabDropdownItem label="Blue" value="blue" />
            <GoabDropdownItem label="Green" value="green" />
          </GoabDropdown>
        );
      };

      const result = render(<Component />);

      // Result

      await vi.waitFor(() => {
        const popover = result.getByTestId("option-list");
        const dropdownIcon = result.getByTestId("chevron");
        const inputField = result.getByRole("combobox");

        // popover
        expect(popover.element().getAttribute("disabled")).toBeNull();
        expect(popover.element().getAttribute("open")).toBe("false");
        expect(popover.element().getAttribute("padded")).toBeNull();
        expect(inputField.element().getAttribute("aria-autocomplete")).toBe("list");
        expect(inputField.element().getAttribute("aria-controls")).toBe("menu-favcolor");
        expect(inputField.element().getAttribute("aria-expanded")).toBe("false");
        expect(inputField.element().getAttribute("aria-disabled")).toBe("false");
        expect(inputField.element().getAttribute("autocomplete")).toBe("off");
        expect(inputField.element().getAttribute("name")).toBe("favcolor");
        expect(inputField.element().getAttribute("readonly")).not.toBeNull();
        expect(inputField.element().getAttribute("role")).toBe("combobox");
        expect(inputField.element().getAttribute("style")).toContain("cursor: pointer");
        expect(inputField.element().getAttribute("type")).toBe("text");
        expect(inputField.element().getAttribute("aria-owns")).toBeNull(); // Menu is hidden

        // icon
        expect(dropdownIcon.element().getAttribute("data-type")).toBe("chevron-down");
      });
    });

    it("should perform action when menu item clicked", async () => {

      const handleChange = vi.fn();

      // Setup
      const Component = () => {
        return (
          <GoabDropdown name="favcolor" testId="dropdown" onChange={handleChange}>
            <GoabDropdownItem label="Red" value="red" />
            <GoabDropdownItem label="Blue" value="blue" />
            <GoabDropdownItem label="Green" value="green" />
          </GoabDropdown>
        );
      };

      const result = render(<Component />);
      const dropdown = result.getByTestId("dropdown");
      const menuItem1 = result.getByTestId("dropdown-item-red");

      // Actions

      await dropdown.click();
      await menuItem1.click();

      // Result

      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledTimes(1);
        const detail = handleChange.mock.calls[0][0];
        expect(detail.name).toEqual("favcolor");
        expect(detail.value).toEqual("red");
        expect(detail.event).toBeInstanceOf(Event);
      });
    });

    describe("item slots", () => {
      it("renders rich item content inside the menu and selects it", async () => {
        const handleChange = vi.fn();

        const Component = () => {
          return (
            <GoabDropdown name="rich" testId="dropdown" onChange={handleChange}>
              <GoabDropdownItem value="red" label="Red">
                <div data-testid="rich-red">
                  <strong>Red</strong>
                  <span>Warm color</span>
                </div>
              </GoabDropdownItem>
              <GoabDropdownItem value="blue" label="Blue" />
            </GoabDropdown>
          );
        };

        const result = render(<Component />);
        const dropdown = result.getByTestId("dropdown");
        await dropdown.click();

        const richContent = result.getByTestId("rich-red");
        await vi.waitFor(() => {
          const slot = findAssignedSlot(richContent.element());
          expect(slot).not.toBeNull();
          expect(slot?.getAttribute("name")).toBe("option-red");
          expect(slot?.closest("li")).not.toBeNull();
          expect(richContent.element().textContent).toContain("Warm color");
        });

        const menuItem = result.getByTestId("dropdown-item-red");
        await menuItem.click();

        await vi.waitFor(() => {
          expect(handleChange).toHaveBeenCalledTimes(1);
          const detail = handleChange.mock.calls[0][0];
          expect(detail.value).toEqual("red");
          const inputField = result.getByRole("combobox").element() as HTMLInputElement;
          expect(inputField.value).toBe("Red");
        });
      });

      it("renders rich item content when nested inside another element (e.g. an Angular-style wrapper)", async () => {
        // Reproduces the framework-wrapper case where the actual dropdown item
        // custom element is not a direct child of the dropdown, but is nested
        // one level deeper (as Angular's goab-dropdown-item does). Slot
        // assignment must walk up to the correct direct-child ancestor.
        const Component = () => {
          return (
            <GoabDropdown name="nested" testId="dropdown" onChange={noop}>
              <div>
                <GoabDropdownItem value="red" label="Red">
                  <div data-testid="rich-red">Rich Red</div>
                </GoabDropdownItem>
              </div>
            </GoabDropdown>
          );
        };

        const result = render(<Component />);
        const dropdown = result.getByTestId("dropdown");
        await dropdown.click();

        const richContent = result.getByTestId("rich-red");
        await vi.waitFor(() => {
          const slot = findAssignedSlot(richContent.element());
          expect(slot).not.toBeNull();
          expect(slot?.getAttribute("name")).toBe("option-red");
          expect(slot?.closest("li")).not.toBeNull();
        });
      });
    });

    describe("Width", () => {
      it("uses the width supplied", async () => {
        const Component = () => {
          return (
            <GoabDropdown name="favcolor" testId="favcolor" width="500px" onChange={noop}>
              <GoabDropdownItem label="Red" value="red" />
              <GoabDropdownItem label="Blue" value="blue" />
              <GoabDropdownItem label="Green" value="green" />
            </GoabDropdown>
          )
        }

        const result = render(<Component />);

        const dropdown = result.getByTestId("favcolor");
        const popover = result.getByTestId("option-list");
        const popoverDiv = result.getByTestId("popover");

        await vi.waitFor(async () => {
          expect(dropdown.element().getAttribute("style")).toContain("--width: 500px");
          await dropdown.click();
          expect(popover.element().getAttribute("open")).toBe("true");
          expect(popoverDiv.element().getAttribute("style")).toContain("500px");
        })
      });

      it("actually applis width using CSS custom property", async () => {
        const Component = () => {
          return (
            <GoabDropdown name="favcolor" testId="favcolor" width="300px" onChange={noop}>
              <GoabDropdownItem label="Red" value="red" />
              <GoabDropdownItem label="Blue" value="blue" />
              <GoabDropdownItem label="Green" value="green" />
            </GoabDropdown>
          );
        };

        const result = render(<Component />);
        const dropdown = result.getByTestId("favcolor");

        await vi.waitFor(() => {
          // Check custom property is set
          expect(dropdown.element().getAttribute("style")).toContain("--width: 300px");

          // Check it is actually applied
          const computedStyle = window.getComputedStyle(dropdown.element());
          expect(computedStyle.width).toBe("300px");
        });
      });

      it("uses maxWidth value as width when width prop not supplied", async () => {
        const Component = () => (
          <GoabDropdown
            name="favcolor"
            testId="favcolor-maxonly"
            maxWidth="320px"
            onChange={noop}
          >
            <GoabDropdownItem label="Red" value="red" />
            <GoabDropdownItem label="Blue" value="blue" />
            <GoabDropdownItem label="Green" value="green" />
          </GoabDropdown>
        );

        const result = render(<Component />);
        const dropdown = result.getByTestId("favcolor-maxonly");

        await vi.waitFor(() => {
          const styleAttr = dropdown.element().getAttribute("style") || "";
          // internal logic sets --width to maxWidth when width not provided
          expect(styleAttr).toContain("--width: 320px");
          const computedStyle = window.getComputedStyle(dropdown.element());
          expect(computedStyle.width).toBe("320px");
        });
      });

      it("ignores maxwidth when width prop is provided", async () => {
        const Component = () => (
          <GoabDropdown
            name="favcolor"
            testId="favcolor-width-wins"
            width="800px"
            maxWidth="320px"
            onChange={noop}
          >
            <GoabDropdownItem label="Red" value="red" />
            <GoabDropdownItem label="Blue" value="blue" />
            <GoabDropdownItem label="Green" value="green" />
          </GoabDropdown>
        );

        const result = render(<Component />);
        const dropdown = result.getByTestId("favcolor-width-wins");
        await vi.waitFor(() => {
          const styleAttr = dropdown.element().getAttribute("style") || "";
          expect(styleAttr).toContain("--width: 800px");
          const computedStyle = window.getComputedStyle(dropdown.element());
          expect(parseFloat(computedStyle.width)).toBeGreaterThan(320);
        });
      });

      it("caps natural width with percentage maxWidth (container-controlled)", async () => {
        const Component = () => (
          <div style={{ width: "600px" }} data-testid="container-600">
            <GoabDropdown
              name="favcolor"
              testId="percentage-maxwidth-dropdown"
              maxWidth="50%"
              onChange={noop}
            >
              <GoabDropdownItem
                label="Extremely Long Option Label To Grow Width"
                value="long"
              />
              <GoabDropdownItem label="Blue" value="blue" />
              <GoabDropdownItem label="Green" value="green" />
            </GoabDropdown>
          </div>
        );

        const result = render(<Component />);
        const dropdown = result.getByTestId("percentage-maxwidth-dropdown");
        const container = result.getByTestId("container-600");

        await vi.waitFor(() => {
          const containerWidth = parseFloat(
            window.getComputedStyle(container.element()).width,
          );
          const computedWidth = parseFloat(
            window.getComputedStyle(dropdown.element()).width,
          );
          // Target ~300px (50% of 600) within tolerance
          expect(computedWidth).toBeGreaterThan(250);
          expect(computedWidth).toBeLessThan(310);
          expect(Math.abs(computedWidth - containerWidth * 0.5)).toBeLessThanOrEqual(15);
        });
      });

      it("caps natural width with character (ch) maxWidth", async () => {
        const Component = () => (
          <GoabDropdown
            name="favcolor"
            testId="ch-maxwidth-dropdown"
            maxWidth="25ch"
            onChange={noop}
          >
            <GoabDropdownItem label="Red" value="red" />
            <GoabDropdownItem label="Blue" value="blue" />
            <GoabDropdownItem label="Green" value="green" />
          </GoabDropdown>
        );

        const result = render(<Component />);
        const dropdown = result.getByTestId("ch-maxwidth-dropdown");

        await vi.waitFor(() => {
          const pxWidth = parseFloat(window.getComputedStyle(dropdown.element()).width);
          expect(pxWidth).toBeGreaterThan(50);
          expect(pxWidth).toBeLessThan(600);
        });
      });

      it("supports percentage width units", async () => {
        const Component = () => {
          return (
            <GoabDropdown
              name="favcolor"
              testId="percentage-dropdown"
              width="75%"
              onChange={noop}
            >
              <GoabDropdownItem label="Red" value="red" />
              <GoabDropdownItem label="Blue" value="blue" />
              <GoabDropdownItem label="Green" value="green" />
            </GoabDropdown>
          );
        };

        const result = render(<Component />);
        const dropdown = result.getByTestId("percentage-dropdown");

        await vi.waitFor(() => {
          // Check that width is set with percentage unit
          const styleAttr = dropdown.element().getAttribute("style") || "";
          expect(styleAttr).toContain("--width: 75%");

          // Check computed width is percentage of container
          const computedStyle = window.getComputedStyle(dropdown.element());
          expect(computedStyle.width).toMatch(/^\d+(\.\d+)?px$/); // Should be converted to pixels

          // Check that it's a reasonable percentage width (should be substantial but not too large)
          const dropdownWidth = parseFloat(computedStyle.width);
          expect(dropdownWidth).toBeGreaterThan(100); // Should be substantial
          expect(dropdownWidth).toBeLessThan(800); // But not too large for 75%
        });
      });

      it("supports character (ch) width units", async () => {
        const Component = () => {
          return (
            <GoabDropdown
              name="favcolor"
              testId="ch-dropdown"
              width="30ch"
              onChange={noop}
            >
              <GoabDropdownItem label="Red" value="red" />
              <GoabDropdownItem label="Blue" value="blue" />
              <GoabDropdownItem label="Green" value="green" />
            </GoabDropdown>
          );
        };

        const result = render(<Component />);
        const dropdown = result.getByTestId("ch-dropdown");

        await vi.waitFor(() => {
          // Check that width is set with ch unit
          const styleAttr = dropdown.element().getAttribute("style") || "";
          expect(styleAttr).toContain("--width: 30ch");

          // Check computed width is applied
          const computedStyle = window.getComputedStyle(dropdown.element());
          expect(computedStyle.width).toMatch(/^\d+(\.\d+)?px$/); // Browser converts ch to px

          // Should have a reasonable width (ch is approximately font width)
          const dropdownWidth = parseFloat(computedStyle.width);
          expect(dropdownWidth).toBeGreaterThan(200); // Should be substantial width
          expect(dropdownWidth).toBeLessThan(600); // But not too large
        });
      });

      it("keeps the input width aligned when nested in a query container", async () => {
        const Component = () => (
          <GoabAccordion heading="Dropdown container" open>
            <GoabDropdown
              name="page"
              testId="nested-dropdown"
              size="compact"
              onChange={noop}
            >
              <GoabDropdownItem label="1" value="1" />
              <GoabDropdownItem label="10" value="10" />
            </GoabDropdown>
          </GoabAccordion>
        );

        render(<Component />);
        await vi.waitFor(() => {
          expect(
            document.querySelector("goa-dropdown"),
          ).not.toBeNull();
        });

        const dropdownHost = document.querySelector<HTMLElement>("goa-dropdown");
        const dropdown = dropdownHost?.shadowRoot?.querySelector<HTMLElement>(
          '[data-testid="nested-dropdown"]',
        );
        const inputGroup = dropdownHost?.shadowRoot?.querySelector<HTMLElement>(
          ".dropdown-input-group",
        );

        if (!dropdown || !inputGroup) {
          throw new Error("Dropdown internals were not rendered");
        }

        await vi.waitFor(() => {
          expect(inputGroup.getBoundingClientRect().width).toBeCloseTo(
            dropdown.getBoundingClientRect().width,
            0,
          );
        });
      });

      it("defaults to px when no unit is provided", async () => {
        const Component = () => {
          return (
            <GoabDropdown
              name="favcolor"
              testId="no-unit-dropdown"
              width="250"
              onChange={noop}
            >
              <GoabDropdownItem label="Red" value="red" />
              <GoabDropdownItem label="Blue" value="blue" />
              <GoabDropdownItem label="Green" value="green" />
            </GoabDropdown>
          );
        };

        const result = render(<Component />);
        const dropdown = result.getByTestId("no-unit-dropdown");

        await vi.waitFor(() => {
          // Check that width is converted to px when no unit provided
          const styleAttr = dropdown.element().getAttribute("style") || "";
          expect(styleAttr).toContain("--width: 250px");

          // Check computed width matches expected px value
          const computedStyle = window.getComputedStyle(dropdown.element());
          expect(computedStyle.width).toBe("250px");
        });
      });
    });

    it("dispatches onFocus and onBlur when focus enters and leaves the dropdown", async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();

      const Component = () => {
        return (
          <div>
            <GoabDropdown
              name="favcolor"
              testId="dropdown"
              onChange={noop}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              <GoabDropdownItem label="Red" value="red" />
              <GoabDropdownItem label="Blue" value="blue" />
              <GoabDropdownItem label="Green" value="green" />
            </GoabDropdown>
            <input data-testid="outside-input" />
          </div>
        );
      };

      const result = render(<Component />);
      const input = result.getByRole("combobox");
      const outside = result.getByTestId("outside-input");

      await vi.waitFor(() => {
        expect(input.element()).toBeTruthy();
      });

      (input.element() as HTMLInputElement).focus();

      await vi.waitFor(() => {
        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onFocus.mock.calls[0][0].name).toBe("favcolor");
      });

      (outside.element() as HTMLInputElement).focus();

      await vi.waitFor(() => {
        expect(onBlur).toHaveBeenCalledTimes(1);
        expect(onBlur.mock.calls[0][0].name).toBe("favcolor");
      });
    });

    describe("Popover position", () => {
      it.skip("should display popover above when dropdown is at the bottom of the view port", async () => {
        const Component = () => {
          return (
            <>
              {/* Add space to make page scrollable */}
              <div style={{ height: "2000px" }}></div>
              <div style={{ position: "relative" }}>
                <GoabDropdown name="favcolor" testId="dropdown" onChange={noop}>
                  <GoabDropdownItem label="Red" value="red" />
                  <GoabDropdownItem label="Blue" value="blue" />
                  <GoabDropdownItem label="Green" value="green" />
                </GoabDropdown>
              </div>
            </>
          );
        }

        const result = render(<Component />);
        const dropdown = result.getByTestId("dropdown");
        const lastOption = result.getByText("Green");

        // Scroll to the bottom of the page
        window.scrollTo(0, document.body.scrollHeight);

        await dropdown.click();

        await vi.waitFor(() => {
          const dropdownRect = dropdown.element().getBoundingClientRect();
          const lastOptionRect = lastOption.element().getBoundingClientRect();
          expect(lastOptionRect.bottom).toBeLessThan(dropdownRect.top);
        });
      })

      it("should maintain popover width equal to dropdown width when container resizes", async () => {
        const Component = () => {
          return (
            <GoabDropdown
              name="favcolor"
              testId="dropdown"
              width={"300px"}
              onChange={noop}
            >
              <GoabDropdownItem label="Red" value="red" />
              <GoabDropdownItem label="Blue" value="blue" />
              <GoabDropdownItem label="Green" value="green" />
            </GoabDropdown>
          );
        };

        const result = render(<Component />);
        const dropdown = result.getByTestId("dropdown");
        await dropdown.click();
        await vi.waitFor(async () => {
          const dropdownOption = result.getByText("Green");
          expect(dropdownOption).toBeDefined();
          const dropdownRect = dropdown.element().getBoundingClientRect();
          const dropdownOptionRect = dropdownOption.element().getBoundingClientRect();
          expect(Math.abs(dropdownOptionRect.width - dropdownRect.width)).toBeLessThanOrEqual(1);
        });
      });

      it("should maintain dropdown option width equal to input width in narrow viewport", async () => {
        // Set viewport to narrow width - bug 2441
        await page.viewport(250, 800);
        const Component = () => {
          return (
            <GoabDropdown name="favcolor" testId="dropdown" width={"100%"} onChange={noop}>
              <GoabDropdownItem label="Red" value="red" />
              <GoabDropdownItem label="Blue" value="blue" />
              <GoabDropdownItem label="Green" value="green" />
            </GoabDropdown>
          );
        };

        const result = render(<Component />);
        const dropdown = result.getByTestId("dropdown");
        await dropdown.click();
        await vi.waitFor(async () => {
          const dropdownOption = result.getByText("Green");
          const dropdownRect = dropdown.element().getBoundingClientRect();
          const dropdownOptionRect = dropdownOption.element().getBoundingClientRect();
          expect(Math.abs(dropdownOptionRect.width - dropdownRect.width)).toBeLessThanOrEqual(1);
        });
      });

      it("keeps the option list anchored to the input near the right edge of the screen", async () => {
        await page.viewport(1280, 800);
        const Component = () => (
          <div style={{ position: "absolute", top: 0, left: "1050px" }}>
            <GoabDropdown
              name="edge"
              testId="edge-dropdown"
              width="200px"
              onChange={noop}
            >
              <GoabDropdownItem label="Red" value="red" />
              <GoabDropdownItem label="Blue" value="blue" />
            </GoabDropdown>
          </div>
        );

        const result = render(<Component />);
        const dropdown = result.getByTestId("edge-dropdown");
        const popoverContent = result.getByTestId("popover-content");
        const popoverTarget = result.getByTestId("popover-target");

        await dropdown.click();

        await vi.waitFor(() => {
          expect(popoverContent).toBeVisible();
          const content = popoverContent.element().getBoundingClientRect();
          const target = popoverTarget.element().getBoundingClientRect();
          // A fixed-width option list matches its input's width, so it can never be
          // squeezed by the screen edge: it stays anchored to the input's left edge.
          expect(Math.abs(content.left - target.left)).toBeLessThanOrEqual(2);
          expect(Math.abs(content.width - target.width)).toBeLessThanOrEqual(2);
        });
      });
    })
  })

  describe("Filterable Dropdown", () => {
    it("focuses the input when the caret opens the menu", async () => {
      const Component = () => (
        <GoabDropdown name="favcolor" onChange={noop} filterable={true}>
          <GoabDropdownItem label="Red" value="red" />
          <GoabDropdownItem label="Blue" value="blue" />
          <GoabDropdownItem label="Green" value="green" />
        </GoabDropdown>
      );

      const result = render(<Component />);
      const caret = result.getByTestId("chevron");
      const input = result.getByRole("combobox");

      await vi.waitFor(() => {
        expect(input).toBeVisible();
      });

      const inputEl = input.element() as HTMLInputElement;

      await caret.click();

      await vi.waitFor(() => {
        expect(inputEl.getAttribute("aria-expanded")).toBe("true");
        expect(inputEl.matches(":focus")).toBe(true);
      });

      await userEvent.keyboard("B");

      await vi.waitFor(() => {
        expect(inputEl.value).toBe("B");
      });
    });

    it("should render with the default props", async () => {
      // Setup
      const Component = () => {
        return (
          <GoabDropdown
            name="favcolor"
            testId="dropdown"
            onChange={noop}
            filterable={true}
          >
            <GoabDropdownItem label="Red" value="red" />
            <GoabDropdownItem label="Blue" value="blue" />
            <GoabDropdownItem label="Green" value="green" />
          </GoabDropdown>
        );
      };

      const result = render(<Component />);
      const dropdown = result.getByTestId("dropdown");

      // Actions

      await dropdown.click();

      // Result

      await vi.waitFor(() => {
        const input = result.getByRole("combobox");
        const popover = result.getByTestId("option-list");
        const dropdownIcon = result.getByTestId("chevron");

        expect(input.element().getAttribute("id")).toBe("favcolor");
        expect(input.element().getAttribute("aria-autocomplete")).toBe("list");
        expect(input.element().getAttribute("aria-controls")).toBe("menu-favcolor");
        expect(input.element().getAttribute("aria-expanded")).toBe("true");
        expect(input.element().getAttribute("aria-disabled")).toBe("false");
        expect(input.element().getAttribute("autocomplete")).toBe("off");
        expect(input.element().getAttribute("name")).toBe("favcolor");
        expect(input.element().getAttribute("readonly")).toBeNull();
        expect(input.element().getAttribute("role")).toBe("combobox");
        expect(input.element().getAttribute("style")).toContain("cursor: auto");
        expect(input.element().getAttribute("type")).toBe("text");
        expect(input.element().getAttribute("aria-owns")).not.toBeNull(); // Menu is shown

        // popover
        expect(popover.element().getAttribute("disabled")).toBeFalsy();
        expect(popover.element().getAttribute("open")).toBeTruthy();
        expect(popover.element().getAttribute("padded")).toBeFalsy();
        expect(popover.element().getAttribute("relative")).toBeFalsy();

        // icon
        expect(dropdownIcon.element().getAttribute("data-type")).toBe("chevron-up");
      });
    })

    it("should filter the items", async () => {

      // Setup
      const Component = () => {
        return (
          <GoabDropdown name="favcolor" onChange={noop} filterable={true}>
            <GoabDropdownItem label="Red" value="red" />
            <GoabDropdownItem label="Blue" value="blue" />
            <GoabDropdownItem label="Green" value="green" />
          </GoabDropdown>
        );
      };

      const result = render(<Component />);
      const filter = result.getByTestId("input");

      // Actions

      await userEvent.type(filter, "Blue");

      // Result

      await vi.waitFor(() => {
        ["red", "green"].forEach((item) => {
          const ddi = result.getByTestId(`dropdown-item-${item}`);
          expect(ddi.elements().length).toBe(0);
        });
      })
    });

    it("preserves text selection when Shift+Home and Shift+End are pressed", async () => {
      const Component = () => (
        <GoabDropdown name="favcolor" onChange={noop} filterable={true}>
          <GoabDropdownItem label="Red" value="red" />
          <GoabDropdownItem label="Blue" value="blue" />
          <GoabDropdownItem label="Green" value="green" />
        </GoabDropdown>
      );

      const result = render(<Component />);
      const filter = result.getByTestId("input");

      await userEvent.type(filter, "Green");
      const input = filter.element() as HTMLInputElement;

      input.setSelectionRange(2, 2);
      await userEvent.keyboard("{Shift>}{Home}{/Shift}");
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(2);

      input.setSelectionRange(2, 2);
      await userEvent.keyboard("{Shift>}{End}{/Shift}");
      expect(input.selectionStart).toBe(2);
      expect(input.selectionEnd).toBe(input.value.length);
    });

    it("clears the input and opens the menu when the clear icon is clicked", async () => {
      // Setup

      const Component = () => {
        return (
          <GoabDropdown name="favcolor" value={"blue"} onChange={noop} filterable={true}>
            <GoabDropdownItem label="Red" value="red" />
            <GoabDropdownItem label="Blue" value="blue" />
            <GoabDropdownItem label="Green" value="green" />
          </GoabDropdown>
        );
      };

      const result = render(<Component />);
      const clearIcon = result.getByTestId("clear-icon");

      // Actions

      await clearIcon.click();

      // Result

      await vi.waitFor(() => {
        ["red", "blue", "green"].forEach((item) => {
          const option = result.getByTestId(`dropdown-item-${item}`);
          expect(option.element()).toBeTruthy();
        });
      });
    });
  });

  describe("Keyboard bindings", () => {
    it("should show the dropdown menu when SPACE is clicked", async () => {
      // Setup

      const Component = () => {
        return (
          <GoabDropdown name="favcolor" onChange={noop}>
            <GoabDropdownItem label="Red" value="red" />
            <GoabDropdownItem label="Blue" value="blue" />
            <GoabDropdownItem label="Green" value="green" />
          </GoabDropdown>
        );
      };

      const result = render(<Component />);

      await vi.waitFor(async () => {
        const input = result.getByRole("combobox");
        const popover = result.getByTestId("option-list");

        // Actions

        const inputEl = input.element() as HTMLInputElement;
        inputEl.focus();
        await userEvent.keyboard("{Space}");

        // Result

        expect(popover.element().getAttribute("open")).toBe("true");
      });
    })
  })

  describe("Dropdown reset", () => {
    it("should reduce the number of element displayed within the dropdown", async () => {
      let values: string[] = ["red", "blue", "green"]

      const Component = () => {
        return (
          <GoabDropdown name="favcolor" onChange={noop}>
            {values.map((item) =>
              <GoabDropdownItem label={item} value={item} key={item} />
            )}
          </GoabDropdown>
        );
      };

      const result = render(<Component />);
      const input = result.getByRole("combobox");
      const items = result.getByRole("option");

      // Initial state

      await vi.waitFor(async () => {
        const inputEl = input.element() as HTMLInputElement
        inputEl.click();
        expect(items.elements().length).toBe(values.length);
        items.elements().forEach((el, index) => {
          expect(el.innerHTML.trim()).toBe(values[index]);
        })
      });

      // Reduce to 1 item

      values = ["blue"]; // the previous failure happened with this item, was one of the previous items
      result.rerender(<Component />)

      await vi.waitFor(async () => {
        const inputEl = input.element() as HTMLInputElement
        inputEl.click();
        const items = result.getByRole("option");
        expect(items.elements().length).toBe(1);
        expect(items.element().innerHTML.trim()).toBe("blue");
      });
    })
  })
});
