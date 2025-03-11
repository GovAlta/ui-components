import { fireEvent, render } from "@testing-library/react";
import GoabChip from "./chip";
import { describe, it, expect, vi } from "vitest";

describe("GoabChip", () => {
  it("should render", () => {
    const { container } = render(<GoabChip content="some chip" />);

    const el = container.querySelector("goa-chip");
    expect(el?.getAttribute("content")).toBe("some chip");
    expect(container.innerHTML).toContain("some chip");
    expect(el?.getAttribute("deletable")).toBeNull();
    expect(el?.getAttribute("error")).toBeNull();
  });

  it("should bind the properties", async () => {
    const { container } = render(
      <GoabChip
        content="some chip"
        leadingIcon="add"
        error
        deletable
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
      />,
    );

    const el = container.querySelector("goa-chip");
    expect(el?.getAttribute("content")).toBe("some chip");
    expect(el?.getAttribute("leadingicon")).toBe("add");
    expect(el?.getAttribute("deletable")).toBe("true");
    expect(el?.getAttribute("error")).toBe("true");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });

  it("allows for the handling of the delete event", async () => {
    const onClick = vi.fn();
    const { container } = render(<GoabChip content="some chip" onClick={onClick} />);

    const el = container.querySelector("goa-chip");
    el && fireEvent(el, new CustomEvent("_click"));
    expect(onClick).toHaveBeenCalled();
  });
});
