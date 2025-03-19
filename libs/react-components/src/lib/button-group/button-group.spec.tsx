import { render } from "@testing-library/react";
import { GoabButtonGroup } from "./button-group";
import { GoabButtonGroupAlignment } from "@abgov/ui-components-common";

describe("GoabButtonGroup", () => {
  it("should render", () => {
    const { container } = render(
      <GoabButtonGroup alignment={"start" as GoabButtonGroupAlignment}></GoabButtonGroup>,
    );

    const el = container.querySelector("goa-button-group");
    expect(el).toBeTruthy();
  });
});
