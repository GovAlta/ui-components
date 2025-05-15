import { render, fireEvent, waitFor } from "@testing-library/svelte";
import GoAMenuAction from "./MenuAction.svelte";
import { it, describe, vi } from "vitest";

describe("GoAMenuAction", () => {
  it("should render", async () => {
    const { findByRole } = render(GoAMenuAction, { text: "Test Action" });
    const button = await findByRole("button");

    expect(button).toBeTruthy();
  });

  it("should render with text", async () => {
    const { findByRole } = render(GoAMenuAction, { text: "Test Action" });
    const button = await findByRole("button");

    expect(button).toHaveTextContent("Test Action");
  });

  it("should render with testid", async () => {
    const { findByTestId } = render(GoAMenuAction, {
      text: "Test Action",
      testid: "menu-action-test"
    });
    const button = await findByTestId("menu-action-test");

    expect(button).toBeTruthy();
  });

  describe("icon", () => {
    it("should render without icon by default", async () => {
      const { findByRole } = render(GoAMenuAction, { text: "Test Action" });
      const button = await findByRole("button");

      expect(button.querySelector("goa-icon")).toBeNull();
    });

    it("should render with icon when provided", async () => {
      const { findByRole } = render(GoAMenuAction, {
        text: "Test Action",
        icon: "add"
      });
      const button = await findByRole("button");

      const icon = button.querySelector("goa-icon");
      expect(icon).toBeTruthy();
      expect(icon).toHaveAttribute("type", "add");
      expect(icon).toHaveAttribute("data-testid", "icon-add");
    });
  });

  describe("action", () => {
    it("should have default action", async () => {
      const { findByRole } = render(GoAMenuAction, { text: "Test Action" });
      const button = await findByRole("button");

      expect(button).toBeTruthy();
    });

    it("should accept custom action", async () => {
      const { findByRole } = render(GoAMenuAction, {
        text: "Test Action",
        action: "custom-action"
      });
      const button = await findByRole("button");

      expect(button).toBeTruthy();
    });
  });

  describe("events", () => {
    it("should dispatch click event with action data", async () => {
      const onClick = vi.fn();
      const { findByRole } = render(GoAMenuAction, {
        text: "Test Action",
        action: "test-action"
      });
      const button = await findByRole("button");

      button.addEventListener("msg", onClick);
      await fireEvent.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick.mock.calls[0][0].detail.action).toBe("click");
      expect(onClick.mock.calls[0][0].detail.data).toEqual({ action: "test-action" });
    });

    it("should dispatch bind event on mount", async () => {
      const onBind = vi.fn();
      const { findByRole } = render(GoAMenuAction, {
        text: "Test Action",
        action: "test-action"
      });
      const button = await findByRole("button");

      button.addEventListener("msg", onBind);

      // Wait for onMount to trigger
      await waitFor(() => {
        expect(onBind).toHaveBeenCalled();
      });

      // Find the bind event call
      const bindCall = onBind.mock.calls.find(call =>
        call[0].detail.action === "bind"
      );
      expect(bindCall).toBeTruthy();
      expect(bindCall[0].detail.data).toBe(button);
    });
  });

  describe("styling", () => {
    it("should have proper button structure", async () => {
      const { findByRole } = render(GoAMenuAction, { text: "Test Action" });
      const button = await findByRole("button");

      expect(button.tagName).toBe("BUTTON");

      const span = button.querySelector("span");
      expect(span).toBeTruthy();
      expect(span).toHaveTextContent("Test Action");
      expect(span).toHaveStyle("padding-bottom: var(--font-valign-fix)");
    });

    it("should render icon before text when both provided", async () => {
      const { findByRole } = render(GoAMenuAction, {
        text: "Test Action",
        icon: "add"
      });
      const button = await findByRole("button");

      const icon = button.querySelector("goa-icon");
      const span = button.querySelector("span");

      expect(icon).toBeTruthy();
      expect(span).toBeTruthy();

      // Icon should come before span in DOM order
      const children = Array.from(button.children);
      expect(children.indexOf(icon)).toBeLessThan(children.indexOf(span));
    });
  });

  describe("accessibility", () => {
    it("should be focusable", async () => {
      const { findByRole } = render(GoAMenuAction, { text: "Test Action" });
      const button = await findByRole("button");

      expect(button).toHaveAttribute("tabindex", "0");
    });

    it("should have proper button role", async () => {
      const { findByRole } = render(GoAMenuAction, { text: "Test Action" });
      const button = await findByRole("button");

      expect(button.getAttribute("role")).toBe(null); // Native button role
    });
  });
});
