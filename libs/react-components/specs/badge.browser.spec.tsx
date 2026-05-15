import { render } from "vitest-browser-react";
import { GoabBadge } from "../src";
import { expect, describe, it, vi } from "vitest";

describe("Badge V2 Emphasis", () => {
  it("should have an explicit box-shadow none rule on strong emphasis", async () => {
    const result = render(
      <GoabBadge testId="badge-strong" type="information" content="Strong" emphasis="strong" />,
    );

    const badge = result.getByTestId("badge-strong");

    await vi.waitFor(() => {
      const el = badge.element();
      expect(el).toBeTruthy();
      expect(el.classList.contains("v2")).toBe(true);
      expect(el.classList.contains("badge-strong")).toBe(true);

      // Verify the shadow DOM stylesheet has an explicit box-shadow: none rule for strong
      const root = el.getRootNode() as ShadowRoot;
      const sheet = root.adoptedStyleSheets?.[0] ?? root.querySelector("style")?.sheet;
      const rules = Array.from(sheet?.cssRules ?? []);
      const strongRule = rules.find(
        (r) => r instanceof CSSStyleRule && r.selectorText?.includes("badge-strong"),
      ) as CSSStyleRule | undefined;
      expect(strongRule).toBeTruthy();
      expect(strongRule!.style.boxShadow).toBe("none");
    });
  });

  it("should render subtle emphasis with correct classes and shadow rule", async () => {
    const result = render(
      <GoabBadge testId="badge-subtle" type="information" content="Subtle" emphasis="subtle" />,
    );

    const badge = result.getByTestId("badge-subtle");

    await vi.waitFor(() => {
      const el = badge.element();
      expect(el).toBeTruthy();
      expect(el.classList.contains("v2")).toBe(true);
      expect(el.classList.contains("badge-subtle")).toBe(true);
      expect(el.classList.contains("badge-information")).toBe(true);

      // Verify the shadow DOM stylesheet contains the box-shadow rule for subtle badges
      const root = el.getRootNode() as ShadowRoot;
      const sheet = root.adoptedStyleSheets?.[0] ?? root.querySelector("style")?.sheet;
      const rules = Array.from(sheet?.cssRules ?? []);
      const subtleRule = rules.find(
        (r) => r instanceof CSSStyleRule && r.selectorText?.includes("badge-subtle") && r.selectorText?.includes("badge-information"),
      ) as CSSStyleRule | undefined;
      expect(subtleRule).toBeTruthy();
      expect(subtleRule!.style.boxShadow).toContain("--goa-badge-info-subtle-border");
    });
  });
});
