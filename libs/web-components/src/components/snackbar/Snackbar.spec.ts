import Snackbar from "./Snackbar.svelte";
import { render, waitFor } from "@testing-library/svelte";
import { it, expect } from "vitest";

it("renders with default props", async () => {
  const { container } = render(Snackbar);
  const snackbar = container.querySelector(".snackbar");

  expect(snackbar).toBeTruthy();
  expect(snackbar?.classList.contains("basic")).toBe(true);
  expect(snackbar?.classList.contains("bottom")).toBe(true);
  expect(snackbar?.classList.contains("left")).toBe(true);
  expect(snackbar?.classList.contains("show")).toBe(false);
});

it("renders with custom type", async () => {
  const { container } = render(Snackbar, { type: "success" });
  const snackbar = container.querySelector(".snackbar");
  const icon = container.querySelector("goa-icon");

  expect(snackbar?.classList.contains("success")).toBe(true);
  expect(icon?.getAttribute("type")).toBe("checkmark-circle");
});

it("renders with failure type", async () => {
  const { container } = render(Snackbar, { type: "failure" });
  const snackbar = container.querySelector(".snackbar");
  const icon = container.querySelector("goa-icon");

  expect(snackbar?.classList.contains("failure")).toBe(true);
  expect(icon?.getAttribute("type")).toBe("close-circle");
});

it("renders with custom vertical position", async () => {
  const { container } = render(Snackbar, { verticalPosition: "top" });
  const snackbar = container.querySelector(".snackbar");

  expect(snackbar?.classList.contains("top")).toBe(true);
});

it("renders with custom horizontal position", async () => {
  const { container } = render(Snackbar, { horizontalPosition: "center" });
  const snackbar = container.querySelector(".snackbar");

  expect(snackbar?.classList.contains("center")).toBe(true);
});

it("shows snackbar when visible is true", async () => {
  const { container } = render(Snackbar, { visible: true });
  const snackbar = container.querySelector(".snackbar");

  expect(snackbar?.classList.contains("show")).toBe(true);
});

it("hides snackbar after duration", async () => {
  const duration = 100; // Short duration for testing
  const { container } = render(Snackbar, { visible: true, duration });
  const snackbar = container.querySelector(".snackbar");

  expect(snackbar?.classList.contains("show")).toBe(true);

  await waitFor(
    () => {
      expect(snackbar?.classList.contains("show")).toBe(false);
    },
    { timeout: duration + 100 },
  );
});

it("renders with progress bar", async () => {
  const { container } = render(Snackbar, { progress: 50 });
  const progressBar = container.querySelector(".progress-bar");

  expect(progressBar).toBeTruthy();
  expect(progressBar?.getAttribute("style")).toContain("width: 50%");
});

it("renders with custom margins", async () => {
  const { container } = render(Snackbar, {
    mt: "m",
    mr: "l",
    mb: "m",
    ml: "l",
  });
  const snackbar = container.querySelector(".snackbar");

  expect(snackbar?.getAttribute("style")).toContain(
    "margin-top:var(--goa-space-m); margin-right:var(--goa-space-l); margin-bottom:var(--goa-space-m); margin-left:var(--goa-space-l);",
  );
});

it("renders with testid", async () => {
  const testid = "test-snackbar";
  const { container } = render(Snackbar, { testid });
  const snackbar = container.querySelector(".snackbar");

  expect(snackbar?.getAttribute("data-testid")).toBe(testid);
});
