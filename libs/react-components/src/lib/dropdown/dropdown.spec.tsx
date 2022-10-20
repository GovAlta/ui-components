import "@testing-library/jest-dom";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { GoADropdown, GoADropdownOption } from "./dropdown";

afterEach(cleanup);

describe("GoADropdown", () => {
  it("should allow for a single selection.....", async () => {
    const fn = jest.fn();

    const { baseElement } = render(
      <GoADropdown name="favColor" value={[]} onChange={fn}>
        <GoADropdownOption name="favColor" label="Red" value="red" />
        <GoADropdownOption name="favColor" label="Blue" value="blue" />
        <GoADropdownOption name="favColor" label="Yellow" value="yellow" />
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
        onChange={() => {}}
      >
        <GoADropdownOption name="favColor" label="Red" value="red" />
        <GoADropdownOption name="favColor" label="Blue" value="blue" />
        <GoADropdownOption name="favColor" label="Yellow" value="yellow" />
      </GoADropdown>
    );

    const el = baseElement.querySelector("goa-dropdown");
    console.log(el.innerHTML);
    expect(el.getAttribute("leadingicon")).toBe("color-wand");
  });
});
