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

  it("should create zero margins when set to none", () => {
    const val = calculateMargin("none", "none", "none", "none");

    expect(val).toContain("margin-top:var(--goa-space-none);");
    expect(val).toContain("margin-right:var(--goa-space-none);");
    expect(val).toContain("margin-bottom:var(--goa-space-none);");
    expect(val).toContain("margin-left:var(--goa-space-none);");
  });

  it("should convert numeric spacing aliases", () => {
    const val = calculateMargin("1", "2", "3", "0");

    expect(val).toContain("margin-top:var(--goa-space-3xs);");
    expect(val).toContain("margin-right:var(--goa-space-2xs);");
    expect(val).toContain("margin-bottom:var(--goa-space-xs);");
    expect(val).toContain("margin-left:var(--goa-space-none);");
  });
});
