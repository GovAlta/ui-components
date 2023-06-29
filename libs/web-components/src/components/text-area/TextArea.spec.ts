import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/svelte";
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

    await fireEvent.input(textarea, { target: { value: 'bar' } });

    await waitFor(() => {
      expect(onChange).toBeCalledTimes(1);
    })
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

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoATextArea, {
        testid: "textarea-test",
        name: "test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const textarea = await baseElement.findByTestId("textarea-test");

      expect(textarea).toBeTruthy();
      expect(textarea).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(textarea).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(textarea).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(textarea).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });
});
