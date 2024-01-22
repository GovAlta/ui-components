import { render, fireEvent, cleanup, waitFor } from "@testing-library/svelte";
import GoAModal from "./Modal.svelte";
import GoAModalWrapper from "./ModalWrapper.test.svelte";
import { it, describe } from "vitest";

afterEach(cleanup);

describe("Modal Component", () => {
  it("should have a deprecated width prop", async () => {
    const mock = vi.spyOn(console, "warn").mockImplementation(() => { });

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
      expect(modalEl.style["_values"]["--maxwidth"]).toBe("500px");
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

  it("should show the heading", async () => {
    const heading = "Test heading";
    const el = render(GoAModalWrapper, { heading });
    await waitFor(() => {
      expect(el.container.querySelector("[slot=heading]").innerHTML).toContain(
        heading,
      );
    });
  });

  it("should close on icon click when made to be closable", async () => {
    const el = render(GoAModal, { open: "true", closable: "true" });
    const click = vi.fn();
    await waitFor(async () => {
      const rootEl = el.queryByTestId("modal");
      const closeIcon = el.queryByTestId("modal-close-button");
      rootEl.addEventListener("_close", click);
      await fireEvent.click(closeIcon);
      expect(click).toBeCalled();
    });
  });

  it("should close on background click when made to be closable", async () => {
    const el = render(GoAModal, { open: "true", closable: "true" });
    await waitFor(async () => {
      const click = vi.fn();
      const rootEl = el.queryByTestId("modal");
      const closeIcon = el.queryByTestId("modal-overlay");
      rootEl.addEventListener("_close", click);
      await fireEvent.click(closeIcon);
      expect(click).toBeCalled();
    });
  });

  it("should have a slot for the default content", async () => {
    const content = "This is the content";
    const el = render(GoAModalWrapper, { content });

    await waitFor(() => {
      expect(el.container.innerHTML).toContain(content);
      expect(el.container.querySelector("[slot=content]").innerHTML).toContain(
        content,
      );
    });
  });

  it("should have a slot for actions", async () => {
    const actionContent = "This is the actionContent";
    const el = render(GoAModalWrapper, { actionContent });

    expect(el.container.querySelector("[slot=actions]").innerHTML).toContain(
      actionContent,
    );
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
    const mock = vi.spyOn(console, "error").mockImplementation(() => { });
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

      rootEl.addEventListener("_close", handleClose);
      await fireEvent.keyDown(window, { key: "Escape", keyCode: 27 });
      expect(handleClose).toBeCalled();
    });
  });
});
