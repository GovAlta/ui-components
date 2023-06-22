import {render} from "@testing-library/svelte";
import GoATab from "./Tab.svelte";

it('should render', async() => {
  const result = render(GoATab, {heading: 'Title', open: "false", childindex: "0"});
  const button = result.container.querySelector("button");
  expect(button.getAttribute("aria-selected")).toBe("false");
  expect(button.getAttribute("aria-controls")).toBe("tabpanel-0");
  expect(button.getAttribute("id")).toBe("tab-0");
  expect(button.getAttribute("role")).toBe("tab");
  expect(button.innerHTML).toContain("Title");
});
