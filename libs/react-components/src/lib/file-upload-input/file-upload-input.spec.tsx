import { fireEvent, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import FileUploadInput from "./file-upload-input";

const noop = () => { /* do nothing */ };

describe("FileUploadInput", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <FileUploadInput
        onSelectFile={noop}
        maxFileSize="10MB"
        accept="image/*"
        variant="dragdrop"
        testId="foo"
      />
    );
    const el = baseElement.querySelector("goa-file-upload-input");

    expect(el?.getAttribute("maxfilesize")).toBe("10MB");
    expect(el?.getAttribute("accept")).toBe("image/*");
    expect(el?.getAttribute("variant")).toBe("dragdrop");
    expect(el?.getAttribute("testid")).toBe("foo");
  });

  it("handles the onSelectFile event", () => {
    const onSelect = vi.fn();
    const { baseElement } = render(<FileUploadInput onSelectFile={onSelect} />);
    const el = baseElement.querySelector("goa-file-upload-input");
    el && fireEvent(el, new CustomEvent("_selectFile", { detail: {} }));

    expect(onSelect).toBeCalled();
  });

  it("should pass data-grid attributes", () => {
    const { baseElement } = render(
      <FileUploadInput
        onSelectFile={noop}
        data-grid="cell"
      />
    );
    const el = baseElement.querySelector("goa-file-upload-input");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
