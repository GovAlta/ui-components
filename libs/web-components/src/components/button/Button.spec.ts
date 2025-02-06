import { render, fireEvent, waitFor } from "@testing-library/svelte";
import GoAButton from "./Button.svelte";
import { it, describe, vi } from "vitest";

describe("GoAButtonComponent", () => {
  it("should render", async () => {
    const baseElement = render(GoAButton);
    const button = await baseElement.findByRole("button");

    expect(button).toBeTruthy();
  });

  describe("events", () => {
    it("should handle the click event", async () => {
      const onClick = vi.fn();
      const results = render(GoAButton, { testid: "button-test" });
      const button = await results.findByTestId("button-test");

      button.addEventListener("_click", onClick);
      expect(button).not.toBeNull();

      await fireEvent.click(button);
      expect(onClick).toBeCalled();
    });
  });

  describe("size", () => {
    ["compact", "normal"].forEach((size) => {
      it(`should render ${size} size`, async () => {
        const { findByRole } = render(GoAButton, { size });
        const button = await findByRole("button");

        expect(button).toBeTruthy();
        expect(button.className).toContain(size);

        if (size === "compact") {
          expect(button).toHaveStyle(
            "height: var(--goa-button-height-compact)",
          );
        } else if (size === "normal") {
          expect(button).toHaveStyle("height: var(--goa-button-height)");
        }
      });
    });

    it("should not allow for invalid size", async () => {
      const mock = vi.spyOn(console, "error").mockImplementation(() => {
        /* do nothing */
      });
      render(GoAButton, { size: "huuuuuuge" });
      await waitFor(() => {
        expect(console.error["mock"].calls.length).toBeGreaterThan(0);
      });
      mock.mockRestore();
    });
  });

  describe("type", () => {
    ["primary", "submit", "secondary", "tertiary", "start"].forEach((type) => {
      it(`should render ${type} type`, async () => {
        const baseElement = render(GoAButton, { type });
        const button = await baseElement.findByRole("button");

        expect(button).toBeTruthy();
        expect(button.className).toContain(type);
      });
    });
  });

  describe("variant", () => {
    ["normal", "destructive"].forEach((variant) => {
      it(`should render ${variant} variant`, async () => {
        const baseElement = render(GoAButton, { variant });
        const button = await baseElement.findByRole("button");

        expect(button).toBeTruthy();
        expect(button.className).toContain(variant);
      });
    });
  });

  describe("Invalid attrs", () => {
    let consoleMock: vi.SpyInstance;
    beforeEach(() => {
      consoleMock = vi.spyOn(console, "error").mockImplementation(() => {
        /* do nothing */
      });
      expect(console.error["mock"].calls.length).toBe(0);
    });
    afterEach(() => consoleMock.mockRestore());

    it("invalid type", async () => {
      render(GoAButton, { type: "foobar" });
      await waitFor(() => {
        expect(console.error["mock"].calls.length).toBeGreaterThan(0);
      });
    });

    it("invalid size", async () => {
      render(GoAButton, { size: "verybig" });
      await waitFor(() => {
        expect(console.error["mock"].calls.length).toBeGreaterThan(0);
      });
    });
    it("invalid variant", async () => {
      render(GoAButton, { variant: "sweet" });
      await waitFor(() => {
        expect(console.error["mock"].calls.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoAButton, {
        testid: "button-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const button = await baseElement.findByTestId("button-test");

      expect(button).toBeTruthy();
      expect(button).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(button).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(button).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(button).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });
});
