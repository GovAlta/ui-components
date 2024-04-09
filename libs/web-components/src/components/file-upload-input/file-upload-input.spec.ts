import FileUploadInput from './FileUploadInput.svelte'
import { fireEvent, render, waitFor } from '@testing-library/svelte'
import { describe, it, expect, vi } from "vitest";

it('it renders', async () => {
  const { queryByTestId } = render(FileUploadInput)

  const input = queryByTestId("input");
  const maxFileSize = queryByTestId("max-file-size");

  expect(input).toBeTruthy();
  expect(maxFileSize?.innerHTML).toContain("5MB") // default
})

describe("File selection", () => {

  it("reads the selected file and triggers the _selectFile event", async () => {
    const file = new File([new ArrayBuffer(1e6)], 'file.jpg', { type: "image/jpg" });

    const { queryByTestId } = render(FileUploadInput)
    const onChange = vi.fn()
    const onFileSelect = vi.fn()
    const dragdrop = queryByTestId("dragdrop")
    const input = queryByTestId("input") as HTMLInputElement;

    input.addEventListener("change", onChange)
    dragdrop?.addEventListener("_selectFile", onFileSelect)

    fireEvent.change(input, { target: { files: [file] } });

    expect(onChange).toBeCalled()
    expect(onFileSelect).toBeCalled()
  })

  it("validates the file size", async () => {
    const file = new File([new ArrayBuffer(1e6)], 'file.jpg', { type: "image/jpg" });
    const { queryByTestId } = render(FileUploadInput, { maxfilesize: "100KB" })
    const input = queryByTestId("input") as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(queryByTestId("error")?.innerHTML).toContain("100KB")
    })
  })

  it("validates a valid file type", async () => {
    const file = new File([new ArrayBuffer(1e6)], 'file.jpg', { type: "image/jpg" });
    const { queryByTestId } = render(FileUploadInput, { accept: "image/*" })
    const input = queryByTestId("input") as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(queryByTestId("error")).toBeFalsy()
    })
  })

  it("ensure spaces within the accept prop are allowed", async () => {
    const file = new File([new ArrayBuffer(1e6)], 'file.jpg', { type: "image/jpg" });
    const { queryByTestId } = render(FileUploadInput, { accept: ".gif, .jpg" })
    const input = queryByTestId("input") as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(queryByTestId("error")).toBeFalsy()
    })
  })


  it("validates an invalid file extension", async () => {
    const file = new File([new ArrayBuffer(1e6)], 'file.jpg', { type: "image/jpg" });

    const { queryByTestId } = render(FileUploadInput, { accept: ".bmp,.png" })
    const input = queryByTestId("input") as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(queryByTestId("error")).toBeTruthy()
    })
  })

  it("validates an invalid file type", async () => {
    const file = new File([new ArrayBuffer(1e6)], 'file.jpg', { type: "image/jpg" });
    const { queryByTestId } = render(FileUploadInput, { accept: "application/*" })
    const input = queryByTestId("input") as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(queryByTestId("error")).toBeTruthy()
    })
  })
});
