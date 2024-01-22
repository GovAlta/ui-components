import { render } from "@testing-library/react";
import { GoAIconButton, IconButtonVariant } from "./icon-button";

describe("GoA IconButton", () => {
  it("should render the properties", () => {
    const { container } = render(
      <GoAIconButton icon="information" mt="s" mr="m" mb="l" ml="xl" />
    );
    const el = container.querySelector("goa-icon-button");

    expect(el?.getAttribute("icon")).toBe("information");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });

  describe("Variants", () => {
    (["color", "nocolor", "dark", "destructive"] as const).forEach(
      (variant: IconButtonVariant) => {
        it(`should render ${variant} variant`, async () => {
          const { container } = render(
            <GoAIconButton variant={variant} icon="information" />
          );

          const el = container.querySelector("goa-icon-button");
          expect(el).toBeTruthy();
          expect(el?.getAttribute("variant")).toEqual(variant);
        });
      }
    );
  });
});
