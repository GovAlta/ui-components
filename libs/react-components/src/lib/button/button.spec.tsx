import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/dom";
import GoABButton from "./button";
import { describe, it, expect, vi } from "vitest";
import { GoABButtonSize, GoABButtonType } from "@abgov/ui-components-common";

describe("GoAB Button", () => {
  const buttonText = "Test Title";

  const noop = () => {
    /* do nothing */
  };

  it("should render the properties", () => {
    const { container } = render(
      <GoABButton
        disabled={true}
        type="primary"
        size="compact"
        variant="destructive"
        leadingIcon="car"
        trailingIcon="bag"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
      />,
    );
    const el = container.querySelector("goa-button");

    expect(el?.getAttribute("disabled")).toBe("true");
    expect(el?.getAttribute("type")).toBe("primary");
    expect(el?.getAttribute("size")).toBe("compact");
    expect(el?.getAttribute("variant")).toBe("destructive");
    expect(el?.getAttribute("leadingicon")).toBe("car");
    expect(el?.getAttribute("trailingicon")).toBe("bag");

    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });

  it("should render content", () => {
    const { baseElement } = render(
      <GoABButton
        onClick={() => {
          /* do nothing */
        }}
      >
        {buttonText}
      </GoABButton>,
    );

    expect(baseElement).toBeTruthy();
    expect(screen.getByText(buttonText));
  });

  describe("size", () => {
    (["compact", "normal"] as const).forEach((size: GoABButtonSize) => {
      it(`should render ${size} size`, async () => {
        const { container } = render(
          <GoABButton size={size} onClick={noop}>
            Button
          </GoABButton>,
        );

        const button = container.querySelector("goa-button");
        expect(button).toBeTruthy();
        expect(button?.getAttribute("size")).toEqual(size);
      });
    });
  });

  describe("type", () => {
    (["primary", "submit", "secondary", "tertiary"] as const).forEach(
      (type: GoABButtonType) => {
        it(`should render ${type} type`, async () => {
          const { container } = render(
            <GoABButton type={type} onClick={noop}>
              Button
            </GoABButton>,
          );
          const button = container.querySelector("goa-button");

          expect(button).toBeTruthy();
          expect(button?.getAttribute("type")).toEqual(type);
        });
      },
    );
  });

  it("responds to events", async () => {
    const onClick = vi.fn();
    const { container } = render(<GoABButton onClick={onClick}>Button</GoABButton>);
    const button = container.querySelector("goa-button");
    expect(button).toBeTruthy();
    button && fireEvent(button, new CustomEvent("_click"));
    expect(onClick).toBeCalled();
  });
});
