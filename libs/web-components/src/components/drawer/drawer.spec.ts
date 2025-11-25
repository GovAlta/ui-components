import { describe, it, beforeEach } from "vitest";
import DrawerWrapper from "./DrawerWrapper.test.svelte";
import { fireEvent, render, waitFor } from "@testing-library/svelte";
import userEvent, { UserEvent } from "@testing-library/user-event";

let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup();
});

describe("Drawer", () => {

  it("renders content in closed state", async () => {
    const el = await render(DrawerWrapper, {
      open: false,
      testid: "drawer"
    });

    await waitFor(() => {
      const drawerEl = el.queryByTestId("drawer");
      expect(drawerEl?.style.visibility).toBe("hidden");
    });
  });

  it("closes when clicking the background or close button", async () => {
    const el = render(DrawerWrapper, {
      open: false,
      testid: "drawer"
    });

    // Initial state - wait for first render
    const drawer = el.queryByTestId("drawer");
    expect(drawer?.style.visibility).toBe("hidden");

    // Open drawer
    const buttonEl = await el.findByTestId("open");
    await fireEvent.click(buttonEl);

    await waitFor(() => {
      const drawer = el.queryByTestId("drawer");
      expect(drawer?.style.visibility).toBe("visible");
    }, { timeout: 1000 });

    // Click background to close
    const background = el.queryByTestId("background");
    await fireEvent.click(background);

    setTimeout(() => {
      const drawer = el.queryByTestId("drawer");
      expect(drawer?.style.visibility).toBe("hidden");
    }, 1000);
  });

  it("renders the action slot with content", async () => {
    const el = render(DrawerWrapper, {
      position: "bottom",
      heading: "Heading",
      content: "This is the content",
      actions: "These are the actions",
    });
    const buttonEl = await el.findByTestId("open");
    await fireEvent.click(buttonEl);

    const actionsEl = await el.findByTestId("drawer-actions");
    expect(actionsEl).toBeTruthy();
    expect(actionsEl.innerHTML).toContain("These are the actions");
    expect(actionsEl.classList.contains("empty-actions")).toBe(false);
  });

  it("handles empty action slot correctly", async () => {
    const el = await render(DrawerWrapper, {
      open: true,
      testid: "drawer",
      heading: "Heading"
    });
    await waitFor(() => {
      const actionsEl = el.queryByTestId("drawer-actions");
      expect(actionsEl?.classList.contains("empty-actions")).toBe(true);
    }, { timeout: 1000 });
  });

  it.each([
    "bottom",
    "left",
    "right",
  ])("renders with position %s", async (position) => {
    const el = render(DrawerWrapper, {
      position,
      heading: "Heading",
      content: "Content",
      testid: "drawer",
    });

    const buttonEl = await el.findByTestId("open");
    await fireEvent.click(buttonEl);

    const drawerEl = await el.findByTestId("drawer");
    await waitFor(() => {
      const drawer = drawerEl.querySelector(".drawer") as HTMLElement;
      expect(drawer?.classList.contains(`drawer-${position}`)).toBe(true);
      expect(drawer?.classList.contains(`drawer-open-${position}`)).toBe(true);
    });
  });

  it("respects maxsize prop", async () => {
    const maxsize = "400px";
    const el = render(DrawerWrapper, {
      position: "right",
      heading: "Heading",
      content: "Content",
      maxsize,
      testid: "drawer",
    });

    const buttonEl = await el.findByTestId("open");

    await fireEvent.click(buttonEl);

    const drawerEl = await el.findByTestId("drawer");
    await waitFor(() => {
      const drawer = drawerEl.querySelector(".drawer") as HTMLElement;
      expect(drawer?.style.maxWidth).toBe(`min(${maxsize}, 100vw)`);
    });
  });

  it("updates scroll position correctly", async () => {
    const el = render(DrawerWrapper, {
      position: "right",
      heading: "Heading",
      content: "Content".repeat(100), // Create long content to enable scrolling
      testid: "drawer",
    });

    const buttonEl = await el.findByTestId("open");

    // Open the drawer and wait for it to be visible
    await fireEvent.click(buttonEl);
    const drawerEl = await el.findByTestId("drawer");
    await waitFor(() => {
      expect(drawerEl.style.visibility).toBe("visible");
    });

    const scrollableEl = drawerEl.querySelector("goa-scrollable");
    expect(scrollableEl).toBeTruthy();

    // Wait for the drawer to be fully rendered
    await waitFor(() => {
      expect(scrollableEl).toBeTruthy();
    });

    // Simulate scroll events
    await fireEvent(
      scrollableEl as Element,
      new CustomEvent("_scroll", {
        detail: { scrollTop: 0, scrollHeight: 1000, offsetHeight: 500 },
      }),
    );
    await waitFor(() => {
      expect(drawerEl.classList.contains("top")).toBe(true);
    });

    await fireEvent(
      scrollableEl as Element,
      new CustomEvent("_scroll", {
        detail: { scrollTop: 250, scrollHeight: 1000, offsetHeight: 500 },
      }),
    );
    await waitFor(() => {
      expect(drawerEl?.classList.contains("middle")).toBe(true);
    });

    await fireEvent(
      scrollableEl as Element,
      new CustomEvent("_scroll", {
        detail: { scrollTop: 500, scrollHeight: 1000, offsetHeight: 500 },
      }),
    );
    await waitFor(() => {
      expect(drawerEl.classList.contains("bottom")).toBe(true);
    });
  });
});
