import { render, cleanup } from '@testing-library/svelte';
import GoASkeleton from './Skeleton.svelte';
import { it, describe } from "vitest";

afterEach(cleanup);

describe('GoARadioGroup Component', () => {
  for (const type of ["image", "text", "title", "text-small", "avatar", "header", "paragraph", "thumbnail", "card", "profile"]) {
    it(`should render the ${type} type`, async () => {
      const baseElement = render(GoASkeleton, { type });

      expect(baseElement.container.querySelector('.skeleton')).toBeTruthy()
    });
  }

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoASkeleton, {
        testid: "skeleton-test",
        type: "text",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const skeleton = await baseElement.findByTestId("skeleton-test");

      expect(skeleton).toBeTruthy();
      expect(skeleton).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(skeleton).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(skeleton).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(skeleton).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });
});
