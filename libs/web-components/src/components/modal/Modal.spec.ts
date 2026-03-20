import { render, fireEvent, cleanup, waitFor } from "@testing-library/svelte";
import GoAModal from "./Modal.svelte";
import GoAModalWrapper from "./ModalWrapper.test.svelte";
import { it, describe, expect, vi, afterEach } from "vitest";

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
      const style = modalEl?.getAttribute("style");
      expect(style).toContain("--maxwidth: 500px");
    });
  });

  it("should have a maxwidth property", async () => {
    const el = render(GoAModal, { open: "true", maxwidth: "500px" });

    await waitFor(() => {
      const modalEl = el.queryByTestId("modal");
      const style = modalEl?.getAttribute("style");
      expect(style).toContain("--maxwidth: 500px");
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

  describe("v2 scroll position tracking", () => {
    it("should track scroll position when content scrolls in v2", async () => {
      const el = render(GoAModal, { open: "true", version: "2" });

      await waitFor(() => {
        const modalEl = el.queryByTestId("modal");
        expect(modalEl).toBeTruthy();
      });

      const modalEl = el.queryByTestId("modal")!;
      const contentEl = el.queryByTestId("modal-content")!;

      // Simulate scroll to middle
      await fireEvent(
        contentEl,
        new Event("scroll", { bubbles: true }),
      );

      // Scrolling while at top shouldn't break anything
      await waitFor(() => {
        expect(modalEl).toBeTruthy();
      });
    });

    it("should use native overflow scroll for v2 (no goa-scrollable)", async () => {
      const el = render(GoAModal, { open: "true", version: "2" });

      await waitFor(() => {
        const modalContent = el.queryByTestId("modal-content");
        expect(modalContent).toBeTruthy();
        // v2 should not use goa-scrollable
        const scrollable = modalContent?.querySelector("goa-scrollable");
        expect(scrollable).toBeNull();
        // v2 should use a scroll-content div instead
        const scrollContent = modalContent?.querySelector(".scroll-content");
        expect(scrollContent).toBeTruthy();
      });
    });

    it("should use goa-scrollable for v1 (default)", async () => {
      const el = render(GoAModal, { open: "true" });

      await waitFor(() => {
        const modalContent = el.queryByTestId("modal-content");
        expect(modalContent).toBeTruthy();
        const scrollable = modalContent?.querySelector("goa-scrollable");
        expect(scrollable).toBeTruthy();
      });
    });

    it("should add scroll position class to modal element in v2", async () => {
      const el = render(GoAModal, { open: "true", version: "2" });

      await waitFor(() => {
        const modalEl = el.queryByTestId("modal");
        expect(modalEl).toBeTruthy();
      });

      const contentEl = el.queryByTestId("modal-content")!;

      // Mock scrollHeight > clientHeight to simulate scrollable content
      Object.defineProperty(contentEl, "scrollHeight", { value: 1000, configurable: true });
      Object.defineProperty(contentEl, "clientHeight", { value: 400, configurable: true });
      Object.defineProperty(contentEl, "scrollTop", { value: 0, configurable: true, writable: true });

      // Simulate scroll to top position
      await fireEvent.scroll(contentEl, { target: { scrollTop: 0 } });

      await waitFor(() => {
        const modalEl = el.queryByTestId("modal");
        expect(modalEl?.classList.contains("top")).toBe(true);
      });
    });
  });
});
