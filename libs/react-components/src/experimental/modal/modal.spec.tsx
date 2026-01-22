import { render } from "@testing-library/react";
import GoabxButton from "../button/button";
import { GoabxModal, GoabxModalProps } from "./modal";

describe("GoabxModal", () => {
  it("should render", async () => {
    const { baseElement } = render(<GoabxModal>Modal Content</GoabxModal>);

    const modal = baseElement.querySelector("goa-modal");

    expect(modal?.getAttribute("open")).toBeNull();
    expect(modal?.getAttribute("closable")).toBe("false");
  });

  it("should render with close capability via icon and background", async () => {
    const props = {
      heading: "Modal Heading",
      open: true,
      maxWidth: "500px",
      role: "alertdialog",
      actions: (
        <GoabxButton
          onClick={() => {
            /* do nothing */
          }}
        >
          Close
        </GoabxButton>
      ),
      onClose: () => {
        /* do nothing */
      },
    } as GoabxModalProps;

    const { baseElement } = render(<GoabxModal {...props}>Modal Content</GoabxModal>);
    const modal = baseElement.querySelector("goa-modal");
    const actionContent = modal?.querySelector("[slot='actions']");
    // Role attribute is no longer passed to the web component (deprecated)
    expect(modal?.getAttribute("role")).toBeNull();

    expect(modal?.getAttribute("heading")).toBe("Modal Heading");
    expect(modal?.getAttribute("open")).toBe("true");
    expect(modal?.getAttribute("maxwidth")).toBe("500px");
    expect(modal?.getAttribute("closable")).toBe("true");
    expect(modal?.textContent).toContain("Modal Content");
    expect(actionContent?.textContent).toContain("Close");
  });

  it("should render with React node heading", async () => {
    const headingNode = <div>Custom Heading</div>;
    const { baseElement } = render(
      <GoabxModal open heading={headingNode}>
        Modal Content
      </GoabxModal>,
    );

    const modal = baseElement.querySelector("goa-modal");
    const headingContent = modal?.querySelector("[slot='heading']");

    expect(modal?.getAttribute("open")).toBe("true");
    expect(headingContent?.textContent).toBe("Custom Heading");
  });
});
