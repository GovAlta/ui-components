import { fireEvent, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import FileUploadCard from "./file-upload-card";

describe("FileUploadCard", () => {
  it("should render with base params", () => {
    const { container } = render(
      <FileUploadCard filename="foo.png" size={1e3} />
    );

    const el = container.querySelector("goa-file-upload-card");
    expect(el?.getAttribute("filename")).toBe("foo.png");
    expect(el?.getAttribute("size")).toBe("1000");
  });

  it("should render with additional params", () => {
    const { container } = render(
      <FileUploadCard
        filename="foo.png"
        size={1e3}
        type="image/png"
        progress={23}
        error="true"
      />
    );

    const el = container.querySelector("goa-file-upload-card");
    expect(el?.getAttribute("filename")).toBe("foo.png");
    expect(el?.getAttribute("size")).toBe("1000");
    expect(el?.getAttribute("type")).toBe("image/png");
    expect(el?.getAttribute("progress")).toBe("23");
    expect(el?.getAttribute("error")).toBe("true");
  });

  it("dispatches and event when cancel is clicked while uploading", () => {
    const onCancel = vi.fn();
    const { container } = render(
      <FileUploadCard
        filename="foo.png"
        size={1e3}
        onCancel={onCancel}
        progress={23}
      />
    );

    const el = container.querySelector("goa-file-upload-card");
    el && fireEvent(el, new CustomEvent("_cancel"));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("dispatches and event when delete is clicked and upload is complete", () => {
    const onDelete = vi.fn();
    const { container } = render(
      <FileUploadCard
        filename="foo.png"
        size={1e3}
        onDelete={onDelete}
        progress={100}
      />
    );

    const el = container.querySelector("goa-file-upload-card");
    el && fireEvent(el, new CustomEvent("_delete"));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("dispatches and event when an error occurs", () => {
    const onDelete = vi.fn();
    const { container } = render(
      <FileUploadCard
        filename="foo.png"
        size={1e3}
        onDelete={onDelete}
        error="fail"
      />
    );

    const el = container.querySelector("goa-file-upload-card");
    el && fireEvent(el, new CustomEvent("_delete"));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
