import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabWorkspaceLayout from "./workspace-layout.vue";

describe("GoabWorkspaceLayout", () => {
  it("should render", () => {
    const wrapper = mount(GoabWorkspaceLayout);
    expect(wrapper.find("goa-workspace-layout").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabWorkspaceLayout, {
      props: {
        testId: "ws-test",
        mt: "s",
      },
    });
    const el = wrapper.find("goa-workspace-layout").element;
    expect(el.getAttribute("testid")).toBe("ws-test");
    expect(el.getAttribute("mt")).toBe("s");
  });

  it("should render side-menu slot", () => {
    const wrapper = mount(GoabWorkspaceLayout, {
      slots: { "side-menu": "Side Menu Content" },
    });
    const el = wrapper.find("goa-workspace-layout").element;
    const slotEl = el.querySelector("[slot='side-menu']");
    expect(slotEl?.innerHTML).toContain("Side Menu Content");
  });

  it("should render page-header slot", () => {
    const wrapper = mount(GoabWorkspaceLayout, {
      slots: { "page-header": "Page Header Content" },
    });
    const el = wrapper.find("goa-workspace-layout").element;
    const slotEl = el.querySelector("[slot='page-header']");
    expect(slotEl?.innerHTML).toContain("Page Header Content");
  });

  it("should render page-footer slot", () => {
    const wrapper = mount(GoabWorkspaceLayout, {
      slots: { "page-footer": "Page Footer Content" },
    });
    const el = wrapper.find("goa-workspace-layout").element;
    const slotEl = el.querySelector("[slot='page-footer']");
    expect(slotEl?.innerHTML).toContain("Page Footer Content");
  });

  it("should render push-drawer slot", () => {
    const wrapper = mount(GoabWorkspaceLayout, {
      slots: { "push-drawer": "Push Drawer Content" },
    });
    const el = wrapper.find("goa-workspace-layout").element;
    const slotEl = el.querySelector("[slot='push-drawer']");
    expect(slotEl?.innerHTML).toContain("Push Drawer Content");
  });

  it("responds to _scrollStateChange event", () => {
    const wrapper = mount(GoabWorkspaceLayout);
    const el = wrapper.find("goa-workspace-layout").element;
    const detail = { state: "middle", isScrollable: true };

    el.dispatchEvent(new CustomEvent("_scrollStateChange", { detail }));

    expect(wrapper.emitted()).toHaveProperty("onScrollStateChange");
    expect(wrapper.emitted("onScrollStateChange")?.[0][0]).toMatchObject({
      state: "middle",
      isScrollable: true,
      event: expect.any(CustomEvent),
    });
  });
});
