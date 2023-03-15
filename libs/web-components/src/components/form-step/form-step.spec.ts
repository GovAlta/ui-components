import FormStep from './FormStep.svelte'
import { fireEvent, render, waitFor } from '@testing-library/svelte'

function getProps(el) {
  const root = el.queryByRole("listitem")
  const status = el.queryByTestId("status")
  const text = el.queryByTestId("text")
  const childIndex = el.queryByTestId("child-index")

  return { root, status, text, childIndex }
}

describe.skip("FormStep", () => {
  
  it('it renders the default step', async () => {
    const mock = jest.spyOn(console, "warn").mockImplementation();
    const el = render(FormStep, { text: "Some form" })
    const props = getProps(el);

    expect(props.text.innerHTML).toContain("Some form")
    expect(props.root.dataset.status).toBe("") // default
    expect(props.status.querySelector(".step-number")).toBeTruthy();
    expect(props.root.getAttribute("aria-disabled")).toBeTruthy();

    // no warning messages expected
    await waitFor(() => {
      expect(console.warn["mock"].calls.length).toBe(0);
    });
    mock.mockRestore();
  })

  it("requires a text value", async () => {
    const mock = jest.spyOn(console, "warn").mockImplementation();
    render(FormStep, { /* no text */ })

    // 1 warning
    await waitFor(() => {
      expect(console.warn["mock"].calls.length).toBe(1);
    });
    mock.mockRestore();
  })

  it("emits a _click event", async () => {
    const click = jest.fn()
    const el = render(FormStep, { text: "Some form", enabled: true })
    const props = getProps(el);

    props.root.addEventListener("_click", click)

    await fireEvent.click(props.status)

    expect(click).toBeCalled()
  })

  it("won't emit event when clicked if disabled", async () => {
    const click = jest.fn()
    const el = render(FormStep, { text: "Some form", enabled: false })
    const props = getProps(el);

    props.root.addEventListener("_click", click)

    await fireEvent.click(props.status)

    expect(click).not.toBeCalled()
  })

  it("renders a current status", () => {
    const el = render(FormStep, { text: "Some form", current: true })
    const props = getProps(el);

    expect(props.root.getAttribute("aria-current")).toBe("step")
  })

  it("renders a complete status", () => {
    const el = render(FormStep, { text: "Some form", status: "complete" })
    const props = getProps(el);

    expect(props.root.dataset.status).toBe("complete")
  })

  it("renders an incomplete status", () => {
    const el = render(FormStep, { text: "Some form", status: "incomplete" })
    const props = getProps(el);

    expect(props.root.dataset.status).toBe("incomplete")
  })

  it("renders the step number", () => {
    const el = render(FormStep, { text: "Some form", childindex: 2 })
    const props = getProps(el);

    expect(props.childIndex.innerHTML).toBe("2")
  })

  it("renders the aria label", () => {
    const { queryByRole } = render(FormStep, { text: "Some form", arialabel: "1 of 4" })

    expect(queryByRole("checkbox").getAttribute("aria-label")).toBe("1 of 4")
  })
})
