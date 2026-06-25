import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabTable from "./table.vue";
import GoabTableSortHeader from "./table-sort-header.vue";

describe("GoabTable", () => {
  it("should render", () => {
    const wrapper = mount(GoabTable);
    const el = wrapper.find("goa-table").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabTable, {
      props: {
        width: "100%",
        sortMode: "single",
        variant: "relaxed",
        striped: true,
        testId: "table-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-table").element;
    expect(el.getAttribute("width")).toBe("100%");
    expect(el.getAttribute("sort-mode")).toBe("single");
    expect(el.getAttribute("variant")).toBe("relaxed");
    expect(el.getAttribute("striped")).toBe("true");
    expect(el.getAttribute("testid")).toBe("table-test");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabTable, {
      slots: { default: "<tr><td>Cell content</td></tr>" },
    });
    expect(wrapper.find("table").exists()).toBe(true);
  });

  it("responds to sort event", () => {
    const wrapper = mount(GoabTable);
    const el = wrapper.find("goa-table").element;
    el.dispatchEvent(new CustomEvent("_sort", { detail: { sortBy: "name", sortDir: "asc" } }));
    expect(wrapper.emitted()).toHaveProperty("onSort");
    expect(wrapper.emitted("onSort")![0]).toEqual([{ sortBy: "name", sortDir: "asc" }]);
  });

  it("responds to multisort event", () => {
    const wrapper = mount(GoabTable);
    const el = wrapper.find("goa-table").element;
    el.dispatchEvent(
      new CustomEvent("_multisort", { detail: { sortBy: ["name", "age"], sortDir: ["asc", "desc"] } }),
    );
    expect(wrapper.emitted()).toHaveProperty("onMultiSort");
    expect(wrapper.emitted("onMultiSort")![0]).toEqual([
      { sortBy: ["name", "age"], sortDir: ["asc", "desc"] },
    ]);
  });
});

describe("GoabTableSortHeader", () => {
  it("should render", () => {
    const wrapper = mount(GoabTableSortHeader);
    const el = wrapper.find("goa-table-sort-header").element;
    expect(el).toBeTruthy();
  });

  it("should render with props", () => {
    const wrapper = mount(GoabTableSortHeader, {
      props: { name: "name", direction: "asc", sortOrder: 1 },
    });
    const el = wrapper.find("goa-table-sort-header").element;
    expect(el.getAttribute("name")).toBe("name");
    expect(el.getAttribute("direction")).toBe("asc");
    expect(el.getAttribute("sort-order")).toBe("1");
  });

  it("should render default slot content", () => {
    const wrapper = mount(GoabTableSortHeader, {
      slots: { default: "Column Name" },
    });
    expect(wrapper.text()).toContain("Column Name");
  });
});
