import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GoabFileUploadInput from "./file-upload-input.vue";

describe("GoabFileUploadInput", () => {
  it("should render", () => {
    const wrapper = mount(GoabFileUploadInput);
    expect(wrapper.find("goa-file-upload-input").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabFileUploadInput, {
      props: {
        name: "file-upload",
        accept: ".pdf,.docx",
        disabled: true,
        multiple: false,
        testId: "file-upload-input-test",
        mt: "s",
      },
    });
    const el = wrapper.find("goa-file-upload-input").element;
    expect(el.getAttribute("name")).toBe("file-upload");
    expect(el.getAttribute("accept")).toBe(".pdf,.docx");
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("multiple")).toBe("false");
    expect(el.getAttribute("testid")).toBe("file-upload-input-test");
    expect(el.getAttribute("mt")).toBe("s");
  });

  it("should not set disabled when false", () => {
    const wrapper = mount(GoabFileUploadInput, {
      props: { name: "upload", disabled: false },
    });
    const el = wrapper.find("goa-file-upload-input").element;
    expect(el.getAttribute("disabled")).toBe("false");
  });
});
