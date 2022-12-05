import NativeSelect from './NativeSelect.svelte'
import { cleanup, render, waitFor } from '@testing-library/svelte'
import { getContext } from '../../common/context-store'

afterEach(cleanup);

describe("NativeSelect", () => {
  it("renders children", async () => {
    const name = "native-select"
    const { container } = render(NativeSelect, { name, value: "green" })

    const ctx = getContext(name)
    ctx.notify({ type: "bind", name, value: "red" })
    ctx.notify({ type: "bind", name, value: "green" })
    ctx.notify({ type: "bind", name, value: "blue" })

    await waitFor(() => {
      const options = container.querySelectorAll("select option")
      expect(options.length).toBe(3)
    });
  })

  it("dispatches the event on selection", async () => {
    const name = "event-selection";
    const { container } = render(NativeSelect, { name, value: "green" })

    const ctx = getContext(name)
    ctx.notify({ type: "bind", name, value: "red" })
    ctx.notify({ type: "bind", name, value: "green" })
    ctx.notify({ type: "bind", name, value: "blue" })

    const onChange = jest.fn();
    const select = container.querySelector("select")

    select.addEventListener("_change", (e: CustomEvent) => {
      const { name: _name, value } = e.detail;
      expect(_name).toBe(name);
      expect(value).toBe("blue");
      onChange(_name, value)
    })

    select.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        bubbles: false,
        cancelable: true,
        detail: { name, value: "blue" },
      }),
    );

    await waitFor(async () => {
      await waitFor(async () => {
        expect(onChange).toBeCalled()
      })
    });
  })

  it("shows the label text when provided", async () => {
    const name = "custom-label"
    const { container } = render(NativeSelect, { name, value: "green" })

    const ctx = getContext(name)
    ctx.notify({ type: "bind", name, value: "red", label: "Red" })
    ctx.notify({ type: "bind", name, value: "green", label: "Green" })
    ctx.notify({ type: "bind", name, value: "blue", label: "Blue" })

    await waitFor(() => {
      const options = container.querySelectorAll("select option")
      expect(options.length).toBe(3)
      expect(options[0].textContent.trim()).toBe("Red")
      expect(options[1].textContent.trim()).toBe("Green")
      expect(options[2].textContent.trim()).toBe("Blue")
    });
  })

  it("shows the value when no lable is provided", async () => {
    const name = "value-label"
    const { container } = render(NativeSelect, { name, value: "green" })

    const ctx = getContext(name)
    ctx.notify({ type: "bind", name, value: "red" })
    ctx.notify({ type: "bind", name, value: "green" })
    ctx.notify({ type: "bind", name, value: "blue" })

    await waitFor(() => {
      const options = container.querySelectorAll("select option")
      expect(options.length).toBe(3)
      expect(options[0].textContent.trim()).toBe("red")
      expect(options[1].textContent.trim()).toBe("green")
      expect(options[2].textContent.trim()).toBe("blue")
    });
  })

  it("shows an error when no name is provided", async () => {
    const mock = jest.spyOn(console, "warn").mockImplementation();
    render(NativeSelect, { value: "green" })

    await waitFor(() => {
      expect(console.warn["mock"].calls.length).toBeGreaterThan(0);
    })
    mock.mockRestore();
  })

  it("shows an error when no value is provided", async () => {
    const mock = jest.spyOn(console, "warn").mockImplementation();
    render(NativeSelect, { name: "no-value" })

    await waitFor(() => {
      expect(console.warn["mock"].calls.length).toBeGreaterThan(0);
    })
    mock.mockRestore();
  })
})

