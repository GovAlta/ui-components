import { render } from "vitest-browser-react";
import { GoabFileUploadInput } from "../src";
import { expect, describe, it, vi } from "vitest";
import React from "react";

describe("FileUploadInput Browser Tests", () => {
  it("passes the browser event in select file detail", async () => {
    const onSelectFile = vi.fn();
    const file = new File(["hello"], "test.txt", { type: "text/plain" });

    const result = render(
      <GoabFileUploadInput
        testId="file-upload-input"
        onSelectFile={onSelectFile}
        accept=".txt"
        maxFileSize="1MB"
      />,
    );

    const fileUpload = result.getByTestId("file-upload-input");

    await vi.waitFor(() => {
      expect(fileUpload.element()).toBeTruthy();
    });

    const host = result.container.querySelector("goa-file-upload-input") as HTMLElement | null;
    expect(host).toBeTruthy();

    const selectEvent = new CustomEvent("_selectFile", {
      detail: { file },
    });

    host?.dispatchEvent(selectEvent);

    await vi.waitFor(() => {
      expect(onSelectFile).toHaveBeenCalledTimes(1);
      const detail = onSelectFile.mock.calls[0][0];
      expect(detail.file).toBe(file);
      expect(detail.event).toBe(selectEvent);
      expect(detail.event).toBeInstanceOf(Event);
    });
  });
});
