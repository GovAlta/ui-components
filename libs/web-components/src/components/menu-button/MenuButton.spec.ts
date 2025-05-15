import { render } from "@testing-library/svelte";
import GoAMenuButton from "./MenuButton.svelte";

describe("GoAMenuButton", () => {
  it("should render", async () => {
    const { container } = render(GoAMenuButton, { text: "Menu Button" });

    expect(container.innerHTML).toContain("goa-popover");
    expect(container.innerHTML).toContain("goa-button");
    expect(container.innerHTML).toContain("Menu Button");
  });

  it("should render with testid", async () => {
    const { container } = render(GoAMenuButton, {
      text: "Menu Button",
      testid: "menu-button-test"
    });

    expect(container.innerHTML).toContain('data-testid="menu-button-test"');
  });

  describe("button types", () => {
    ["primary", "secondary", "tertiary"].forEach((type) => {
      it(`should render ${type} type`, async () => {
        const { container } = render(GoAMenuButton, {
          text: "Menu Button",
          type: type as "primary" | "secondary" | "tertiary"
        });

        expect(container.innerHTML).toContain(`type="${type}"`);
      });
    });
  });

  describe("popover integration", () => {
    it("should render popover with correct configuration", async () => {
      const { container } = render(GoAMenuButton, { text: "Menu Button" });

      expect(container.innerHTML).toContain('padded="false"');
      expect(container.innerHTML).toContain('tabindex="-1"');
    });

    it("should render goa-block with correct props", async () => {
      const { container } = render(GoAMenuButton, { text: "Menu Button" });

      expect(container.innerHTML).toContain('direction="column"');
      expect(container.innerHTML).toContain('gap="none"');
    });
  });

  describe("icon states", () => {
    it("should show chevron-down icon initially", async () => {
      const { container } = render(GoAMenuButton, { text: "Menu Button" });

      expect(container.innerHTML).toContain('trailingicon="chevron-down"');
    });
  });

  describe("component structure", () => {
    it("should have proper DOM structure", async () => {
      const { container } = render(GoAMenuButton, { text: "Menu Button" });

      // Check that all required elements are present
      expect(container.innerHTML).toContain("goa-popover");
      expect(container.innerHTML).toContain("goa-button");
      expect(container.innerHTML).toContain("goa-block");
      expect(container.innerHTML).toContain('slot="target"');
    });

    it("should render menu content area", async () => {
      const { container } = render(GoAMenuButton, { text: "Menu Button" });

      // Check that the component structure is correct for menu items
      expect(container.innerHTML).toContain("goa-block");
    });
  });

  describe("accessibility", () => {
    it("should have proper tabindex on popover", async () => {
      const { container } = render(GoAMenuButton, { text: "Menu Button" });

      expect(container.innerHTML).toContain('tabindex="-1"');
    });

    it("should render button with proper slot", async () => {
      const { container } = render(GoAMenuButton, { text: "Menu Button" });

      expect(container.innerHTML).toContain('slot="target"');
    });
  });
});
