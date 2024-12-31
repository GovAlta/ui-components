import { fireEvent, render } from "@testing-library/svelte";
import GoAInputChip from "./InputChip.svelte";
import { describe, it, expect, vi } from "vitest";

describe("InputChip", () => {
  it("should render", async () => {
    const { container } = render(GoAInputChip, {
      chipValues: ["foo"],
      validValues: ["foo", "bar"],
    });

    expect(container.innerHTML).toContain("foo");
    expect(container.innerHTML).not.toContain("bar");
    expect(container.querySelector("[error=\"false\"]")).toBeDefined();
  });

  it("should show the chip in the error state", async () => {
    const { container } = render(GoAInputChip, {
      name: "test",
      chipValues: ["invalid value"],
      validValues: ["foo", "bar"],
    });

    expect(container.querySelector("[error=\"true\"]")).toBeDefined();
  });

  it("should handle the click event for deletable chips", async () => {
    const result = render(GoAInputChip, {
      name: "test",
      testid: "inputTest",
      chipValues: ["foo"],
      validValues: ["foo", "bar"],
    });

    const chip = result.container.querySelector('goa-input .innerContent goa-filter-chip');
    const onClick = vi.fn();

    expect(result.container.innerHTML).toContain("foo");
    expect(chip).toBeDefined();
    if (chip) {
      chip.addEventListener("_click", onClick);
      await fireEvent(chip, new CustomEvent('_click'));
    }

    expect(onClick).toHaveBeenCalled();
    expect(result.container.innerHTML).not.toContain("foo");
  });

  it("should handle adding valid or invalid chip and detect error state", async () => {
    const result = render(GoAInputChip, {
      name: "test",
      testid: "inputTest",
      chipValues: [],
      validValues: ["foo", "bar"],
    });

    const input = result.container.querySelector('goa-input')
    expect(input).toBeDefined();

    // Enter a valid chip value
    if (input) {
      const onKeyDown = vi.fn();
      input.addEventListener("keydown", onKeyDown);

      (input as HTMLInputElement).focus();
      (input as HTMLInputElement).value = "foo";
      await fireEvent.keyDown(input, { key: "Enter" });
    }

    expect(result.container.querySelector("goa-input[error=\"false\"] goa-filter-chip[content=\"foo\"][error=\"false\"]")).toBeDefined();

    // Enter an invalid chip value
    if (input) {
      const onKeyDown = vi.fn();
      input.addEventListener("keydown", onKeyDown);

      (input as HTMLInputElement).focus();
      (input as HTMLInputElement).value = "invalid value";
      await fireEvent.keyDown(input, { key: "Enter" });
    }

    expect(result.container.querySelector("goa-input[error=\"true\"] goa-filter-chip[content=\"invalid value\"][error=\"true\"]")).toBeDefined();
  });
});
