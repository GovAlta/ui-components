import FormStep from "./FormStep.svelte";
import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { tick } from "svelte";
import { describe, it, expect, vi } from "vitest";

describe("FormStep", () => {
  it("it renders the default step", async () => {
    const { queryByTestId } = render(FormStep, { text: "Some text" });
    const rootEl = queryByTestId("label");

    rootEl?.dispatchEvent(
      new CustomEvent("formstepper:init", {
        detail: {
          ariaLabel: "some label",
          enabled: true,
          childIndex: 1,
          current: false,
        },
      }),
    );

    await waitFor(() => {
      expect(queryByTestId("text")?.innerHTML).toContain("Some text");
      expect(queryByTestId("step-number")?.innerHTML).toBe("1");
    });
  });

  it("requires a text value", async () => {
    const mock = vi.spyOn(console, "warn").mockImplementation(() => {
      /* do nothing */
    });
    render(FormStep, {
      /* no text */
    });

    // 1 warning
    await waitFor(() => {
      expect(console.warn["mock"].calls.length).toBe(1);
    });
    mock.mockRestore();
  });

  it("emits a _click event", async () => {
    const click = vi.fn();
    const el = render(FormStep, { text: "Some form" });
    const rootEl = el.queryByTestId("label");
    const inputEl = el.queryByTestId("button");

    rootEl?.dispatchEvent(
      new CustomEvent("formstepper:init", {
        detail: {
          ariaLabel: "some label",
          enabled: true,
          childIndex: 1,
          current: false,
        },
      }),
    );

    await tick();
    el.container.addEventListener("_click", click);
    inputEl && (await fireEvent.click(inputEl));

    await waitFor(() => {
      expect(click).toHaveBeenCalledOnce();
    });
  });

  it("won't emit event when clicked if disabled", async () => {
    const click = vi.fn();
    const el = render(FormStep, { text: "Some form" });
    const rootEl = el.queryByTestId("label");
    const inputEl = el.queryByTestId("button");

    rootEl?.dispatchEvent(
      new CustomEvent("formstepper:init", {
        detail: {
          ariaLabel: "some label",
          enabled: false,
          childIndex: 1,
          current: false,
        },
      }),
    );

    el.container?.addEventListener("_click", click);
    await tick();
    inputEl && (await fireEvent.click(inputEl));

    expect(click).not.toBeCalled();
  });

  it("renders a current status", async () => {
    const el = render(FormStep, { text: "Some form" });
    const rootEl = el.queryByTestId("label");

    rootEl?.dispatchEvent(
      new CustomEvent("formstepper:init", {
        detail: {
          ariaLabel: "some label",
          enabled: true,
          childIndex: 1,
          current: true,
        },
      }),
    );

    await tick();
    expect(rootEl?.getAttribute("aria-current")).toBe("step");
  });

  it("renders a complete status", async () => {
    const el = render(FormStep, { text: "Some form" });
    const rootEl = el.queryByTestId("label");

    rootEl?.dispatchEvent(
      new CustomEvent("formstepper:init", {
        detail: {
          ariaLabel: "some label",
          enabled: true,
          childIndex: 1,
          current: false,
          status: "complete",
        },
      }),
    );

    await tick();
    expect(rootEl?.dataset["status"]).toBe("complete");
  });

  it("renders an incomplete status", async () => {
    const el = render(FormStep, { text: "Some form", status: "incomplete" });
    const rootEl = el.queryByTestId("label");

    rootEl?.dispatchEvent(
      new CustomEvent("formstepper:init", {
        detail: {
          ariaLabel: "some label",
          enabled: true,
          childIndex: 1,
          current: false,
          status: "incomplete",
        },
      }),
    );

    await tick();

    expect(rootEl?.dataset["status"]).toBe("incomplete");
  });

  it("renders the aria label", async () => {
    const { queryByTestId } = render(FormStep, {
      text: "Some form",
    });
    const rootEl = queryByTestId("label");
    const inputEl = queryByTestId("button");

    rootEl?.dispatchEvent(
      new CustomEvent("formstepper:init", {
        detail: {
          ariaLabel: "1 of 4",
          enabled: true,
          childIndex: 1,
          current: true,
        },
      }),
    );

    await tick();
    const label = inputEl?.getAttribute("aria-label");
    expect(label).toContain("1 of 4");
  });

  it("renders a not-started status", async () => {
    const el = render(FormStep, { text: "Some form", status: "not-started" });
    const rootEl = el.queryByTestId("label");

    rootEl?.dispatchEvent(
      new CustomEvent("formstepper:init", {
        detail: {
          ariaLabel: "some label",
          enabled: true,
          childIndex: 1,
          current: false,
          status: "not-started",
        },
      }),
    );

    await tick();

    expect(rootEl?.dataset["status"]).toBe("not-started");
  });

  it("renders aria-label for not-started", async () => {
    const el = render(FormStep, { text: "Some form", status: "not-started" });
    const rootEl = el.queryByTestId("label");
    const inputEl = el.queryByTestId("button");

    rootEl?.dispatchEvent(
      new CustomEvent("formstepper:init", {
        detail: {
          ariaLabel: "some label",
          enabled: true,
          childIndex: 1,
          current: false,
          status: "not-started",
        },
      }),
    );

    await tick();
    const label = inputEl?.getAttribute("aria-label");
    expect(label).toContain("Not started");
  });

  it("displays 'Incomplete' subtext for incomplete status", async () => {
    const el = render(FormStep, {
      text: "Partially Complete",
      status: "incomplete",
    });
    const rootEl = el.queryByTestId("label");

    rootEl?.dispatchEvent(
      new CustomEvent("formstepper:init", {
        detail: {
          ariaLabel: "some label",
          enabled: true,
          childIndex: 1,
          current: false,
          status: "incomplete",
        },
      }),
    );

    await tick();

    const subtextElement = el.queryByTestId("subtext");
    expect(subtextElement).not.toBeNull();
    expect(subtextElement?.textContent).toBe("Incomplete");
  });
});
