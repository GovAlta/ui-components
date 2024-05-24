import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { GoABDropdown } from "./dropdown";
import { GoABDropdownItem, GoABDropdownOption } from "./dropdown-item";
import { describe, it, expect, vi } from "vitest";

afterEach(cleanup);

describe("GoABDropdown", () => {
  it("should inform the user that GoABDropdownOption is deprecated", async () => {
    const mock = vi.spyOn(console, "warn").mockImplementation(() => {
      /* do nothing */
    });
    render(
      <GoABDropdown
        onChange={() => {
          /* do nothing */
        }}
      >
        <GoABDropdownOption value="foo" />
      </GoABDropdown>,
    );

    await waitFor(() => {
      // @ts-expect-error: console mock
      expect(console.warn["mock"].calls.length).toBe(1);
    });
    mock.mockRestore();
  });

  it("should bind all web-component attributes", async () => {
    const { baseElement } = render(
      <GoABDropdown
        leadingIcon="color-wand"
        name="favColor"
        value={[""]}
        maxHeight="100px"
        placeholder="Select..."
        filterable={true}
        disabled={true}
        error={true}
        testId="foo"
        id="foo-dropdown"
        width="200px"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        ariaLabel={"label"}
        ariaLabelledBy={"foo-dropdown-label"}
        onChange={() => {
          /* do nothing */
        }}
      >
        <GoABDropdownItem name="favColor" label="Red" value="red" />
        <GoABDropdownItem name="favColor" label="Blue" value="blue" />
        <GoABDropdownItem name="favColor" label="Yellow" value="yellow" />
      </GoABDropdown>,
    );

    const el = baseElement.querySelector("goa-dropdown");
    expect(el?.getAttribute("leadingicon")).toBe("color-wand");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
    expect(el?.getAttribute("id")).toBe("foo-dropdown");
    expect(el?.getAttribute("filterable")).toBe("true");
    expect(el?.getAttribute("arialabel")).toBe("label");
    expect(el?.getAttribute("arialabelledby")).toBe("foo-dropdown-label");
  });

  it("should allow for a single selection", async () => {
    const fn = vi.fn();

    const { baseElement } = render(
      <GoABDropdown name="favColor" value="yellow" onChange={fn} native={true}>
        <GoABDropdownItem name="favColor" label="Red" value="red" />
        <GoABDropdownItem name="favColor" label="Blue" value="blue" />
        <GoABDropdownItem name="favColor" label="Yellow" value="yellow" />
      </GoABDropdown>,
    );

    const el = baseElement.querySelector("goa-dropdown");
    expect(el).toBeTruthy();

    el &&
      fireEvent(
        el,
        new CustomEvent("_change", {
          detail: { name: "favColor", value: "blue" },
        }),
      );
    await waitFor(() => {
      expect(fn).toBeCalledWith({ name: "favColor", value: "blue" });
    });
  });
});
