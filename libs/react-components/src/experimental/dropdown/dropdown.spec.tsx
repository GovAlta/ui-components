import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { GoabxDropdown } from "./dropdown";
import { GoabxDropdownItem, GoabxDropdownOption } from "./dropdown-item";
import { describe, it, expect, vi } from "vitest";

const noop = () => {
  /* do nothing */
};

afterEach(cleanup);

describe("GoabxDropdown", () => {
  it("should inform the user that GoabxDropdownOption is deprecated", async () => {
    const mock = vi.spyOn(console, "warn").mockImplementation(() => {
      /* do nothing */
    });
    render(
      <GoabxDropdown onChange={noop}>
        <GoabxDropdownOption value="foo" />
      </GoabxDropdown>,
    );

    await waitFor(() => {
      // @ts-expect-error: console mock
      expect(console.warn["mock"].calls.length).toBe(1);
    });
    mock.mockRestore();
  });

  it("should render", async () => {
    const { baseElement } = render(<GoabxDropdown onChange={noop}></GoabxDropdown>);

    const el = baseElement.querySelector("goa-dropdown");
    expect(el?.getAttribute("disabled")).toBeNull();
    expect(el?.getAttribute("error")).toBeNull();
    expect(el?.getAttribute("filterable")).toBeNull();
    expect(el?.getAttribute("multiselect")).toBeNull();
    expect(el?.getAttribute("native")).toBeNull();
  });

  it("should bind all web-component attributes", async () => {
    const { baseElement } = render(
      <GoabxDropdown
        leadingIcon="color-wand"
        name="favColor"
        value={[""]}
        maxHeight="100px"
        placeholder="Select..."
        disabled
        error
        filterable
        multiselect
        native
        testId="foo"
        id="foo-dropdown"
        width="200px"
        maxWidth="400px"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        ariaLabel={"label"}
        ariaLabelledBy={"foo-dropdown-label"}
        autoComplete="off"
        size="compact"
        onChange={noop}
      >
        <GoabxDropdownItem name="favColor" label="Red" value="red" />
        <GoabxDropdownItem name="favColor" label="Blue" value="blue" />
        <GoabxDropdownItem name="favColor" label="Yellow" value="yellow" />
      </GoabxDropdown>,
    );

    const el = baseElement.querySelector("goa-dropdown");
    expect(el?.getAttribute("leadingicon")).toBe("color-wand");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
    expect(el?.getAttribute("id")).toBe("foo-dropdown");
    expect(el?.getAttribute("disabled")).toBe("true");
    expect(el?.getAttribute("error")).toBe("true");
    expect(el?.getAttribute("filterable")).toBe("true");
    expect(el?.getAttribute("multiselect")).toBe("true");
    expect(el?.getAttribute("native")).toBe("true");
    expect(el?.getAttribute("arialabel")).toBe("label");
    expect(el?.getAttribute("arialabelledby")).toBe("foo-dropdown-label");
    expect(el?.getAttribute("autocomplete")).toBe("off");
    expect(el?.getAttribute("maxwidth")).toBe("400px");
    expect(el?.getAttribute("size")).toBe("compact");
  });

  it("should allow for a single selection", async () => {
    const fn = vi.fn();

    const { baseElement } = render(
      <GoabxDropdown name="favColor" value="yellow" onChange={fn} native>
        <GoabxDropdownItem name="favColor" label="Red" value="red" />
        <GoabxDropdownItem name="favColor" label="Blue" value="blue" />
        <GoabxDropdownItem name="favColor" label="Yellow" value="yellow" />
      </GoabxDropdown>,
    );

    const el = baseElement.querySelector("goa-dropdown");
    expect(el).toBeTruthy();

    el &&
      fireEvent(
        el,
        new CustomEvent("_change", { detail: { name: "favColor", value: "blue" } }),
      );
    await waitFor(() => {
      expect(fn).toBeCalledWith(
        expect.objectContaining({
          name: "favColor",
          value: "blue",
          event: expect.any(Event),
        }),
      );
    });
  });

  it("should pass data-grid attributes", () => {
    const { baseElement } = render(
      <GoabxDropdown name="test" onChange={noop} data-grid="cell">
        <GoabxDropdownItem name="test" label="Option 1" value="option1" />
      </GoabxDropdown>,
    );
    const el = baseElement.querySelector("goa-dropdown");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
