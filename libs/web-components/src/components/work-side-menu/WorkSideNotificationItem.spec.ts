import { render, fireEvent, waitFor } from "@testing-library/svelte";
import { it, describe, expect, vi } from "vitest";
import WorkSideNotificationItem from "./WorkSideNotificationItem.svelte";

describe("WorkSideNotificationItem", () => {
  it("should render correctly and handle interactions", async () => {
    const { container } = render(WorkSideNotificationItem, {
      testid: "my-notification",
      title: "New update",
      description: "Something happened",
      timestamp: "2026-01-01T10:00:00Z",
      type: "info",
      readStatus: "read",
      priority: "urgent",
    });
    const card = container.querySelector('[data-testid="my-notification"]');

    expect(card).toBeTruthy();
    expect(card?.getAttribute("role")).toBe("button");
    expect(card?.getAttribute("tabindex")).toBe("0");
    expect(container.querySelector('[data-testid="title-my-notification"]')?.textContent).toBe("New update");
    expect(container.querySelector('[data-testid="description-my-notification"]')?.textContent).toContain("Something happened");
    expect(container.querySelector("goa-tooltip")).toBeTruthy();
    expect(container.querySelector('[data-testid="badge-my-notification"]')).toBeTruthy();
    expect(card?.classList.contains("read")).toBe(true);
    expect(container.querySelector('[data-testid="unread-dot-my-notification"]')?.classList.contains("hidden")).toBe(true);
    expect(card?.classList.contains("urgent")).toBe(true);

    // Events
    const onClick = vi.fn();
    card?.addEventListener("_click", onClick);

    await fireEvent.click(card!);
    await fireEvent.keyDown(card!, { key: "Enter" });
    await fireEvent.keyDown(card!, { key: " " });

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(3);
    });
  });
});
