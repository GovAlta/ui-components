import { fireEvent, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import FileUploadInput from "./file-upload-input";

const noop = () => {};

describe("FileUploadInput", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <FileUploadInput
        onSelectFile={noop}
        maxFileSize="10MB"
        accept="image/*"
        variant="dragdrop"
      />
    );
    const el = baseElement.querySelector("goa-file-upload-input");

    expect(el?.getAttribute("maxfilesize")).toBe("10MB");
    expect(el?.getAttribute("accept")).toBe("image/*");
    expect(el?.getAttribute("variant")).toBe("dragdrop");
  });

  it("handles the onSelectFile event", () => {
    const onSelect = vi.fn();
    const { baseElement } = render(<FileUploadInput onSelectFile={onSelect} />);
    const el = baseElement.querySelector("goa-file-upload-input");
    el && fireEvent(el, new CustomEvent("_selectFile", { detail: {} }));

    expect(onSelect).toBeCalled();
  });
});
