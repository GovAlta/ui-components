import { render, cleanup, waitFor } from "@testing-library/svelte";
import GoAButtonGroup from "./ButtonGroup.svelte";
import { it, describe } from "vitest";

afterEach(cleanup);

describe("GoA ButtonGroup", () => {
  ["start", "end", "center"].forEach(type => {
    it(`should render ButtonGroup with ${type} alignment`, async () => {
      const baseElement = render(GoAButtonGroup, { alignment: type });
      const buttonGroup = baseElement.container.querySelector("goa-button-group");

      waitFor(() => {
        expect(buttonGroup).toHaveAttribute("type", "warning");
      });
    });
  });

  it(`should default to start`, async () => {
    const baseElement = render(GoAButtonGroup, {});
    const buttonGroup = baseElement.container.querySelector("goa-button-group");

    waitFor(() => {
      expect(buttonGroup).toHaveAttribute("alignment", "start");
    });
  });

  it(`should not render ButtonGroup with invalid alignment`, async () => {
    const mock = vi.spyOn(console, "error").mockImplementation(() => {});
    render(GoAButtonGroup, { alignment: "staart" });
    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBeGreaterThan(0);
    });
    mock.mockRestore();
  });

  it(`should not render ButtonGroup with invalid gap`, async () => {
    const mock = vi.spyOn(console, "error").mockImplementation(() => {});
    render(GoAButtonGroup, { alignment: "start", gap: "relaaexd" });
    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBeGreaterThan(0);
    });
    mock.mockRestore();
  });

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoAButtonGroup, {
        testid: "buttongroup-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const buttongroup = await baseElement.findByTestId("buttongroup-test");

      expect(buttongroup).toBeTruthy();
      expect(buttongroup).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(buttongroup).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(buttongroup).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(buttongroup).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });
});
