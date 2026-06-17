import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabPagination from "./pagination.vue";

describe("GoabPagination", () => {
  it("should render", () => {
    const wrapper = mount(GoabPagination, {
      props: { itemCount: 100, pageNumber: 1 },
    });
    const el = wrapper.find("goa-pagination").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabPagination, {
      props: {
        itemCount: 100,
        pageNumber: 3,
        perPageCount: 20,
        variant: "links-only",
        testId: "pagination-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-pagination").element;
    expect(el.getAttribute("itemcount")).toBe("100");
    expect(el.getAttribute("pagenumber")).toBe("3");
    expect(el.getAttribute("perpagecount")).toBe("20");
    expect(el.getAttribute("variant")).toBe("links-only");
    expect(el.getAttribute("testid")).toBe("pagination-test");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("responds to events", () => {
    const wrapper = mount(GoabPagination, {
      props: { itemCount: 100, pageNumber: 1 },
    });
    const el = wrapper.find("goa-pagination").element;
    el.dispatchEvent(new CustomEvent("_change", { detail: { page: 2 } }));
    expect(wrapper.emitted()).toHaveProperty("onChange");
    expect(wrapper.emitted("onChange")[0]).toEqual([{ page: 2 }]);
  });
});
