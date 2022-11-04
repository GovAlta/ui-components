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
    textarea.addEventListener("_change", (e: CustomEvent) => {
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

  it("accepts an arialabel property", async () => {
    const el = render(GoATextArea, { testid: "input-test", name: "description", arialabel: "Description" });
    const root = el.container.querySelector('[aria-label="Description"]');
    expect(root).toBeTruthy();
  });

  it("defaults to the name property if arialabel is not supplied", async () => {
    const el = render(GoATextArea, { testid: "input-test", name: "about" });
    const root = el.container.querySelector('[aria-label="about"]');
    expect(root).toBeTruthy();
  });

});
