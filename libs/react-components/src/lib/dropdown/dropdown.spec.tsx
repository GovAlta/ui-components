import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { GoabDropdown } from "./dropdown";
import { GoabDropdownItem, GoabDropdownOption } from "./dropdown-item";
import { describe, it, expect, vi } from "vitest";

const noop = () => {
  /* do nothing */
};

afterEach(cleanup);

describe("GoabDropdown", () => {
  it("should inform the user that GoabDropdownOption is deprecated", async () => {
    const mock = vi.spyOn(console, "warn").mockImplementation(() => {
      /* do nothing */
    });
    render(
      <GoabDropdown onChange={noop}>
        <GoabDropdownOption value="foo" />
      </GoabDropdown>,
    );

    await waitFor(() => {
      // @ts-expect-error: console mock
      expect(console.warn["mock"].calls.length).toBe(1);
    });
    mock.mockRestore();
  });

  it("should render", async () => {
    const { baseElement } = render(<GoabDropdown onChange={noop}></GoabDropdown>);

    const el = baseElement.querySelector("goa-dropdown");
    expect(el?.getAttribute("disabled")).toBeNull();
    expect(el?.getAttribute("error")).toBeNull();
    expect(el?.getAttribute("filterable")).toBeNull();
    expect(el?.getAttribute("multiselect")).toBeNull();
    expect(el?.getAttribute("native")).toBeNull();
  });

  it("should bind all web-component attributes", async () => {
    const { baseElement } = render(
      <GoabDropdown
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
        onChange={noop}
      >
        <GoabDropdownItem name="favColor" label="Red" value="red" />
        <GoabDropdownItem name="favColor" label="Blue" value="blue" />
        <GoabDropdownItem name="favColor" label="Yellow" value="yellow" />
      </GoabDropdown>,
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
  });

  it("should allow for a single selection", async () => {
    const fn = vi.fn();

    const { baseElement } = render(
      <GoabDropdown name="favColor" value="yellow" onChange={fn} native>
        <GoabDropdownItem name="favColor" label="Red" value="red" />
        <GoabDropdownItem name="favColor" label="Blue" value="blue" />
        <GoabDropdownItem name="favColor" label="Yellow" value="yellow" />
      </GoabDropdown>,
    );

    const el = baseElement.querySelector("goa-dropdown");
    expect(el).toBeTruthy();

    el &&
      fireEvent(
        el,
        new CustomEvent("_change", { detail: { name: "favColor", value: "blue" } }),
      );
    await waitFor(() => {
      expect(fn).toBeCalledWith({ name: "favColor", value: "blue" });
    });
  });
});
