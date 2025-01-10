import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GoAFilterChip } from "./filter-chip";
import { describe, it, expect, vi } from "vitest";

describe("GoA FilterChip", () => {
  it("should render", () => {
    const { container } = render(<GoAFilterChip content="some filter chip" />);
    expect(container.innerHTML).toContain("some filter chip");
  });

  it("should render with basic props", () => {
    const { container } = render(<GoAFilterChip content="Some Badge" />);
    expect(container.innerHTML).toContain("Some Badge");
    const el = container.querySelector("goa-filter-chip");
    expect(el).not.toBeNull();
    expect(el?.getAttribute("error")).toBe("false");
  });

  it("should bind all properties correctly", async () => {
    const { container } = render(
      <GoAFilterChip
        content="some filter chip"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        error={true}
        iconTheme="filled"
        testId="test-chip"
      />,
    );

    const el = container.querySelector("goa-filter-chip");

    expect(el?.getAttribute("content")).toBe("some filter chip");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
    expect(el?.getAttribute("error")).toBe("true");
    expect(el?.getAttribute("icontheme")).toBe("filled");
    expect(el?.getAttribute("data-testid")).toBe("test-chip");
  });

  it("should show the chip in the error state", () => {
    const { container } = render(<GoAFilterChip content="Some Badge" error={true} />);
    const el = container.querySelector("goa-filter-chip");
    expect(el?.getAttribute("error")).toBe("true");
  });

  it("should handle the click event", async () => {
    const onClick = vi.fn();
    const { container } = render(
      <GoAFilterChip content="Some Badge" onClick={onClick} testId="chip" />,
    );
    const el = container.querySelector("goa-filter-chip");

    el && fireEvent(el, new CustomEvent("_click"));
    expect(onClick).toHaveBeenCalled();
  });

  it("should have an unfilled close icon by default", () => {
    const { container } = render(<GoAFilterChip content="Test" />);
    const el = container.querySelector("goa-filter-chip");
    expect(el?.getAttribute("icontheme")).toBe("outline");
  });

  it("should not apply background fill on hover", async () => {
    render(<GoAFilterChip content="Test" testId="chip" />);
    const chip = await screen.findByTestId("chip");
    fireEvent.mouseOver(chip);
    expect(chip).not.toHaveStyle("background-color: var(--goa-color-greyscale-200)");
  });
});
