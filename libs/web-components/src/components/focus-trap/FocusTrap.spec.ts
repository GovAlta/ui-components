import {
  render,
  fireEvent,
  createEvent,
  waitFor,
} from "@testing-library/svelte";
import FocusTrapTestComponent from "./FocusTrapTestComponent.svelte";
import { it, describe } from "vitest";
import { tick } from "svelte";

// This test is blocked due to test slots being handling differently than web browser
// For details, please refer https://goa-dio.atlassian.net/browse/DDIDS-704
describe("Focus Trap Component", () => {

  it.skip("should focus the first element", async () => {
    const el = render(FocusTrapTestComponent);
    await tick();
    el.debug();
    const userNameEl = el.queryByTestId("username");

    expect(userNameEl).toBeTruthy();
    expect(userNameEl).toHaveFocus();
  });

  it.skip("traps the tab key", async () => {
    const el = render(FocusTrapTestComponent);

    const userNameEl = el.queryByTestId("username");

    expect(userNameEl).toBeTruthy();
    userNameEl?.focus();
    const tabPressEvent = createEvent.keyDown(el.container, { key: "Tab" });

    await fireEvent(el.container, tabPressEvent);
    await fireEvent(el.container, tabPressEvent);
    await waitFor(() => {
      const emailEl = el.queryByTestId("email");
      expect(emailEl).toHaveFocus();
    });
  });
});
