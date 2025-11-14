import { render } from "vitest-browser-react";

import { GoabDropdown, GoabDropdownItem } from "../src";
import { expect, describe, it, vi } from "vitest";
import { page, userEvent } from "@vitest/browser/context";

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

      expect(handleChange).toBeCalledWith({
        name: "favcolor",
        value: "red",
        event: expect.any(Event),
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
});
