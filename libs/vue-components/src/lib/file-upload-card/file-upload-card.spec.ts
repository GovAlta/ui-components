import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GoabFileUploadCard from "./file-upload-card.vue";

describe("GoabFileUploadCard", () => {
  it("should render", () => {
    const wrapper = mount(GoabFileUploadCard);
    expect(wrapper.find("goa-file-upload-card").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabFileUploadCard, {
      props: {
        heading: "Upload documents",
        description: "Drag and drop files here",
        accept: ".pdf,.docx",
        maxFileSize: 1024 * 1024 * 5,
        maxFiles: 5,
        testId: "file-upload-card-test",
        mt: "s",
      },
    });
    const el = wrapper.find("goa-file-upload-card").element;
    expect(el.getAttribute("heading")).toBe("Upload documents");
    expect(el.getAttribute("description")).toBe("Drag and drop files here");
    expect(el.getAttribute("accept")).toBe(".pdf,.docx");
    expect(el.getAttribute("maxfilesize")).toBe("5242880");
    expect(el.getAttribute("maxfiles")).toBe("5");
    expect(el.getAttribute("testid")).toBe("file-upload-card-test");
    expect(el.getAttribute("mt")).toBe("s");
  });

});
