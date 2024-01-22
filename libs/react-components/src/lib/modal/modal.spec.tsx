import { render } from "@testing-library/react";
import GoAButton from "../../lib/button/button";
import { GoAModal } from "./modal";

describe("Modal Tests", () => {
  it("Modal - should render with close capability via icon and background", async () => {
    const props = {
      heading: "Modal Heading",
      open: true,
      maxWidth: "500px",
      actions: <GoAButton onClick={() => { }}>Close</GoAButton>,
      onClose: () => { },
    };

    const { baseElement } = render(
      <GoAModal {...props}>Modal Content</GoAModal>
    );
    const modal = baseElement.querySelector("goa-modal");
    const actionContent = modal?.querySelector("[slot='actions']");
    const heading = modal?.querySelector("[slot='heading']");

    expect(heading?.textContent).toContain("Modal Heading");
    expect(modal?.getAttribute("open")).toBe("true");
    expect(modal?.getAttribute("maxwidth")).toBe("500px");
    expect(modal?.getAttribute("closable")).toBe("true");
    expect(modal?.textContent).toContain("Modal Content");
    expect(actionContent?.textContent).toContain("Close");
  });
});
