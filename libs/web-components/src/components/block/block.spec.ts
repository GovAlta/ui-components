import Block from "./Block.svelte";
import { render } from "@testing-library/svelte";
import { it } from "vitest";

it("it renders", async () => {
  const { container } = render(Block, {
    mt: "s",
    mr: "m",
    mb: "l",
    ml: "xl",
  });

  const el = container.querySelector(".block");
  expect(el).toBeTruthy();

  expect(el?.getAttribute("style")).toContain("margin-top:var(--goa-space-s)");
  expect(el?.getAttribute("style")).toContain("margin-right:var(--goa-space-m)");
  expect(el?.getAttribute("style")).toContain("margin-bottom:var(--goa-space-l)");
  expect(el?.getAttribute("style")).toContain("margin-left:var(--goa-space-xl)");
});
