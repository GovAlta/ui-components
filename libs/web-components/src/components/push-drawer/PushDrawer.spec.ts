import { render, waitFor } from "@testing-library/svelte";
import GoAPushDrawer from "./PushDrawer.svelte";
import { it, describe, beforeEach, afterEach, vi, expect } from "vitest";

describe("GoAPushDrawer", () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it("should render goa-push-drawer-internal on desktop (>=1024px)", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { container } = render(GoAPushDrawer, {
      props: {
        open: true,
        heading: "Test Drawer",
      },
    });

    await waitFor(() => {
      const pushDrawerInternal = container.querySelector(
        "goa-push-drawer-internal",
      );
      const drawer = container.querySelector("goa-drawer");

      expect(pushDrawerInternal).toBeTruthy();
      expect(drawer).toBeNull();
    });
  });

  it("should render goa-drawer on mobile (<=1023px)", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1023,
    });

    const { container } = render(GoAPushDrawer, {
      props: {
        open: true,
        heading: "Test Drawer",
      },
    });

    await waitFor(() => {
      const pushDrawerInternal = container.querySelector(
        "goa-push-drawer-internal",
      );
      const drawer = container.querySelector("goa-drawer");

      expect(drawer).toBeTruthy();
      expect(pushDrawerInternal).toBeNull();
    });
  });
});
