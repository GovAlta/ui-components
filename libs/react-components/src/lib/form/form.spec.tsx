import { render, cleanup, fireEvent } from "@testing-library/react";
import { GoabPublicForm, GoabPublicFormProps } from "./form";

afterEach(cleanup);

describe("GoaForm", () => {
  it("should render", () => {
    const props: GoabPublicFormProps = {
      status: "initializing"
    };
    const { baseElement } = render(
      <GoabPublicForm
        status={props.status}
        name={props.name}
      />
    );
    const el = baseElement.querySelector("goa-public-form");
    expect(el?.getAttribute("status")).toEqual(props.status);
    expect(el?.getAttribute("name")).toBeNull();
  });

  it("should render the properties", () => {
    const props: GoabPublicFormProps = {
      status: "initializing",
      name: "test-form",
      onFormComplete: vi.fn(),
    };
    const { baseElement } = render(
      <GoabPublicForm
        status={props.status}
        name={props.name}
        onFormComplete={props.onFormComplete}
      />
    );
    const el = baseElement.querySelector("goa-public-form");
    expect(el?.getAttribute("status")).toEqual(props.status);
    expect(el?.getAttribute("name")).toEqual(props.name);
  });

  it("responds to events", async () => {
    const props: GoabPublicFormProps = {
      status: "initializing",
      onFormComplete: vi.fn(),
    };
    const { baseElement } = render(<GoabPublicForm status={props.status} onFormComplete={props.onFormComplete} />);
    const el = baseElement.querySelector("goa-public-form");
    expect(el).toBeTruthy();
    el && fireEvent(el, new CustomEvent("_complete"));
    expect(props.onFormComplete).toHaveBeenCalled();
  });
});
