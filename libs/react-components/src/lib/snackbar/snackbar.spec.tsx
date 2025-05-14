import { render } from "@testing-library/react";
import GoabSnackbar, { GoabSnackbarProps } from "./snackbar";
import { describe, it, expect, vi } from "vitest";

const testId = "test-snackbar";

describe("GoabSnackbar", () => {
  it("should render with default props", () => {
    render(<GoabSnackbar>Snackbar content</GoabSnackbar>);

    const snackbar = document.querySelector("goa-snackbar");
    expect(snackbar?.getAttribute("type")).toBeNull();
    expect(snackbar?.getAttribute("duration")).toBeNull();
    expect(snackbar?.getAttribute("progress")).toBeNull();
    expect(snackbar?.getAttribute("visible")).toBeNull();
    expect(snackbar?.getAttribute("verticalposition")).toBeNull();
    expect(snackbar?.getAttribute("horizontalposition")).toBeNull();
    expect(snackbar?.textContent?.trim()).toBe("Snackbar content");
  });

  it("should render with all props", () => {
    const props: GoabSnackbarProps = {
      type: "success",
      duration: 4000,
      progress: 50,
      testId: testId,
      visible: true,
      verticalPosition: "top",
      horizontalPosition: "center",
      mt: "s",
      mr: "m",
      mb: "l",
      ml: "xl",
    };

    render(<GoabSnackbar {...props}>Snackbar content</GoabSnackbar>);

    const snackbar = document.querySelector("goa-snackbar");
    expect(snackbar?.getAttribute("type")).toBe("success");
    expect(snackbar?.getAttribute("duration")).toBe("4000");
    expect(snackbar?.getAttribute("progress")).toBe("50");
    expect(snackbar?.getAttribute("testid")).toBe(testId);
    expect(snackbar?.getAttribute("visible")).toBe("true");
    expect(snackbar?.getAttribute("verticalposition")).toBe("top");
    expect(snackbar?.getAttribute("horizontalposition")).toBe("center");
    expect(snackbar?.getAttribute("mt")).toBe("s");
    expect(snackbar?.getAttribute("mr")).toBe("m");
    expect(snackbar?.getAttribute("mb")).toBe("l");
    expect(snackbar?.getAttribute("ml")).toBe("xl");
    expect(snackbar?.textContent?.trim()).toBe("Snackbar content");
  });

  it("should render with failure type", () => {
    render(<GoabSnackbar type="failure">Error message</GoabSnackbar>);

    const snackbar = document.querySelector("goa-snackbar");
    expect(snackbar?.getAttribute("type")).toBe("failure");
    expect(snackbar?.textContent?.trim()).toBe("Error message");
  });

  it("should render with basic type", () => {
    render(<GoabSnackbar type="basic">Basic message</GoabSnackbar>);

    const snackbar = document.querySelector("goa-snackbar");
    expect(snackbar?.getAttribute("type")).toBe("basic");
    expect(snackbar?.textContent?.trim()).toBe("Basic message");
  });

  it("should render with custom vertical position", () => {
    render(<GoabSnackbar verticalPosition="top">Top message</GoabSnackbar>);

    const snackbar = document.querySelector("goa-snackbar");
    expect(snackbar?.getAttribute("verticalposition")).toBe("top");
    expect(snackbar?.textContent?.trim()).toBe("Top message");
  });

  it("should render with custom horizontal position", () => {
    render(<GoabSnackbar horizontalPosition="right">Right message</GoabSnackbar>);

    const snackbar = document.querySelector("goa-snackbar");
    expect(snackbar?.getAttribute("horizontalposition")).toBe("right");
    expect(snackbar?.textContent?.trim()).toBe("Right message");
  });

  it("should render with progress bar", () => {
    render(<GoabSnackbar progress={75}>Progress message</GoabSnackbar>);

    const snackbar = document.querySelector("goa-snackbar");
    expect(snackbar?.getAttribute("progress")).toBe("75");
    expect(snackbar?.textContent?.trim()).toBe("Progress message");
  });

  it("should render with actions", () => {
    const result = render(
      <GoabSnackbar actions={<button>Action Button</button>}>
        Message with actions
      </GoabSnackbar>,
    );

    const snackbar = document.querySelector("goa-snackbar");
    const actionsSlot = result.container.querySelector('[slot="actions"]');
    const button = actionsSlot?.querySelector("button");

    expect(snackbar?.textContent?.trim()).toContain("Message with actions");
    expect(actionsSlot).toBeTruthy();
    expect(button?.textContent?.trim()).toBe("Action Button");
  });

  it("should render with complex actions", () => {
    const result = render(
      <GoabSnackbar
        actions={
          <div>
            <button>Action 1</button>
            <button>Action 2</button>
          </div>
        }
      >
        Message with multiple actions
      </GoabSnackbar>,
    );

    const snackbar = document.querySelector("goa-snackbar");
    const actionsSlot = result.container.querySelector('[slot="actions"]');
    const buttons = actionsSlot?.querySelectorAll("button");

    expect(snackbar?.textContent?.trim()).toContain("Message with multiple actions");
    expect(actionsSlot).toBeTruthy();
    expect(buttons?.length).toBe(2);
    expect(buttons?.[0].textContent?.trim()).toBe("Action 1");
    expect(buttons?.[1].textContent?.trim()).toBe("Action 2");
  });
});
