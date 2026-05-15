import { render, waitFor } from "@testing-library/svelte";
import GoACard from "./Card.svelte";
import { it, describe, expect } from "vitest";

describe("GoACardComponent", () => {
  it("should render", async () => {
    const baseElement = render(GoACard, {
      testid: "card-test",
      width: "500px",
    });
    const card = await baseElement.findByTestId("card-test");
    expect(card).toBeTruthy();
  });

  it("should render with elevation", async () => {
    const baseElement = render(GoACard, {
      testid: "card-test",
      elevation: 1,
    });
    const card = await baseElement.findByTestId("card-test");
    expect(card).toBeTruthy();

    await waitFor(() => {
      expect(card.style.getPropertyValue("box-shadow")).toContain("var(--shadow-1)");
    });
  });

  it("should render with width", async () => {
    const baseElement = render(GoACard, {
      testid: "card-test",
      width: "500px",
    });
    const card = await baseElement.findByTestId("card-test");
    expect(card).toBeTruthy();

    await waitFor(() => {
      expect(card.style.getPropertyValue("--width")).toContain("500px");
    });
  });

  it("should render - success with border", async () => {
    const baseElement = render(GoACard, {
      testid: "card-test",
      width: "500px",
      elevation: "0",
    });
    const card = await baseElement.findByTestId("card-test");

    expect(card).toBeTruthy();
    expect(card).toHaveStyle("border:");
  });

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoACard, {
        testid: "card-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const card = await baseElement.findByTestId("card-test");

      expect(card).toBeTruthy();
      expect(card).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(card).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(card).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(card).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });
});
