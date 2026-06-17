import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabSkeleton from "./skeleton.vue";

describe("GoabSkeleton", () => {
  it("should render", () => {
    const wrapper = mount(GoabSkeleton, { props: { type: "image" } });
    expect(wrapper.find("goa-skeleton").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabSkeleton, {
      props: {
        type: "card",
        size: "1",
        maxWidth: "300px",
        lineCount: 3,
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        testId: "test",
      },
    });
    const el = wrapper.find("goa-skeleton").element;
    expect(el.getAttribute("type")).toBe("card");
    expect(el.getAttribute("size")).toBe("1");
    expect(el.getAttribute("maxwidth")).toBe("300px");
    expect(el.getAttribute("linecount")).toBe("3");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("testid")).toBe("test");
  });
});
