import { render } from "@testing-library/react";

import SidebarGroup from "./sidebar-group";

describe("SidebarGroup", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SidebarGroup />);
    expect(baseElement).toBeTruthy();
  });
});
