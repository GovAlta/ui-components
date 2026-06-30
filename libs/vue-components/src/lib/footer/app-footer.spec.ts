import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabAppFooter from "./app-footer.vue";

describe("GoabAppFooter", () => {
  it("should render", () => {
    const wrapper = mount(GoabAppFooter);
    expect(wrapper.find("goa-app-footer").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabAppFooter, {
      props: {
        maxContentWidth: "1200px",
        url: "https://alberta.ca",
        testId: "footer-test",
      },
    });
    const el = wrapper.find("goa-app-footer").element;
    expect(el.getAttribute("maxcontentwidth")).toBe("1200px");
    expect(el.getAttribute("url")).toBe("https://alberta.ca");
    expect(el.getAttribute("testid")).toBe("footer-test");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabAppFooter, {
      slots: { default: "Footer content" },
    });
    expect(wrapper.text()).toContain("Footer content");
  });
});
