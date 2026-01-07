import { render } from "@testing-library/react";
import { GoabTab } from "./tab";

describe("GoabTab", () => {
  it("should render successfully", () => {
    const { container } = render(
      <GoabTab heading="Profile">
        <p>
          <b>Profile:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </GoabTab>,
    );
    expect(container.querySelector("goa-tab")).toBeTruthy();
    const heading = container.querySelector("[slot='heading']");
    expect(heading?.innerHTML).toContain("Profile");
    const content = container.querySelector("p");
    expect(content?.innerHTML).toContain("Lorem ipsum dolor sit amet");
  });

  it("should render with disabled attribute when disabled is true", () => {
    const { container } = render(
      <GoabTab heading="Disabled Tab" disabled>
        <p>Disabled content</p>
      </GoabTab>,
    );
    const tab = container.querySelector("goa-tab");
    expect(tab).toBeTruthy();
    expect(tab?.getAttribute("disabled")).toBe("true");
  });

  it("should not have disabled attribute when disabled is false", () => {
    const { container } = render(
      <GoabTab heading="Enabled Tab" disabled={false}>
        <p>Enabled content</p>
      </GoabTab>,
    );
    const tab = container.querySelector("goa-tab");
    expect(tab).toBeTruthy();
    expect(tab?.getAttribute("disabled")).toBeNull();
  });

  it("should not have disabled attribute when disabled is not provided", () => {
    const { container } = render(
      <GoabTab heading="Default Tab">
        <p>Default content</p>
      </GoabTab>,
    );
    const tab = container.querySelector("goa-tab");
    expect(tab).toBeTruthy();
    expect(tab?.getAttribute("disabled")).toBeNull();
  });
});
