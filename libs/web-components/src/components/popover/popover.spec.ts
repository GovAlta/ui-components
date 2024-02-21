import { render, fireEvent } from "@testing-library/svelte";
import PopoverWrapper from "./PopoverWrapper.test.svelte";
import Popover from "./Popover.svelte";
import { it } from "vitest";

it("should render", async () => {
  const { container } = render(PopoverWrapper, {
    content: "This is content",
    targetTrigger: "Clik Action",
  });

  const slotContent = container.querySelector("[slot=content]");
  const slotTarget = container.querySelector("[slot=target]");

  expect(slotContent).toBeTruthy();
  expect(slotTarget).toBeTruthy();

  expect(slotContent?.innerHTML).toContain(
    "This is content",
  );
  expect(slotTarget?.innerHTML).toContain(
    "Clik Action",
  );
});

it("should open content when target is clicked", async () => {
  const result = render(Popover);
  const target = result.queryByTestId("popover-target");
  expect(target).toBeTruthy();

  expect(result.queryByTestId("popover-content")).toBeNull();
  target && await fireEvent.click(target);
  expect(result.queryByTestId("popover-content")).toBeTruthy();
});

it("should close content when clicked outside the content container", async () => {
  const result = render(Popover);
  const target = result.queryByTestId("popover-target");

  expect(target).toBeTruthy();
  target && await fireEvent.click(target);

  const background = result.queryByTestId("popover-background");
  expect(background).toBeTruthy();
  expect(result.queryByTestId("popover-content")).toBeTruthy();
  expect(result.queryByTestId("popover-background")).toBeTruthy();

  background && await fireEvent.click(background);
  expect(result.queryByTestId("popover-content")).toBeNull();
});
