import FileUploadCard from './FileUploadCard.svelte'
import { fireEvent, render } from '@testing-library/svelte'
import { getTimestamp } from '../../common/utils'
import { it, expect, vi } from "vitest";

it("renders", async () => {
  const { queryByTestId } = render(FileUploadCard, { filename: "some-file.png", size: 1e6 })

  expect(queryByTestId("filename")?.innerHTML).toContain("some-file.png")
  expect(queryByTestId("filesize")?.innerHTML).toContain(`${Math.ceil(1000 / 1.024)}KB`)
})

it("shows the uploading state", async () => {
  const { queryByTestId } = render(FileUploadCard, {
    filename: "some-file.png",
    size: 1e6,
    progress: 10,
  })

  const button = queryByTestId("actions")?.querySelector("goa-button");

  expect(queryByTestId("icon")?.getAttribute("type")).toBe("goa-file")
  expect(queryByTestId("progress")?.querySelector("progress")?.getAttribute("value")).toBe("10")
  expect(queryByTestId("progress")?.innerHTML).toContain("10%")
  expect(button?.innerHTML).toContain("Cancel");
})

it("handles uploading cancel", async () => {
  const { queryByTestId } = render(FileUploadCard, {
    filename: "some-file.png",
    size: 1e6,
    progress: 23,
  })
  const el = queryByTestId("root");
  const button = queryByTestId("actions")?.querySelector("goa-button");
  const fn = vi.fn()

  expect(el).toBeTruthy();
  expect(button).toBeTruthy();

  el && el.addEventListener("_cancel", fn)
  button && await fireEvent.click(button)
  expect(fn).toHaveBeenCalled();
})

it("shows the uploaded state", async () => {
  const { queryByTestId } = render(FileUploadCard, {
    filename: "some-file.png",
    type: "image/png",
    size: 1e6,
    progress: 100,
  })

  const button = queryByTestId("actions")?.querySelector("goa-button");

  expect(queryByTestId("icon")?.getAttribute("type")).toBe("goa-image")
  expect(queryByTestId("progress")).toBeFalsy()
  expect(queryByTestId("timestamp")?.innerHTML).toContain(getTimestamp())
  expect(button?.innerHTML).toContain("Remove");
})

it("handles uploaded delete", async () => {
  const { queryByTestId } = render(FileUploadCard, {
    filename: "some-file.png",
    size: 1e6,
    progress: 100,
  })
  const el = queryByTestId("root");
  const button = queryByTestId("actions")?.querySelector("goa-button");
  const fn = vi.fn()

  el && el.addEventListener("_delete", fn)
  button && await fireEvent.click(button)
  expect(fn).toHaveBeenCalled();
})

it("shows an error status", async () => {
  const { queryByTestId } = render(FileUploadCard, {
    filename: "some-file.png",
    size: 1e6,
    error: "Failed",
  });
  const button = queryByTestId("actions")?.querySelector("goa-button");

  // error message
  expect(queryByTestId("error")?.innerHTML).toContain("Failed");
  expect(button?.innerHTML).toContain("Cancel");
  expect(button?.getAttribute("variant")).toBe("destructive");
})

it("handles error button click", async () => {
  const { queryByTestId } = render(FileUploadCard, {
    filename: "some-file.png",
    size: 1e6,
    error: "Failed",
  })
  const el = queryByTestId("root");
  const button = queryByTestId("actions")?.querySelector("goa-button");
  const fn = vi.fn()

  expect(el).toBeTruthy();
  expect(button).toBeTruthy();

  el && el.addEventListener("_delete", fn)
  button && await fireEvent.click(button)
  expect(fn).toHaveBeenCalled();
})
