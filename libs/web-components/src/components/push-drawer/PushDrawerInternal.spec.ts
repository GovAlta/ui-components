import { render, RenderResult, waitFor } from "@testing-library/svelte";
import PushDrawerInternalWrapper from "./PushDrawerInternalWrapper.svelte";
import PushDrawerInternal from "./PushDrawerInternal.svelte";
import { it, describe, beforeEach, afterEach, vi, expect } from "vitest";
import { SvelteComponent } from "svelte";

describe("GoAPushDrawerInternal", () => {
  it("should open when open attribute is true", async () => {
    const result = render(PushDrawerInternalWrapper, {
      props: {
        testId: "test-drawer",
        open: true,
      },
    });

    const drawer = result.getByTestId("test-drawer");
    expect(drawer).toHaveClass("open");
    expect(drawer).not.toHaveClass("closed");
  });

  it("should be closed when open attribute is false", async () => {
    const result = render(PushDrawerInternalWrapper, {
      props: {
        testId: "test-drawer",
        open: false,
      },
    });

    const drawer = result.getByTestId("test-drawer");
    expect(drawer).not.toHaveClass("open");
    expect(drawer).toHaveClass("closed");
  });

  describe("closing animation", () => {
    let clock: ReturnType<typeof vi.useFakeTimers>;
    let result: RenderResult<SvelteComponent<any, any, any>>;
    let drawer: HTMLElement;

    beforeEach(() => {
      result = render(PushDrawerInternalWrapper, {
        props: {
          testId: "test-drawer",
          open: true,
        },
      });
      drawer = result.getByTestId("test-drawer");

      clock = vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should be open initially", () => {
      expect(drawer).toHaveClass("open");
      expect(drawer).not.toHaveClass("closing");
      expect(drawer).not.toHaveClass("closed");
    });

    describe("when open is set to false", () => {
      beforeEach(async () => {
        // Update to closed
        await result.rerender({ testId: "test-drawer", open: false });
      });

      it("should add 'closing' class", async () => {
        // 'closing' class should be added
        await waitFor(() => {
          expect(drawer).not.toHaveClass("open");
          expect(drawer).toHaveClass("closing");
          expect(drawer).not.toHaveClass("closed");
        });
      });

      describe("after animation completes", () => {
        beforeEach(async () => {
          // Advance timers by animation duration (251ms)
          clock.advanceTimersByTime(300);
        });

        it("should add 'closed' class", async () => {
          // 'closing' class should be removed after animation
          await waitFor(() => {
            expect(drawer).not.toHaveClass("open");
            expect(drawer).not.toHaveClass("closing");
            expect(drawer).toHaveClass("closed");
          });
        });
      });
    });
  });

  it("should populate actions slot correctly", async () => {
    const result = render(PushDrawerInternalWrapper, {
      props: {
        testId: "test-drawer",
        open: true,
      },
    });

    const actions = result.getByTestId("drawer-actions");
    const actionsChildren = actions?.getElementsByTagName("p");

    await waitFor(() => {
      expect(actions).toBeTruthy();
      expect(actionsChildren.length).toBe(2);
      expect(actionsChildren[0].textContent).toBe("Action 1");
      expect(actionsChildren[1].textContent).toBe("Action 2");
    });
  });

  it("should log error when width is a percentage", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {
        /* noop */
      });

    render(PushDrawerInternalWrapper, {
      props: {
        testId: "test-drawer",
        open: true,
        width: "50%",
      },
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "PushDrawer does not support percentage widths. Please use a fixed width instead.",
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
