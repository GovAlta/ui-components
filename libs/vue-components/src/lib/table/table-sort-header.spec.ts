import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabTableSortHeader from "./table-sort-header.vue";

describe("GoabTableSortHeader", () => {
  it("should render", () => {
    const wrapper = mount(GoabTableSortHeader);
    expect(wrapper.find("goa-table-sort-header").element).toBeTruthy();
  });

  it("should render the properties with kebab-case transform", () => {
    const wrapper = mount(GoabTableSortHeader, {
      props: {
        name: "column1",
        direction: "asc",
        sortOrder: 1,
      },
    });
    const el = wrapper.find("goa-table-sort-header").element;
    expect(el.getAttribute("name")).toBe("column1");
    expect(el.getAttribute("direction")).toBe("asc");
    expect(el.getAttribute("sort-order")).toBe("1");
  });

  it("should use none as default direction", () => {
    const wrapper = mount(GoabTableSortHeader, {
      props: { name: "column1" },
    });
    const el = wrapper.find("goa-table-sort-header").element;
    expect(el.getAttribute("direction")).toBe("none");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabTableSortHeader, {
      slots: { default: "Column Header" },
    });
    expect(wrapper.text()).toContain("Column Header");
  });
});
