import { render, fireEvent, cleanup, waitFor } from "@testing-library/svelte";
import GoAModal from "./Modal.svelte";
import GoAModalWrapper from "./ModalWrapper.test.svelte";
import { it, describe } from "vitest";

afterEach(cleanup);

describe("Modal Component", () => {
  it("should have a deprecated width prop", async () => {
    const mock = vi.spyOn(console, "warn").mockImplementation(() => { /* do nothing */ });

    render(GoAModal, { open: "true", width: "500px" });

    await waitFor(() => {
      expect(console.warn["mock"].calls.length).toBeGreaterThan(0);
    });

    mock.mockRestore();
  });

  it("should set the maxwidth prop when width is set", async () => {
    const el = render(GoAModal, { open: "true", width: "500px" });

    await waitFor(() => {
      const modalEl = el.queryByTestId("modal");
      // @ts-expect-error: setting deprecated prop
      expect(modalEl.style["_values"]["--maxwidth"]).toBe("500px");
    });
  });

  it("should have a maxwidth property", async () => {
    const el = render(GoAModal, { open: "true", maxwidth: "500px" });

    await waitFor(() => {
      const modalEl = el.queryByTestId("modal");
      expect(modalEl?.style["_values"]["--maxwidth"]).toBe("500px");
    });
  });

  it("should show heading and have accessibility attributes", async() => {
    const el = render(GoAModal, { open: "true", heading: "Test Modal" });

    await waitFor(() => {
      const modal = el.queryByRole("dialog");
      expect(modal?.getAttribute("tabindex")).toBe("-1");
      expect(modal?.getAttribute("aria-modal")).toBe("true");
      expect(modal?.getAttribute("aria-labelledby")).toBe("goa-modal-heading");
      expect(modal?.querySelector(".has-content")).toBeTruthy();
      const modalHeading = el.queryByTestId("modal-title");
      expect(modalHeading?.getAttribute("aria-label")).toBeNull();
    });
  });

  it("should show slotted heading content and have accessibility attributes", async () => {
    const heading = "Test heading";
    const el =  render(GoAModal, { open: "true", heading });
    await waitFor(() => {
      const modal = el.queryByRole("dialog");
      expect(modal?.getAttribute("tabindex")).toBe("-1");
      expect(modal?.getAttribute("aria-modal")).toBe("true");
      expect(modal?.getAttribute("aria-labelledby")).toBe("goa-modal-heading");
      expect(modal?.querySelector(".has-content")).not.toBeNull(); // make sure the slot is rendered
      const modalHeading = el.queryByTestId("modal-title");
      expect(modalHeading?.textContent).toContain(heading);
      expect(modalHeading?.getAttribute("aria-label")).toBeNull();
    });
  });

  it("should show close icon and have accessibility attributes attributes", async() => {
    const el = render(GoAModal, { open: "true", closable: "true" });

    await waitFor(() => {
      const closeIcon = el.queryByTestId("modal-close-button");
      expect(closeIcon?.getAttribute("arialabel")).toBe("Close the modal");
      const modal = el.queryByRole("dialog");
      expect(modal?.getAttribute("tabindex")).toBe("-1");
      expect(modal?.getAttribute("aria-modal")).toBe("true");
      expect(modal?.getAttribute("aria-labelledby")).toBe("goa-modal-heading");
      expect(modal?.querySelector(".has-content")).toBeTruthy();
      const modalHeading = el.queryByTestId("modal-title");
      const fallbackAriaLabelWhenNoHeading = "Modal"
      expect(modalHeading?.getAttribute("aria-label")).toBe(fallbackAriaLabelWhenNoHeading);
    });
  });

  it("should show accessibility attributes attributes", async() => {
    const el = render(GoAModal, { open: "true" });

    await waitFor(() => {
      const modal = el.queryByRole("dialog");
      expect(modal?.getAttribute("tabindex")).toBe("-1");
      expect(modal?.getAttribute("aria-modal")).toBe("true");
      expect(modal?.getAttribute("aria-labelledby")).toBe("goa-modal-heading");
      expect(modal?.querySelector(".has-content")).toBeFalsy();
      const modalHeading = el.queryByTestId("modal-title");
      const fallbackAriaLabelWhenNoHeading = "Modal"
      expect(modalHeading?.getAttribute("aria-label")).toBe(fallbackAriaLabelWhenNoHeading);
    });
  });

  it("should open when the `open` attribute is set to true", async () => {
    const el = render(GoAModal, { open: "true" });

    await waitFor(() => {
      expect(el.queryByTestId("modal")).toBeTruthy();
    });
  });

  it("should close when the `open` attribute is set to false", async () => {
    const el = render(GoAModal, { open: "false" });
    await waitFor(() => {
      expect(el.queryByTestId("modal")).toBeFalsy();
    });
  });

  it("should close on icon click when made to be closable", async () => {
    const el = render(GoAModal, { open: "true", closable: "true" });
    const click = vi.fn();
    await waitFor(async () => {
      const rootEl = el.queryByTestId("modal");
      const closeIcon = el.queryByTestId("modal-close-button");
      rootEl?.addEventListener("_close", click);
      closeIcon && await fireEvent.click(closeIcon);
      expect(click).toBeCalled();
    });
  });

  it("should close on background click when made to be closable", async () => {
    const el = render(GoAModal, { open: "true", closable: "true" });
    await waitFor(async () => {
      const click = vi.fn();
      const rootEl = el.queryByTestId("modal");
      const closeIcon = el.queryByTestId("modal-overlay");
      rootEl?.addEventListener("_close", click);
      closeIcon && await fireEvent.click(closeIcon);
      expect(click).toBeCalled();
    });
  });

  it("should have a slot for the default content", async () => {
    const content = "This is the content";
    const el = render(GoAModalWrapper, { content });

    await waitFor(() => {
      expect(el.container.innerHTML).toContain(content);
      expect(el.container.querySelector("[slot=content]")?.innerHTML).toContain(
        content,
      );
    });
  });

  it("should have a slot for actions", async () => {
    const actionContent = "This is the actionContent";
    const el = render(GoAModalWrapper, { actionContent });

    await waitFor(() => {
      expect(el.container.querySelector("[slot=actions]")?.innerHTML).toContain(actionContent);
    });
  });

  it("should apply empty-actions class when actions slot is empty", async () => {
    const el = render(GoAModal, { open: "true", heading: "Test" });

    await waitFor(() => {
      const actionsEl = el.queryByTestId("modal-actions");
      expect(actionsEl?.classList.contains("empty-actions")).toBe(true);
    });
  });

  it("should not apply empty-actions class when actions slot has content", async () => {
    const actionContent = "This is the actionContent";
    const el = render(GoAModalWrapper, { actionContent });

    await waitFor(() => {
      const actionsEl = el.queryByTestId("modal-actions");
      expect(actionsEl?.classList.contains("empty-actions")).toBe(false);
    });
  });

  it("should handle modal with no actions slot at all", async () => {
    const el = render(GoAModal, { open: "true", heading: "Test Modal" });

    await waitFor(() => {
      const actionsEl = el.queryByTestId("modal-actions");
      expect(actionsEl?.classList.contains("empty-actions")).toBe(true);
      
      // Check that the actions element has no height when empty
      const styles = window.getComputedStyle(actionsEl!);
      const paddingTop = parseInt(styles.paddingTop || '0');
      const paddingBottom = parseInt(styles.paddingBottom || '0');
      expect(paddingTop + paddingBottom).toBe(0);
    });
  });

  ["emergency", "important", "information", "success", "event"].forEach(
    (calloutVariant) => {
      it(`renders the ${calloutVariant} callout modal`, async () => {
        const el = render(GoAModal, {
          open: "true",
          calloutvariant: calloutVariant,
        });

        await waitFor(() => {
          expect(el.container.querySelector(`.${calloutVariant}`)).toBeTruthy();
        });
      });
    },
  );

  it("should not render an invalid calloutVariant", async () => {
    const mock = vi.spyOn(console, "error").mockImplementation(() => { /* do nothing */ });
    render(GoAModal, { open: "true", calloutvariant: "importantttttt" });
    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBeGreaterThan(0);
    });
    mock.mockRestore();
  });

  it("should close on 'esc' key press when modal is closable", async () => {
    const el = render(GoAModal, { open: "true", closable: "true" });
    const handleClose = vi.fn();
    await waitFor(async () => {
      const rootEl = el.queryByTestId("modal");

      rootEl?.addEventListener("_close", handleClose);
      await fireEvent.keyDown(window, { key: "Escape", keyCode: 27 });
      expect(handleClose).toBeCalled();
    });
  });

  it("should have accessibility attributes by default", async() => {
    const el = render(GoAModal, { open: "true", heading: "Test Modal" });

    await waitFor(() => {
      const modal = el.queryByRole("dialog");
      expect(modal?.getAttribute("aria-modal")).toBe("true");
      expect(modal?.getAttribute("aria-labelledby")).toBe("goa-modal-heading");
      expect(modal?.getAttribute("tabindex")).toBe("-1");
    });
  });

  it("should not focus on close button for accessibility", async () => {
    const el = render(GoAModal, { open: "true", closable: "true" });
    await waitFor(async () => {
      const closeIcon = el.queryByTestId("modal-close-button");
      await waitFor(() => {
        closeIcon && expect(closeIcon).not.toHaveFocus();
      });
    });
  });

  it("should set role to dialog by default and set initial focus to it on open", async() => {
    const el = render(GoAModal, { open: "true" });

    await waitFor(() => {
      const modal = el.queryByRole("dialog");
      expect(modal?.getAttribute("data-first-focus")).toBe("true");
    });
  });

  it("should always set role to dialog regardless of prop value", async () => {
    const el = render(GoAModal, { open: "true", role: "alertdialog"});

    await waitFor(() => {
      const modal = el.queryByRole("dialog");
      expect(modal?.getAttribute("aria-modal")).toBe("true");
      expect(modal?.getAttribute("data-first-focus")).toBe("true");
    });
  });
});
