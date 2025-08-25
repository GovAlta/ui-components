import { render } from "@testing-library/react";
import { GoabIconButton } from "./icon-button";
import { GoabIconButtonVariant } from "@abgov/ui-components-common";

describe("GoabIconButton", () => {
  it("should render", () => {
    const { container } = render(<GoabIconButton icon="information" />);
    const el = container.querySelector("goa-icon-button");

    expect(el?.getAttribute("icon")).toBe("information");
    expect(el?.getAttribute("disabled")).toBeNull();
  });

  it("should render the properties", () => {
    const { container } = render(
      <GoabIconButton
        icon="information"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        ariaLabel="information button"
        disabled
      />,
    );
    const el = container.querySelector("goa-icon-button");

    expect(el?.getAttribute("icon")).toBe("information");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
    expect(el?.getAttribute("arialabel")).toBe("information button");
    expect(el?.getAttribute("disabled")).toBe("true");
  });

  describe("Variants", () => {
    (["color", "nocolor", "dark", "destructive"] as const).forEach(
      (variant: GoabIconButtonVariant) => {
        it(`should render ${variant} variant`, async () => {
          const { container } = render(
            <GoabIconButton variant={variant} icon="information" />,
          );

          const el = container.querySelector("goa-icon-button");
          expect(el).toBeTruthy();
          expect(el?.getAttribute("variant")).toEqual(variant);
        });
      },
    );
  });

  it("should pass data-grid attributes", () => {
    const { container } = render(
      <GoabIconButton
        icon="information"
        data-grid="cell"
      />
    );
    const el = container.querySelector("goa-icon-button");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
