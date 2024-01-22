import FormStepper from './FormStepperWrapper.test.svelte'
import { fireEvent, render, waitFor } from '@testing-library/svelte'
import { tick } from 'svelte';
import { it, describe } from "vitest";

function getProgress(el: Element): number {
  const progress = el.querySelector("progress.horizontal")
  return +progress.getAttribute("value");
}

describe("FormStepper", () => {
  it("it renders", async () => {
    const { container } = render(FormStepper)
    const steps = container.querySelectorAll("goa-form-step")
    expect(steps.length).toBe(4)
  })

  // FIXME: unable to get the progress check working. Child events aren't able to be triggered
  it.skip("show progress updates on step changes", async () => {
    const { container } = render(FormStepper)
    const steps = container.querySelectorAll("goa-form-step");

    await tick()
    await waitFor(() => {
      expect(steps.length).toBe(4)
      expect(getProgress(container)).toBe(0)
    })

    steps.forEach(async (step: HTMLElement, index: number) => {
      await fireEvent.click(step)
      expect(getProgress(container)).toEqual(25 * (index + 1))
    })
  })

  it("sets the attributes on the children", async () => {
    const { container } = render(FormStepper)
    const steps = container.querySelectorAll("goa-form-step");

    await tick()
    steps.forEach(async (step: HTMLElement, index: number) => {
      expect(step.getAttribute("arialabel")).toBe(`Step ${index + 1} of ${steps.length}`)
      expect(step.getAttribute("childindex")).toBe(`${index + 1}`)
    })
  })

  it("enables all steps if no initial step is set", async () => {
    const { container } = render(FormStepper)
    const steps = container.querySelectorAll("goa-form-step");

    await tick()
    steps.forEach(async (step: HTMLElement) => {
      expect(step.getAttribute("enabled")).toBe("true")
    })
  })

  it("enables all steps up to, and including, initial step that is set", async () => {
    const { container } = render(FormStepper, { step: 2 })
    const steps = container.querySelectorAll("goa-form-step");

    await tick()
    steps.forEach(async (step: HTMLElement, index: number) => {
      expect(step.getAttribute("enabled")).toBe(index + 1 <= 2 ? "true" : "false")
    })
  })
})

