import FormStepper from "./FormStepperWrapper.test.svelte";
import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { tick } from "svelte";
import { vi, it, describe, beforeAll } from "vitest";

function getProgress(el: Element): number {
  const progress = el.querySelector("progress.horizontal");
  return +(progress?.getAttribute("value") ?? "-1");
}

beforeAll(() => {
  class ResizeObserverMock {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }

  // Stub the global ResizeObserver
  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
});

describe("FormStepper", () => {
  it("it renders", async () => {
    const { container } = render(FormStepper);
    await waitFor(() => {
      const steps = container.querySelectorAll("button");
      expect(steps.length).toBe(4);
    });
  });

  it("show progress updates on step changes", async () => {
    const { container } = render(FormStepper);
    const steps = container.querySelectorAll("button[type=button]");

    await waitFor(() => {
      expect(steps.length).toBe(4);
      expect(getProgress(container)).toBe(0);
    });

    for (const [i, step] of [...steps].entries()) {
      await fireEvent.click(step);
      await waitFor(() => {
        const result = Math.floor(getProgress(container));
        const expected = Math.floor((100 / (steps.length - 1)) * i);
        expect(result).toEqual(expected);
      });
    }
  });

  it("sets the attributes on the children", async () => {
    const { container } = render(FormStepper);
    const steps = container.querySelectorAll("goa-form-step");

    await tick();
    steps.forEach(async (step: Element, index: number) => {
      expect(step.getAttribute("arialabel")).toBe(
        `Step ${index + 1} of ${steps.length}`,
      );
      expect(step.getAttribute("childindex")).toBe(`${index + 1}`);
    });
  });

  it("enables all steps if no initial step is set", async () => {
    const { container } = render(FormStepper);
    const steps = container.querySelectorAll("goa-form-step");

    await tick();
    steps.forEach((step: Element) => {
      expect(step.getAttribute("enabled")).toBe("true");
    });
  });

  it("enables all steps up to, and including, initial step that is set", async () => {
    const { container } = render(FormStepper, { step: 2 });

    await waitFor(() => {
      const steps = container.querySelectorAll("button[type=button]");
      steps.forEach((step: Element, index: number) => {
        expect(step.getAttribute("disabled")).toBe(index + 1 <= 2 ? null : "");
      });
    });
  });
});
