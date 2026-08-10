import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";

import GoAText from "./Text.svelte";

describe("GoAText", () => {
  it.each([
    ["primary", "--goa-color-text-default"],
    ["secondary", "--goa-color-text-secondary"],
    ["light", "--goa-color-text-light"],
    ["disabled", "--goa-color-text-disabled"],
  ] as const)("uses the %s color token", (color, token) => {
    const result = render(GoAText, { color });
    const element = result.container.firstElementChild;

    expect(element?.getAttribute("style")).toContain(`color: var(${token})`);
  });
});
