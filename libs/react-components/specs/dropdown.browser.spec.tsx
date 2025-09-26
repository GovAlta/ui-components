import { render } from "vitest-browser-react";

import { GoabDropdown, GoabDropdownItem } from "../src";
import { expect, describe, it, vi } from "vitest";
import { page, userEvent } from "@vitest/browser/context";

describe("Dropdown Component", () => {
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

      expect(handleChange).toBeCalledWith({
        name: "favcolor",
        value: "red",
      })
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
          expect(popoverDiv.element().getAttribute("style")).toContain("width: min(500px, 100%)");
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
    });

    describe("Popover position", () => {
      it("should display popover above when dropdown is at the bottom of the view port", async () => {
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
        // Scroll to the bottom of the page
        window.scrollTo(0, document.body.scrollHeight);

        const dropdown = result.getByTestId("dropdown");
        await dropdown.click();

        await vi.waitFor(() => {
          const lastOption = result.getByText("Green");
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
    })
  })

  describe("Filterable Dropdown", () => {
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

  describe("Number Values", () => {
    it("should render with number values", async () => {
      // Setup
      const Component = () => {
        return (
          <GoabDropdown name="options" testId="dropdown" onChange={noop}>
            <GoabDropdownItem label="Option 1" value={1} />
            <GoabDropdownItem label="Option 2" value={2} />
            <GoabDropdownItem label="Option 3" value={3} />
          </GoabDropdown>
        );
      };

      const result = render(<Component />);
      const dropdown = result.getByTestId("dropdown");

      // Actions
      await dropdown.click();

      // Result
      await vi.waitFor(() => {
        ["1", "2", "3"].forEach((num) => {
          const item = result.getByText(`Option ${num}`);
          expect(item.element().getAttribute("data-value")).toBe(num);
        })
      });
    });

    it("should handle selection of number values", async () => {
      // Setup
      const onChange = vi.fn();
      const Component = () => {
        return (
          <GoabDropdown name="options" testId="dropdown" onChange={onChange}>
            <GoabDropdownItem label="Option 1" value={1} />
            <GoabDropdownItem label="Option 2" value={2} />
            <GoabDropdownItem label="Option 3" value={3} />
          </GoabDropdown>
        );
      };

      const result = render(<Component />);
      const dropdown = result.getByTestId("dropdown");
      const option2 = result.getByText("Option 2");

      // Actions
      await dropdown.click();

      await vi.waitFor(async () => {
        await option2.click();
      });

      // Result
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        name: "options",
        value: 2
      }));
    });

    it("should initialize with a number value", async () => {
      // Setup
      const Component = () => {
        return (
          <GoabDropdown name="options" testId="dropdown" value={2} onChange={noop}>
            <GoabDropdownItem label="Option 1" value={1} />
            <GoabDropdownItem label="Option 2" value={2} />
            <GoabDropdownItem label="Option 3" value={3} />
          </GoabDropdown>
        );
      };

      const result = render(<Component />);
      const input = result.getByRole("combobox");

      // Result
      await vi.waitFor(() => {
        const el = input.element() as HTMLInputElement;
        expect(el.value).toBe("Option 2");
      });
    });

    it("should filter options with number values", async () => {
      // Setup
      const Component = () => {
        return (
          <GoabDropdown name="options" testId="dropdown" filterable={true} onChange={noop}>
            <GoabDropdownItem label="Option 1" value={1} />
            <GoabDropdownItem label="Option 2" value={2} />
            <GoabDropdownItem label="Option 3" value={3} />
          </GoabDropdown>
        );
      };

      const result = render(<Component />);
      const filter = result.getByTestId("input");
      const filteredOptions = result.getByRole("option");

      // Actions
      await filter.fill("2");
      await filter.click();

      // Result
      await vi.waitFor(() => {
        expect(filteredOptions.elements().length).toBe(1);

        const el = filteredOptions.elements()[0] as HTMLElement;
        expect(el.getAttribute("data-value")).toBe("2");
      }, 2000);
    });
  });
});
