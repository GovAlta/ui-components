import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/svelte";
import GoATextArea from "./TextArea.svelte"

describe("GoATextArea", () => {

  it("should render", async () => {
    const result = render(GoATextArea, {
      name: "name",
      placeholder: "Enter text here",
      value: "foobar",
      rows: 42,
      disabled: "true",
      testid: "test-id",
    });

    const el = result.queryByTestId("test-id") as HTMLTextAreaElement;
    expect(el).toHaveAttribute("name", "name");
    expect(el).toHaveAttribute("placeholder", "Enter text here");
    expect(el.value).toBe("foobar");
    expect(el).toHaveAttribute("disabled", "");
    expect(el).toHaveAttribute("data-testid", "test-id");
    expect(el).toHaveAttribute("rows", "42");
  });

  it("handles the change event", async () => {
    const onChange = jest.fn();
    const result = render(GoATextArea, {
      name: "name",
      value: "foo",
      testid: "test-id",
    });

    const textarea = result.queryByTestId("test-id");
    textarea.addEventListener("_change", (e: any) => {
      expect(e.detail.name).toBe("name");
      expect(e.detail.value).toBe("bar");
      onChange();
    });

    await fireEvent.keyUp(textarea, { target: { value: 'bar' } });
    expect(onChange).toBeCalledTimes(1);
  })

  it("can be disabled", async () => {
    const onChange = jest.fn();
    const result = render(GoATextArea, {
      name: "name",
      value: "foo",
      testid: "test-id",
      disabled: "true",
    });

    const textarea = result.queryByTestId("test-id");
    textarea.addEventListener("_change", onChange);

    await fireEvent.keyUp(textarea, { target: { value: 'bar' } });
    expect(textarea).toHaveAttribute("disabled", "");
    expect(onChange).not.toBeCalled();
  })

  it("indicates an error state", async () => {
    const result = render(GoATextArea, {
      name: "name",
      value: "foo",
      testid: "test-id",
      error: "true",
    });

    const textarea = result.queryByTestId("test-id");
    expect(textarea).toHaveClass("error");
  })

  describe("Char count", () => {
    it("does not show a char count if not enabled", async () => {
      const { container } = render(GoATextArea, { name: 'test-name' });
      const counterEl = container.querySelector(".counter");
      expect(counterEl).toBeNull();
    });

    it("shows a char count", async () => {
      const { container } = render(GoATextArea, { name: 'test-name', showcounter: "true", value: "Jim" });
      const counterEl = container.querySelector(".counter");
      expect(counterEl.innerHTML).toContain("3");
    });

    it("shows a char count with a max count", async () => {
      const { component, container } = render(GoATextArea, { name: 'test-name', showcounter: "true", value: "Jim", maxcharcount: "50" });
      const input = container.querySelector('input');
      const counterEl = container.querySelector(".counter");
      expect(counterEl.innerHTML).toContain("3/50");
    });

    it("shows the count in an error state when the char count exceeds the max value allowed", async () => {
      const { container } = render(GoATextArea, { name: 'test-name', showcounter: "true", value: "Jim Smith", maxcharcount: "5" });
      expect(container.querySelector(".counter-error")).not.toBeNull();
    });
  });

});
