import { render } from "vitest-browser-react";
import { GoabDropdownMultiselect, GoabDropdownItem } from "../src";
import { expect, describe, it, vi } from "vitest";
import { userEvent } from "@vitest/browser/context";
import { useState } from "react";

/**
 * The checkbox-list testid lands on a div inside the goa-checkbox-list shadow DOM.
 * The goa-checkbox elements are light-DOM children of the host, so resolve to it.
 */
function checkboxListHost(checkboxListShadowDiv: HTMLElement): HTMLElement {
  return (checkboxListShadowDiv.getRootNode() as ShadowRoot).host as HTMLElement;
}

/** Svelte sets name as a property on the custom element rather than an attribute. */
function checkboxName(cb: Element): string {
  return (cb as { name?: string }).name || cb.getAttribute("name") || "";
}

/** The goa-checkbox elements currently rendered inside the checkbox list. */
function renderedCheckboxes(checkboxListShadowDiv: HTMLElement): HTMLElement[] {
  return Array.from(
    checkboxListHost(checkboxListShadowDiv).querySelectorAll("goa-checkbox"),
  );
}

/** Names of the goa-checkbox elements currently rendered inside the checkbox list. */
function renderedCheckboxNames(checkboxListShadowDiv: HTMLElement): string[] {
  return renderedCheckboxes(checkboxListShadowDiv).map(checkboxName);
}

describe("DropdownMultiselect", () => {
  it("should not open the popover when disabled", async () => {
    const Component = () => {
      return (
        <GoabDropdownMultiselect
          name="fruit"
          testId="dropdown-multiselect"
          placeholder="Select fruit"
          disabled={true}
        >
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
        </GoabDropdownMultiselect>
      );
    };

    const { getByTestId } = render(<Component />);
    const host = getByTestId("dropdown-multiselect");

    await userEvent.click(host);

    await vi.waitFor(() => {
      const checkboxListDiv = getByTestId("dropdown-multiselect-checkbox-list");
      expect(checkboxListDiv).not.toBeVisible();
    });
  });

  it("should open the popover when enabled", async () => {
    const Component = () => {
      return (
        <GoabDropdownMultiselect
          name="fruit"
          testId="dropdown-multiselect"
          placeholder="Select fruit"
        >
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
        </GoabDropdownMultiselect>
      );
    };

    const { getByTestId } = render(<Component />);
    const host = getByTestId("dropdown-multiselect");

    await userEvent.click(host);

    await vi.waitFor(() => {
      const checkboxListDiv = getByTestId("dropdown-multiselect-checkbox-list");
      expect(checkboxListDiv).toBeVisible();
    });
  });

  it("should build a checkbox for each dropdown item", async () => {
    const Component = () => (
      <GoabDropdownMultiselect
        name="fruit"
        testId="dropdown-multiselect"
        placeholder="Select fruit"
      >
        <GoabDropdownItem value="apple" label="Apple" />
        <GoabDropdownItem value="banana" label="Banana" />
        <GoabDropdownItem value="cherry" label="Cherry" />
      </GoabDropdownMultiselect>
    );

    const { getByTestId } = render(<Component />);
    const host = getByTestId("dropdown-multiselect");

    await userEvent.click(host);

    const checkboxList = getByTestId("dropdown-multiselect-checkbox-list");
    await vi.waitFor(() => {
      expect(renderedCheckboxNames(checkboxList.element() as HTMLElement)).toEqual([
        "apple",
        "banana",
        "cherry",
      ]);
    });
  });

  describe("filtering", () => {
    it("should show a filter input when filterable and open", async () => {
      const Component = () => (
        <GoabDropdownMultiselect
          name="fruit"
          testId="dropdown-multiselect"
          placeholder="Select fruit"
          filterable={true}
        >
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
        </GoabDropdownMultiselect>
      );

      const { getByTestId } = render(<Component />);
      const host = getByTestId("dropdown-multiselect");

      await userEvent.click(host);

      await vi.waitFor(() => {
        const filterInput = getByTestId("dropdown-multiselect-filter-input");

        expect(filterInput).toBeVisible();
      });
    });

    it("should not show a filter input when filterable is not set", async () => {
      const Component = () => (
        <GoabDropdownMultiselect
          name="fruit"
          testId="dropdown-multiselect"
          placeholder="Select fruit"
        >
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
        </GoabDropdownMultiselect>
      );

      const { getByTestId, container } = render(<Component />);
      const host = getByTestId("dropdown-multiselect");

      await userEvent.click(host);

      await vi.waitFor(() => {
        const checkboxListDiv = getByTestId("dropdown-multiselect-checkbox-list");
        expect(checkboxListDiv).toBeVisible();
      });

      expect(
        container.querySelector("[data-testid='dropdown-multiselect-filter-input']"),
      ).toBeNull();
    });

    it("should only render matching checkboxes when typing", async () => {
      const Component = () => (
        <GoabDropdownMultiselect
          name="fruit"
          testId="dropdown-multiselect"
          placeholder="Select fruit"
          filterable={true}
        >
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
          <GoabDropdownItem value="cherry" label="Cherry" />
        </GoabDropdownMultiselect>
      );

      const { getByTestId } = render(<Component />);
      const host = getByTestId("dropdown-multiselect");

      await userEvent.click(host);

      const filterInput = await vi.waitFor(() =>
        getByTestId("dropdown-multiselect-filter-input"),
      );
      const checkboxList = getByTestId("dropdown-multiselect-checkbox-list");

      await userEvent.type(filterInput, "b");

      await vi.waitFor(() => {
        expect(renderedCheckboxNames(checkboxList.element() as HTMLElement)).toEqual([
          "banana",
        ]);
      });
    });

    it("should filter case-insensitively", async () => {
      const Component = () => (
        <GoabDropdownMultiselect
          name="fruit"
          testId="dropdown-multiselect"
          placeholder="Select fruit"
          filterable={true}
        >
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
        </GoabDropdownMultiselect>
      );

      const { getByTestId } = render(<Component />);
      const host = getByTestId("dropdown-multiselect");

      await userEvent.click(host);

      const filterInput = await vi.waitFor(() =>
        getByTestId("dropdown-multiselect-filter-input"),
      );
      const checkboxList = getByTestId("dropdown-multiselect-checkbox-list");

      await userEvent.type(filterInput, "A");

      await vi.waitFor(() => {
        expect(renderedCheckboxNames(checkboxList.element() as HTMLElement)).toEqual([
          "apple",
        ]);
      });
    });

    it("should filter using the item's filter prop", async () => {
      const Component = () => (
        <GoabDropdownMultiselect
          name="fruit"
          testId="dropdown-multiselect"
          placeholder="Select fruit"
          filterable={true}
        >
          <GoabDropdownItem value="apple" label="Apple" filter="red fruit" />
          <GoabDropdownItem value="banana" label="Banana" filter="yellow fruit" />
        </GoabDropdownMultiselect>
      );

      const { getByTestId } = render(<Component />);
      const host = getByTestId("dropdown-multiselect");

      await userEvent.click(host);

      const filterInput = await vi.waitFor(() =>
        getByTestId("dropdown-multiselect-filter-input"),
      );
      const checkboxList = getByTestId("dropdown-multiselect-checkbox-list");

      await userEvent.type(filterInput, "yellow");

      await vi.waitFor(() => {
        expect(renderedCheckboxNames(checkboxList.element() as HTMLElement)).toEqual([
          "banana",
        ]);
      });
    });

    it("should keep checked items selected when they are hidden by the filter", async () => {
      const Component = () => {
        const [value, setValues] = useState<string[]>([]);
        return (
          <>
            <span data-testid="selected">{value.join(",")}</span>
            <GoabDropdownMultiselect
              name="fruit"
              testId="dropdown-multiselect"
              placeholder="Select fruit"
              filterable={true}
              value={value}
              onChange={(e) => setValues(e.value)}
            >
              <GoabDropdownItem value="apple" label="Apple" />
              <GoabDropdownItem value="banana" label="Banana" />
            </GoabDropdownMultiselect>
          </>
        );
      };

      const { getByTestId } = render(<Component />);
      const host = getByTestId("dropdown-multiselect");

      await userEvent.click(host);

      const checkboxList = getByTestId("dropdown-multiselect-checkbox-list");
      await vi.waitFor(() => {
        expect(renderedCheckboxNames(checkboxList.element() as HTMLElement)).toContain(
          "banana",
        );
      });

      const bananaCheckbox = renderedCheckboxes(
        checkboxList.element() as HTMLElement,
      ).find((cb) => checkboxName(cb) === "banana") as HTMLElement & {
        shadowRoot?: ShadowRoot;
      };
      const bananaLabel = bananaCheckbox.shadowRoot?.querySelector(
        "label",
      ) as HTMLElement;
      await userEvent.click(bananaLabel);

      await vi.waitFor(() => {
        expect(getByTestId("selected").element().textContent).toBe("banana");
      });

      const filterInput = await vi.waitFor(() =>
        getByTestId("dropdown-multiselect-filter-input"),
      );

      await userEvent.type(filterInput, "a");

      await vi.waitFor(() => {
        expect(
          renderedCheckboxNames(checkboxList.element() as HTMLElement),
        ).not.toContain("banana");
      });

      expect(getByTestId("selected").element().textContent).toBe("banana");
    });

    it("should restore all checkboxes when the filter is cleared", async () => {
      const Component = () => (
        <GoabDropdownMultiselect
          name="fruit"
          testId="dropdown-multiselect"
          placeholder="Select fruit"
          filterable={true}
        >
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
        </GoabDropdownMultiselect>
      );

      const { getByTestId } = render(<Component />);
      const host = getByTestId("dropdown-multiselect");

      await userEvent.click(host);

      const filterInput = await vi.waitFor(() =>
        getByTestId("dropdown-multiselect-filter-input"),
      );
      const checkboxList = getByTestId("dropdown-multiselect-checkbox-list");

      await userEvent.type(filterInput, "b");

      await vi.waitFor(() => {
        expect(renderedCheckboxNames(checkboxList.element() as HTMLElement)).toEqual([
          "banana",
        ]);
      });

      await userEvent.clear(filterInput);

      await vi.waitFor(() => {
        expect(renderedCheckboxNames(checkboxList.element() as HTMLElement)).toEqual([
          "apple",
          "banana",
        ]);
      });
    });

    it("should clear the filter when the dropdown closes", async () => {
      const Component = () => (
        <GoabDropdownMultiselect
          name="fruit"
          testId="dropdown-multiselect"
          placeholder="Select fruit"
          filterable={true}
        >
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
        </GoabDropdownMultiselect>
      );

      const { getByTestId } = render(<Component />);
      const host = getByTestId("dropdown-multiselect");

      await userEvent.click(host);

      const filterInput = await vi.waitFor(() =>
        getByTestId("dropdown-multiselect-filter-input"),
      );

      await userEvent.type(filterInput, "b");

      await userEvent.keyboard("{Escape}");

      await vi.waitFor(() => {
        const input = host
          .element()
          .querySelector("[data-testid='dropdown-multiselect-filter-input']");
        expect(input).toBeNull();
      });

      await userEvent.click(host);

      const reopenedFilter = await vi.waitFor(() =>
        getByTestId("dropdown-multiselect-filter-input"),
      );
      expect((reopenedFilter.element() as HTMLInputElement).value).toBe("");
    });
  });

  describe("labelFormat", () => {
    function getTriggerText(host: { element(): Element }): string {
      const span = (host.element() as HTMLElement).querySelector(".value-display");
      return span?.textContent?.trim() ?? "";
    }

    it("should show comma-separated labels when labelFormat is not set", async () => {
      const { getByTestId } = render(
        <GoabDropdownMultiselect
          name="fruit"
          testId="dropdown-multiselect"
          placeholder="Select fruit"
          value={["apple", "banana"]}
        >
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
          <GoabDropdownItem value="cherry" label="Cherry" />
        </GoabDropdownMultiselect>,
      );

      const host = getByTestId("dropdown-multiselect");
      await vi.waitFor(() => {
        expect(getTriggerText(host)).toBe("Apple, Banana");
      });
    });

    it("should show the single item label when labelFormat is 'count' and one item is selected", async () => {
      const { getByTestId } = render(
        <GoabDropdownMultiselect
          name="fruit"
          testId="dropdown-multiselect"
          placeholder="Select fruit"
          labelFormat="count"
          value={["apple"]}
        >
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
          <GoabDropdownItem value="cherry" label="Cherry" />
        </GoabDropdownMultiselect>,
      );

      const host = getByTestId("dropdown-multiselect");
      await vi.waitFor(() => {
        expect(getTriggerText(host)).toBe("Apple");
      });
    });

    it("should show 'N items' when labelFormat is 'count' and multiple items are selected", async () => {
      const { getByTestId } = render(
        <GoabDropdownMultiselect
          name="fruit"
          testId="dropdown-multiselect"
          placeholder="Select fruit"
          labelFormat="count"
          value={["apple", "banana", "cherry"]}
        >
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
          <GoabDropdownItem value="cherry" label="Cherry" />
        </GoabDropdownMultiselect>,
      );

      const host = getByTestId("dropdown-multiselect");
      await vi.waitFor(() => {
        expect(getTriggerText(host)).toBe("3 items");
      });
    });

    it("should switch from single label to 'N items' as second item is selected", async () => {
      const Component = () => {
        const [value, setValues] = useState<string[]>([]);
        return (
          <GoabDropdownMultiselect
            name="fruit"
            testId="dropdown-multiselect"
            placeholder="Select fruit"
            labelFormat="count"
            value={value}
            onChange={(e) => setValues(e.value)}
          >
            <GoabDropdownItem value="apple" label="Apple" />
            <GoabDropdownItem value="banana" label="Banana" />
          </GoabDropdownMultiselect>
        );
      };

      const { getByTestId } = render(<Component />);
      const host = getByTestId("dropdown-multiselect");

      await userEvent.click(host);

      const checkboxList = getByTestId("dropdown-multiselect-checkbox-list");
      await vi.waitFor(() => {
        expect(renderedCheckboxNames(checkboxList.element() as HTMLElement)).toContain(
          "apple",
        );
      });

      const appleCheckbox = renderedCheckboxes(
        checkboxList.element() as HTMLElement,
      ).find((cb) => checkboxName(cb) === "apple") as HTMLElement & {
        shadowRoot?: ShadowRoot;
      };
      await userEvent.click(
        appleCheckbox.shadowRoot?.querySelector("label") as HTMLElement,
      );

      await vi.waitFor(() => {
        expect(getTriggerText(host)).toBe("Apple");
      });

      const bananaCheckbox = renderedCheckboxes(
        checkboxList.element() as HTMLElement,
      ).find((cb) => checkboxName(cb) === "banana") as HTMLElement & {
        shadowRoot?: ShadowRoot;
      };
      await userEvent.click(
        bananaCheckbox.shadowRoot?.querySelector("label") as HTMLElement,
      );

      await vi.waitFor(() => {
        expect(getTriggerText(host)).toBe("2 items");
      });
    });
  });

  it("filter with select all should only select filtered items", async () => {
    const Component = () => {
      return (
        <GoabDropdownMultiselect
          name="stuff-and-things"
          testId="dropdown-multiselect"
          placeholder="Select Stuff and/or things"
          filterable={true}
          showSelectAll={true}
        >
          <GoabDropdownItem value="Stuff1" label="Stuff1" />
          <GoabDropdownItem value="Thing1" label="Thing1" />
          <GoabDropdownItem value="Stuff2" label="Stuff2" />
          <GoabDropdownItem value="Thing2" label="Thing2" />
          <GoabDropdownItem value="Stuff3" label="Stuff3" />
          <GoabDropdownItem value="Thing3" label="Thing3" />
        </GoabDropdownMultiselect>
      );
    };

    const { getByTestId } = render(<Component />);
    const host = getByTestId("dropdown-multiselect");

    await userEvent.click(host);

    const filterInput = await vi.waitFor(() =>
      getByTestId("dropdown-multiselect-filter-input"),
    );

    await userEvent.type(filterInput, "Stuff");

    const selectAllCheckbox = getByTestId("dropdown-multiselect-select-all");
    await userEvent.click(selectAllCheckbox);

    await vi.waitFor(() => {
      const checkboxList = getByTestId("dropdown-multiselect-checkbox-list");
      expect(renderedCheckboxNames(checkboxList.element() as HTMLElement)).toEqual([
        "Stuff1",
        "Stuff2",
        "Stuff3",
      ]);
    });
  });
});
