import React from "react";
import { fireEvent, render } from "@testing-library/react";
import GoAChip from "./chip";

describe("GoA Chip", () => {

  it("should render", () => {
    const { container } = render(<GoAChip content="some chip" />);
    expect(container.innerHTML).toContain("some chip");
  });

  it("should show the leading icon", async () => {
    const { container } = render(<GoAChip content="some chip" leadingIcon="add" />);
    const el = container.querySelector("goa-chip");
    expect(el.getAttribute("leadingicon")).toBe("add");
  });

  it("should show the delete icon", async () => {
    const { container } = render(<GoAChip content="some chip" onDeleteIconClick={() => { }} />);
    const el = container.querySelector("goa-chip");
    expect(el.getAttribute("deletable")).toBe("true");
  });

  it("allows for the handling of the delete event", async () => {
    const onDeleteIconClickStub = jest.fn();
    const { container } = render(<GoAChip content="some chip" onDeleteIconClick={onDeleteIconClickStub} />);

    const el = container.querySelector("goa-chip");
    fireEvent(el, new CustomEvent("_onDeleteIconClick"));
    expect(onDeleteIconClickStub).toHaveBeenCalled();
  });

});
