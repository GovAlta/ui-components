import { render } from "@testing-library/react";
import GoABButton from "../../lib/button/button";
import { GoABModal, GoABModalProps } from "./modal";

describe("Modal Tests", () => {
  it("Modal - should render with close capability via icon and background", async () => {
    const props = {
      heading: "Modal Heading",
      open: true,
      maxWidth: "500px",
      role: "alertdialog",
      actions: (
        <GoABButton
          onClick={() => {
            /* do nothing */
          }}
        >
          Close
        </GoABButton>
      ),
      onClose: () => {
        /* do nothing */
      },
    } as GoABModalProps;

    const { baseElement } = render(<GoABModal {...props}>Modal Content</GoABModal>);
    const modal = baseElement.querySelector("goa-modal");
    const actionContent = modal?.querySelector("[slot='actions']");
    const heading = modal?.querySelector("[slot='heading']");
    expect(modal?.getAttribute("role")).toBe("alertdialog");

    expect(heading?.textContent).toContain("Modal Heading");
    expect(modal?.getAttribute("open")).toBe("true");
    expect(modal?.getAttribute("maxwidth")).toBe("500px");
    expect(modal?.getAttribute("closable")).toBe("true");
    expect(modal?.textContent).toContain("Modal Content");
    expect(actionContent?.textContent).toContain("Close");
  });
});
