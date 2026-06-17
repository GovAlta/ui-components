import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabCard from "./card.vue";
import GoabCardActions from "./card-actions.vue";
import GoabCardContent from "./card-content.vue";
import GoabCardImage from "./card-image.vue";
import GoabCardGroup from "./card-group.vue";

describe("GoabCard", () => {
  it("should render", () => {
    const wrapper = mount(GoabCard);
    const el = wrapper.find("goa-card").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabCard, {
      props: {
        elevation: 2,
        width: "300px",
        testId: "card-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-card").element;
    expect(el.getAttribute("elevation")).toBe("2");
    expect(el.getAttribute("width")).toBe("300px");
    expect(el.getAttribute("testid")).toBe("card-test");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabCard, {
      slots: { default: "Card content" },
    });
    expect(wrapper.text()).toContain("Card content");
  });
});

describe("GoabCardActions", () => {
  it("should render", () => {
    const wrapper = mount(GoabCardActions);
    const el = wrapper.find("goa-card-actions").element;
    expect(el).toBeTruthy();
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabCardActions, {
      slots: { default: "Action buttons" },
    });
    expect(wrapper.text()).toContain("Action buttons");
  });
});

describe("GoabCardContent", () => {
  it("should render", () => {
    const wrapper = mount(GoabCardContent);
    const el = wrapper.find("goa-card-content").element;
    expect(el).toBeTruthy();
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabCardContent, {
      slots: { default: "Content body" },
    });
    expect(wrapper.text()).toContain("Content body");
  });
});

describe("GoabCardImage", () => {
  it("should render", () => {
    const wrapper = mount(GoabCardImage, {
      props: { src: "image.jpg", height: "200px" },
    });
    const el = wrapper.find("goa-card-image").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabCardImage, {
      props: {
        src: "https://example.com/image.jpg",
        height: "200px",
      },
    });
    const el = wrapper.find("goa-card-image").element;
    expect(el.getAttribute("src")).toBe("https://example.com/image.jpg");
    expect(el.getAttribute("height")).toBe("200px");
  });
});

describe("GoabCardGroup", () => {
  it("should render", () => {
    const wrapper = mount(GoabCardGroup);
    const el = wrapper.find("goa-card-group").element;
    expect(el).toBeTruthy();
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabCardGroup, {
      slots: { default: "Card group content" },
    });
    expect(wrapper.text()).toContain("Card group content");
  });
});
