import { render, waitFor } from "@testing-library/svelte";
import GoAWorkspaceLayoutWrapper from "./WorkspaceLayoutWrapper.test.svelte";
import GoAWorkspaceLayout from "./WorkspaceLayout.svelte";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { WorkspaceScrollLockMsg } from "../../types/relay-types";

function relayScrollLock(root: ParentNode, id: string, locked: boolean) {
  const shell = root.querySelector(".shell");
  shell?.dispatchEvent(
    new CustomEvent("msg", {
      detail: { action: WorkspaceScrollLockMsg, data: { id, locked } },
    }),
  );
}

beforeAll(() => {
  class ResizeObserverMock {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
});

describe("GoA WorkspaceLayout", () => {
  it("renders the default slot content", () => {
    render(GoAWorkspaceLayoutWrapper, {
      content: "Body content here",
    });
    const content = document.querySelector(".body-content");
    expect(content?.textContent).toContain("Body content here");
  });

  it("renders the side-menu slot when provided", () => {
    render(GoAWorkspaceLayoutWrapper, {
      sideMenu: "Nav",
      content: "Body",
    });
    const sideMenu = document.querySelector(".side-menu-content");
    expect(sideMenu?.textContent).toContain("Nav");
  });

  it("renders the page-header slot when provided", () => {
    render(GoAWorkspaceLayoutWrapper, {
      header: "Header text",
      content: "Body",
    });
    const header = document.querySelector(".header-content");
    expect(header?.textContent).toContain("Header text");
  });

  it("renders the page-footer slot when provided", () => {
    render(GoAWorkspaceLayoutWrapper, {
      footer: "Footer text",
      content: "Body",
    });
    const footer = document.querySelector(".footer-content");
    expect(footer?.textContent).toContain("Footer text");
  });

  it("sets the testid attribute", async () => {
    const { findByTestId } = render(GoAWorkspaceLayout, {
      testid: "ws-layout",
    });
    const el = await findByTestId("ws-layout");
    expect(el).toBeTruthy();
  });

  it("locks the card scroll while an overlay holds a scroll lock", async () => {
    const { container } = render(GoAWorkspaceLayout, {});
    const card = container.querySelector(".card") as HTMLElement;

    relayScrollLock(container, "modal-1", true);
    await waitFor(() => {
      expect(card.style.overflowY).toBe("hidden");
    });

    relayScrollLock(container, "modal-1", false);
    await waitFor(() => {
      expect(card.style.overflowY).toBe("");
    });
  });

  it("keeps the card locked until every overlay releases its lock", async () => {
    const { container } = render(GoAWorkspaceLayout, {});
    const card = container.querySelector(".card") as HTMLElement;

    relayScrollLock(container, "modal-1", true);
    relayScrollLock(container, "loader-1", true);
    await waitFor(() => {
      expect(card.style.overflowY).toBe("hidden");
    });

    // One overlay closes; the other still holds the lock.
    relayScrollLock(container, "modal-1", false);
    await waitFor(() => {
      expect(card.style.overflowY).toBe("hidden");
    });

    relayScrollLock(container, "loader-1", false);
    await waitFor(() => {
      expect(card.style.overflowY).toBe("");
    });
  });

});
