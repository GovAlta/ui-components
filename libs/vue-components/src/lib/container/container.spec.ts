import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabContainer from "./container.vue";

describe("GoabContainer", () => {
  it("should render", () => {
    const wrapper = mount(GoabContainer);
    expect(wrapper.find("goa-container").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabContainer, {
      props: {
        type: "interactive",
        accent: "filled",
        padding: "relaxed",
        width: "full",
        maxWidth: "1200px",
        minHeight: "100px",
        maxHeight: "500px",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        testId: "test",
      },
    });
    const el = wrapper.find("goa-container").element;
    expect(el.getAttribute("type")).toBe("interactive");
    expect(el.getAttribute("accent")).toBe("filled");
    expect(el.getAttribute("padding")).toBe("relaxed");
    expect(el.getAttribute("width")).toBe("full");
    expect(el.getAttribute("maxwidth")).toBe("1200px");
    expect(el.getAttribute("minheight")).toBe("100px");
    expect(el.getAttribute("maxheight")).toBe("500px");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("testid")).toBe("test");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabContainer, {
      slots: { default: "Container content" },
    });
    expect(wrapper.text()).toContain("Container content");
  });

  it("should render title via named slot", () => {
    const wrapper = mount(GoabContainer, {
      slots: { title: "Title content" },
    });
    expect(wrapper.text()).toContain("Title content");
  });

  it("should render actions via named slot", () => {
    const wrapper = mount(GoabContainer, {
      slots: { actions: "Actions content" },
    });
    expect(wrapper.text()).toContain("Actions content");
  });
});
