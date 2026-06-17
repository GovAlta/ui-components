import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabCardImage from "./card-image.vue";

describe("GoabCardImage", () => {
  it("should render", () => {
    const wrapper = mount(GoabCardImage, {
      props: { src: "https://example.com/image.jpg", height: "200px" },
    });
    expect(wrapper.find("goa-card-image").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabCardImage, {
      props: {
        src: "https://example.com/image.jpg",
        height: "200px",
        testId: "card-image-test",
      },
    });
    const el = wrapper.find("goa-card-image").element;
    expect(el.getAttribute("src")).toBe("https://example.com/image.jpg");
    expect(el.getAttribute("height")).toBe("200px");
    expect(el.getAttribute("testid")).toBe("card-image-test");
  });
});
