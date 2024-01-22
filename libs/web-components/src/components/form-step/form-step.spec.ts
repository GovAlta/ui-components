import FormStep from './FormStep.svelte'
import { RenderResult, fireEvent, render, waitFor } from '@testing-library/svelte'
import { SvelteComponent } from 'svelte';
import { describe, it, expect, vi } from "vitest";

type Props = {
  root: HTMLElement | null;
  status: HTMLElement | null;
  text: HTMLElement | null;
  childIndex: HTMLElement | null;
}

function getProps(el: RenderResult<SvelteComponent>): Props {
  const root = el.queryByRole("listitem")
  const status = el.queryByTestId("status")
  const text = el.queryByTestId("text")
  const childIndex = el.queryByTestId("step-number")

  return { root, status, text, childIndex }
}

describe("FormStep", () => {

  it('it renders the default step', async () => {
    const mock = vi.spyOn(console, "warn").mockImplementation(() => { });
    const el = render(FormStep, { text: "Some form", childindex: "1" })
    const props = getProps(el);

    expect(props.text?.innerHTML).toContain("Some form")
    expect(props.status?.querySelector("[data-testid=step-number]")?.innerHTML).toBe("1");

    // no warning messages expected
    await waitFor(() => {
      expect(console.warn["mock"].calls.length).toBe(0);
    });
    mock.mockRestore();
  })

  it("requires a text value", async () => {
    const mock = vi.spyOn(console, "warn").mockImplementation(() => { });
    render(FormStep, { /* no text */ })

    // 1 warning
    await waitFor(() => {
      expect(console.warn["mock"].calls.length).toBe(1);
    });
    mock.mockRestore();
  })

  it("emits a _click event", async () => {
    const click = vi.fn()
    const el = render(FormStep, { text: "Some form", enabled: true })
    const props = getProps(el);

    expect(props.root).toBeTruthy();
    expect(props.status).toBeTruthy();

    props.root?.addEventListener("_click", click)

    props.status && await fireEvent.click(props.status)

    expect(click).toBeCalled()
  })

  it("won't emit event when clicked if disabled", async () => {
    const click = vi.fn()
    const el = render(FormStep, { text: "Some form", enabled: false })
    const props = getProps(el);

    expect(props.root).toBeTruthy();
    expect(props.status).toBeTruthy();

    props.root?.addEventListener("_click", click)

    props.status && await fireEvent.click(props.status)

    expect(click).not.toBeCalled()
  })

  it("renders a current status", () => {
    const el = render(FormStep, { text: "Some form", current: true })
    const props = getProps(el);

    expect(props.root).toBeTruthy();
    expect(props.root?.getAttribute("aria-current")).toBe("step")
  })

  it("renders a complete status", () => {
    const el = render(FormStep, { text: "Some form", status: "complete" })
    const props = getProps(el);

    expect(props.root).toBeTruthy();
    expect(props.root?.dataset["status"]).toBe("complete")
  })

  it("renders an incomplete status", () => {
    const el = render(FormStep, { text: "Some form", status: "incomplete" })
    const props = getProps(el);

    expect(props.root).toBeTruthy();
    expect(props.root?.dataset["status"]).toBe("incomplete")
  })

  it("renders the step number", () => {
    const el = render(FormStep, { text: "Some form", childindex: 2 })
    const props = getProps(el);

    expect(props.childIndex).toBeTruthy();
    expect(props.childIndex?.innerHTML).toBe("2")
  })

  it("renders the aria label", () => {
    const { queryByRole } = render(FormStep, {
      text: "Some form",
      arialabel: "1 of 4",
      enabled: true
    });
    const label = queryByRole("listitem")?.getAttribute("aria-label")
    expect(label).toBeTruthy();
    expect(label).toContain("1 of 4")
  })
})
