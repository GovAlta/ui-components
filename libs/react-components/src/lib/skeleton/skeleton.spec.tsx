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
      const baseElement = render(<GoASkeleton type={type as SkeletonType} />);

      expect(
        baseElement.container.querySelector(`goa-skeleton[type="${type}"]`)
      ).toBeTruthy();
    });
  }
});
