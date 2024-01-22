import { render } from "@testing-library/react";
import { GoATab } from "./tab";

describe("GoATab", () => {
  it("should render successfully", () => {
    const { container } = render(
      <GoATab heading="Profile">
        <p>
          <b>Profile:</b> Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </p>
      </GoATab>
    );
    expect(container.querySelector("goa-tab")).toBeTruthy();
    const heading = container.querySelector("[slot='heading']");
    expect(heading?.innerHTML).toContain("Profile");
    const content = container.querySelector("p");
    expect(content?.innerHTML).toContain("Lorem ipsum dolor sit amet");
  });
});
