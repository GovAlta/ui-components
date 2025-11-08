import { render, fireEvent, waitFor } from "@testing-library/svelte";
import { it, describe, expect, vi } from "vitest";
import TabsInputIntegrationWrapper from "./TabsInputIntegrationWrapper.test.svelte";

describe("Tabs + Input Integration (Issue #2977)", () => {
  it("should allow input change events to stop propagation and not trigger tab change", async () => {
    const { container } = render(TabsInputIntegrationWrapper);

    await waitFor(() => {
      const tab1 = container.querySelector("a#tab-1");
      const tab2 = container.querySelector("a#tab-2");
      expect(tab1).toBeTruthy();
      expect(tab2).toBeTruthy();
      expect(tab1?.getAttribute("aria-selected")).toBe("true");
      expect(tab2?.getAttribute("aria-selected")).toBe("false");
    });

    const tabsComponent = container.querySelector('div[role="tablist"]');
    const goaInput = container.querySelector('goa-input');

    expect(tabsComponent).toBeTruthy();
    expect(goaInput).toBeTruthy();

    const tabChangeSpy = vi.fn();
    const inputChangeSpy = vi.fn();

    // Listen for tab changes
    tabsComponent?.addEventListener("_change", (e: Event) => {
      tabChangeSpy((e as CustomEvent).detail);
    });

    // Listen for input changes and stop propagation
    goaInput?.addEventListener("_change", (e: Event) => {
      const ce = e as CustomEvent;
      inputChangeSpy(ce.detail);

      // This is the fix! We can now access the event and stop propagation
      if (ce.detail.event) {
        ce.detail.event.stopPropagation();
      }
      e.stopPropagation();
    });

    // Simulate typing by dispatching a _change event directly on goaInput
    const inputEvent = new Event("keyup", { bubbles: true });
    const changeEvent = new CustomEvent("_change", {
      bubbles: true,
      composed: true,
      detail: {
        name: "test-input",
        value: "test value",
        event: inputEvent,
      },
    });
    goaInput?.dispatchEvent(changeEvent);

    await waitFor(() => {
      // Input change should fire
      expect(inputChangeSpy).toHaveBeenCalledTimes(1);
      expect(inputChangeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "test-input",
          value: "test value",
          event: expect.any(Event),
        })
      );

      // Tab change should NOT fire because we stopped propagation
      expect(tabChangeSpy).not.toHaveBeenCalled();
    });

    // Verify tab 1 is still selected (no unwanted tab change)
    await waitFor(() => {
      const tab1 = container.querySelector("a#tab-1");
      const tab2 = container.querySelector("a#tab-2");
      expect(tab1?.getAttribute("aria-selected")).toBe("true");
      expect(tab2?.getAttribute("aria-selected")).toBe("false");
    });
  });

  it("should pass event object in tab _change events", async () => {
    const { container } = render(TabsInputIntegrationWrapper);

    await waitFor(() => {
      const tab1 = container.querySelector("a#tab-1");
      const tab2 = container.querySelector("a#tab-2");
      expect(tab1).toBeTruthy();
      expect(tab2).toBeTruthy();
    });

    const tabsComponent = container.querySelector('div[role="tablist"]');
    expect(tabsComponent).toBeTruthy();

    let tabChangeDetail: any;
    tabsComponent?.addEventListener("_change", (e: Event) => {
      tabChangeDetail = (e as CustomEvent).detail;
    });

    const tab2Link = container.querySelector("a#tab-2") as HTMLElement;
    await fireEvent.click(tab2Link);

    await waitFor(() => {
      expect(tabChangeDetail).toBeDefined();
      expect(tabChangeDetail.tab).toBe(2);
      expect(tabChangeDetail.event).toBeDefined();
      expect(tabChangeDetail.event).toBeInstanceOf(Event);
    });
  });
});
