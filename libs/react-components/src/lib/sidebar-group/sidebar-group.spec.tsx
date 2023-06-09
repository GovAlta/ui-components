import { render } from "@testing-library/react";

import SidebarGroup from "./sidebar-group";

describe("SidebarGroup", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SidebarGroup heading="some header" />);

    const el = baseElement.querySelector("goa-sidebar-group");
    expect(el.getAttribute("heading")).toBe("some header");
  });
});
