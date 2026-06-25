import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GoabFileUploadCard from "./file-upload-card.vue";

describe("GoabFileUploadCard", () => {
  it("should render", () => {
    const wrapper = mount(GoabFileUploadCard, {
      props: { filename: "document.pdf", size: 1024 },
    });
    expect(wrapper.find("goa-file-upload-card").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabFileUploadCard, {
      props: {
        filename: "document.pdf",
        size: 1024 * 1024 * 5,
        type: "application/pdf",
        progress: 50,
        error: "Upload failed",
        testId: "file-upload-card-test",
      },
    });
    const el = wrapper.find("goa-file-upload-card").element;
    expect(el.getAttribute("filename")).toBe("document.pdf");
    expect(el.getAttribute("size")).toBe("5242880");
    expect(el.getAttribute("type")).toBe("application/pdf");
    expect(el.getAttribute("progress")).toBe("50");
    expect(el.getAttribute("error")).toBe("Upload failed");
    expect(el.getAttribute("testid")).toBe("file-upload-card-test");
  });

});
