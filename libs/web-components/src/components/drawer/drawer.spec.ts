import { describe, it } from "vitest";
import DrawerWrapper from "./DrawerWrapper.test.svelte";
import { fireEvent, render, waitFor } from "@testing-library/svelte";
import userEvent, { UserEvent } from "@testing-library/user-event";

let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup();
});

describe("Drawer", () => {
  it("renders content in closed state", async () => {
    const el = render(DrawerWrapper, {
      position: "bottom",
      heading: "Heading",
      content: "This is the content",
    });

    expect(el).toBeTruthy();

    const drawerEl = await el.findByTestId("drawer-content");
    expect(drawerEl).toBeTruthy();
    expect(drawerEl.innerHTML).toContain("This is the content");
  });

  it("toggle visibility via close prop", async () => {
    const el = render(DrawerWrapper, {
      position: "bottom",
      heading: "Heading",
      content: "This is the content",
    });

    expect(el).toBeTruthy();

    const drawerEl = await el.findByTestId("drawer");
    const buttonEl = await el.findByTestId("open");
    const contentEl = await el.findByTestId("drawer-content");

    expect(contentEl).toBeTruthy();
    // content always exists but is not `visible`
    expect(contentEl.innerHTML).toContain("This is the content");
    expect(drawerEl.style.visibility).toBe("hidden");

    // open
    await fireEvent.click(buttonEl);
    expect(drawerEl.style.visibility).toBe("visible");

    // close
    await fireEvent.click(buttonEl);
    expect(drawerEl.style.visibility).toBe("hidden");
  });

  it("closes when clicking the background", async () => {
    const el = render(DrawerWrapper, { position: "bottom" });

    expect(el).toBeTruthy();

    const drawerEl = await el.findByTestId("drawer");
    const buttonEl = await el.findByTestId("open");
    const backgroundEl = drawerEl.querySelector("[data-testid=background]");
    const contentEl = await el.findByTestId("drawer-content");

    const onClose = vi.fn();
    drawerEl?.addEventListener("_close", onClose);

    // initial state
    expect(contentEl).toBeTruthy();
    expect(drawerEl.style.visibility).toBe("hidden");

    // open
    await fireEvent.click(buttonEl);
    expect(drawerEl.style.visibility).toBe("visible");

    // close
    expect(backgroundEl).toBeTruthy();
    backgroundEl && (await fireEvent.click(backgroundEl));
    expect(onClose).toBeCalled();
  });

  it("closes when clicking the close icon", async () => {
    const el = render(DrawerWrapper, { position: "bottom" });

    expect(el).toBeTruthy();

    const drawerEl = await el.findByTestId("drawer");
    const buttonEl = await el.findByTestId("open");
    const iconEl = drawerEl.querySelector("[data-testid=drawer-close-button]");
    const contentEl = await el.findByTestId("drawer-content");

    const onClose = vi.fn();
    drawerEl?.addEventListener("_close", onClose);

    // initial state
    expect(contentEl).toBeTruthy();
    expect(drawerEl.style.visibility).toBe("hidden");

    // open
    await fireEvent.click(buttonEl);
    expect(drawerEl.style.visibility).toBe("visible");

    // close
    expect(iconEl).toBeTruthy();
    iconEl && (await fireEvent.click(iconEl));
    expect(onClose).toBeCalled();
  });

  it("closes when clicking the esc key", async () => {
    const el = render(DrawerWrapper, { position: "bottom" });

    expect(el).toBeTruthy();

    const drawerEl = await el.findByTestId("drawer");
    const buttonEl = await el.findByTestId("open");
    const contentEl = await el.findByTestId("drawer-content");

    const onClose = vi.fn();
    drawerEl?.addEventListener("_close", onClose);

    // initial state
    expect(contentEl).toBeTruthy();
    expect(drawerEl.style.visibility).toBe("hidden");

    // open
    await fireEvent.click(buttonEl);
    expect(drawerEl.style.visibility).toBe("visible");

    // close
    user.keyboard("{ESCAPE}");
    await waitFor(() => {
      expect(onClose).toBeCalled();
    });
  });

  it("renders the action slot", async () => {
    const el = render(DrawerWrapper, {
      position: "bottom",
      heading: "Heading",
      content: "This is the content",
      actions: "These are the actions",
    });

    expect(el).toBeTruthy();

    const actionsEl = await el.findByTestId("drawer-actions");
    expect(actionsEl).toBeTruthy();
    expect(actionsEl.innerHTML).toContain("These are the actions");
  });
});
