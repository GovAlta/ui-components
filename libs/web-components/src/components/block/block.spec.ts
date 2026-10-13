import Block from "./Block.svelte";
import { render } from "@testing-library/svelte";
import { it } from "vitest";

it("it renders", async () => {
  const { getByTestId } = render(Block, {
    testid: "block",
    mt: "s",
    mr: "m",
    mb: "l",
    ml: "xl",
  });

  const el = getByTestId("block");

  expect(el.style.marginTop).toBe("var(--goa-space-s)");
  expect(el.style.marginRight).toBe("var(--goa-space-m)");
  expect(el.style.marginBottom).toBe("var(--goa-space-l)");
  expect(el.style.marginLeft).toBe("var(--goa-space-xl)");
});

it("applies the stretch class when stretch is true", async () => {
  const { queryByTestId } = render(Block, {
    testid: "block",
    stretch: "true",
  });

  const el = queryByTestId("block");
  expect(el?.classList.contains("stretch")).toBe(true);
});

it("does not apply the stretch class by default", async () => {
  const { queryByTestId } = render(Block, {
    testid: "block",
  });

  const el = queryByTestId("block");
  expect(el?.classList.contains("stretch")).toBe(false);
});
