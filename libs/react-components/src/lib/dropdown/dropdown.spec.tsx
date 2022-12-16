import "@testing-library/jest-dom";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { GoADropdown } from "./dropdown";
import { GoADropdownItem, GoADropdownOption } from "./dropdown-item";

afterEach(cleanup);

describe("GoADropdown", () => {
  it("should inform the user that GoADropdownOption is deprecated", async () => {
    const mock = jest.spyOn(console, "warn").mockImplementation();
    render(
      <GoADropdown onChange={() => {}}>
        <GoADropdownOption value="foo" />
      </GoADropdown>
    );

    await waitFor(() => {
      expect(console.warn["mock"].calls.length).toBe(1);
    });
    mock.mockRestore();
  });

  it("should bind all web-component attributes", async () => {
    const { baseElement } = render(
      <GoADropdown
        leadingIcon="color-wand"
        name="favColor"
        value={[""]}
        maxHeight="100px"
        placeholder="Select..."
        disabled={true}
        error={true}
        testId="foo"
        width="200px"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        onChange={() => {}}
      >
        <GoADropdownItem name="favColor" label="Red" value="red" />
        <GoADropdownItem name="favColor" label="Blue" value="blue" />
        <GoADropdownItem name="favColor" label="Yellow" value="yellow" />
      </GoADropdown>
    );

    const el = baseElement.querySelector("goa-dropdown");
    expect(el.getAttribute("leadingicon")).toBe("color-wand");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should allow for a single selection", async () => {
    const fn = jest.fn();

    const { baseElement } = render(
      <GoADropdown name="favColor" value="yellow" onChange={fn} native={true}>
        <GoADropdownItem name="favColor" label="Red" value="red" />
        <GoADropdownItem name="favColor" label="Blue" value="blue" />
        <GoADropdownItem name="favColor" label="Yellow" value="yellow" />
      </GoADropdown>
    );

    const el = baseElement.querySelector("goa-dropdown");
    fireEvent(
      el,
      new CustomEvent("_change", {
        detail: { name: "favColor", value: "blue" },
      })
    );
    await waitFor(() => {
      expect(fn).toBeCalledWith("favColor", "blue");
    });
  });
});
