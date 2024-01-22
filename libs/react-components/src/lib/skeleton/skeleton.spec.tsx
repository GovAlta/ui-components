import { render } from "@testing-library/react";
import { GoASkeleton, SkeletonType } from "./skeleton";

describe("Skeleton", () => {
  for (const type of [
    "image",
    "text",
    "title",
    "text-small",
    "avatar",
    "header",
    "paragraph",
    "thumbnail",
    "card",
    "profile",
  ]) {
    it(`should render the ${type} type`, async () => {
      const { container } = render(
        <GoASkeleton type={type as SkeletonType} mt="s" mr="m" mb="l" ml="xl" />
      );

      expect(
        container.querySelector(`goa-skeleton[type="${type}"]`)
      ).toBeTruthy();

      const el = container.querySelector("goa-skeleton");
      expect(el?.getAttribute("mt")).toBe("s");
      expect(el?.getAttribute("mr")).toBe("m");
      expect(el?.getAttribute("mb")).toBe("l");
      expect(el?.getAttribute("ml")).toBe("xl");
    });
  }
});
