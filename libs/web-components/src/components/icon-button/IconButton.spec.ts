import { render } from '@testing-library/svelte';
import GoAIconButton from './IconButton.svelte'
import { it, describe } from "vitest";

describe("IconButton", () => {
  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoAIconButton, {
        testid: "iconButton-test",
        icon: "ellipsis",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        arialabel: "icon button test"
      });
      const iconButton = await baseElement.findByTestId("iconButton-test");

      expect(iconButton).toBeTruthy();
      expect(iconButton).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(iconButton).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(iconButton).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(iconButton).toHaveStyle("margin-left:var(--goa-space-xl)");
      expect(iconButton).toHaveAttribute("aria-label", "icon button test");
    });
  });

  describe("Variants", () => {
    ["color", "nocolor", "light", "dark", "destructive"].forEach(variant => {
      it(`renders the ${variant} variant`, async () => {
        const el = render(GoAIconButton, {
          testid: "iconButton-test", icon: "ellipsis",
          variant: variant,
        });
        const iconButton = await el.findByTestId("iconButton-test");

        expect(iconButton).toBeTruthy();
        expect(iconButton.className).toContain(`${variant}`);
      });
    });
  });
})
