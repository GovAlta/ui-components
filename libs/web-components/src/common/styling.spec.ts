import { it, describe } from "vitest";

import { calculateMargin } from "./styling";

describe("Styling", () => {
  it("should create margins", () => {
    const val = calculateMargin("s", "m", "l", "xl");

    expect(val).toContain("margin-top:var(--goa-space-s);");
    expect(val).toContain("margin-right:var(--goa-space-m);");
    expect(val).toContain("margin-bottom:var(--goa-space-l);");
    expect(val).toContain("margin-left:var(--goa-space-xl);");
  });

  it("should create one margin", () => {
    const val = calculateMargin("s", null, null, null);

    expect(val).toContain("margin-top:var(--goa-space-s);");
    expect(val).not.toContain("margin-right");
    expect(val).not.toContain("margin-bottom");
    expect(val).not.toContain("margin-left");
  });

  it("should not create margins if not set", () => {
    const val = calculateMargin(null, null, null, null);

    expect(val).not.toContain("margin-top");
    expect(val).not.toContain("margin-right");
    expect(val).not.toContain("margin-bottom");
    expect(val).not.toContain("margin-left");
  });
});
