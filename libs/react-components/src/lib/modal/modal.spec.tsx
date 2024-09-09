import { render } from "@testing-library/react";
import GoabButton from "../../lib/button/button";
import { GoabModal, GoabModalProps } from "./modal";

describe("Modal Tests", () => {
  it("Modal - should render with close capability via icon and background", async () => {
    const props = {
      heading: "Modal Heading",
      open: true,
      maxWidth: "500px",
      role: "alertdialog",
      actions: (
        <GoabButton
          onClick={() => {
            /* do nothing */
          }}
        >
          Close
        </GoabButton>
      ),
      onClose: () => {
        /* do nothing */
      },
    } as GoabModalProps;

    const { baseElement } = render(<GoabModal {...props}>Modal Content</GoabModal>);
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
