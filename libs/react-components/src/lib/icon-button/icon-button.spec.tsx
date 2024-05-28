import { render } from "@testing-library/react";
import { GoABIconButton } from "./icon-button";
import { GoABIconButtonVariant } from "@abgov/ui-components-common";

describe("GoAB IconButton", () => {
  it("should render the properties", () => {
    const { container } = render(
      <GoABIconButton
        icon="information"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        ariaLabel="information button"
      />,
    );
    const el = container.querySelector("goa-icon-button");

    expect(el?.getAttribute("icon")).toBe("information");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
    expect(el?.getAttribute("arialabel")).toBe("information button");
  });

  describe("Variants", () => {
    (["color", "nocolor", "dark", "destructive"] as const).forEach(
      (variant: GoABIconButtonVariant) => {
        it(`should render ${variant} variant`, async () => {
          const { container } = render(
            <GoABIconButton variant={variant} icon="information" />,
          );

          const el = container.querySelector("goa-icon-button");
          expect(el).toBeTruthy();
          expect(el?.getAttribute("variant")).toEqual(variant);
        });
      },
    );
  });
});
