import Block from "./Block.svelte";
import { render } from "@testing-library/svelte";

it("it renders", async () => {
  const { container } = render(Block, {
    mt: "s",
    mr: "m",
    mb: "l",
    ml: "xl",
  });

  const el = container.querySelector(".block");

  expect(el.getAttribute("style")).toContain("margin-top:var(--goa-spacing-s)");
  expect(el.getAttribute("style")).toContain("margin-right:var(--goa-spacing-m)");
  expect(el.getAttribute("style")).toContain("margin-bottom:var(--goa-spacing-l)");
  expect(el.getAttribute("style")).toContain("margin-left:var(--goa-spacing-xl)");
});
