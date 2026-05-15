import Spacer from "./Spacer.svelte";
import { render } from "@testing-library/svelte";
import { it } from "vitest";

it("it renders the default", async () => {
  const { container } = render(Spacer, {});
  const style = container.querySelector("div");
  expect(style?.innerHTML).toContain("width: var(--goa-space-none)");
  expect(style?.innerHTML).toContain("height: var(--goa-space-none)");
});

it("it renders the set width", async () => {
  const { container } = render(Spacer, { hspacing: "m" });
  const style = container.querySelector("div");
  expect(style?.innerHTML).toContain("width: var(--goa-space-m)");
});

it("it renders the full width", async () => {
  const { container } = render(Spacer, { hspacing: "fill" });
  const style = container.querySelector("div");
  expect(style?.innerHTML).toContain("width: 100%");
});

it("it renders vertical spacing", async () => {
  const { container } = render(Spacer, { vspacing: "xl" });
  const style = container.querySelector("div");
  expect(style?.innerHTML).toContain("height: var(--goa-space-xl)");
});
