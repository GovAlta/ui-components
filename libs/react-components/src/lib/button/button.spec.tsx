import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/dom";
import GoabButton from "./button";
import { describe, it, expect, vi } from "vitest";
import { GoabButtonSize, GoabButtonType } from "@abgov/ui-components-common";

describe("GoabButton", () => {
  const buttonText = "Test Title";

  const noop = () => {
    /* do nothing */
  };

  it("should render", () => {
    const { container } = render(<GoabButton></GoabButton>);

    const el = container.querySelector("goa-button");
    expect(el?.getAttribute("disabled")).toBeNull();
  });

  it("should render the properties", () => {
    const { container } = render(
      <GoabButton
        disabled
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
      <GoabButton
        onClick={() => {
          /* do nothing */
        }}
      >
        {buttonText}
      </GoabButton>,
    );

    expect(baseElement).toBeTruthy();
    expect(screen.getByText(buttonText));
  });

  describe("size", () => {
    (["compact", "normal"] as const).forEach((size: GoabButtonSize) => {
      it(`should render ${size} size`, async () => {
        const { container } = render(
          <GoabButton size={size} onClick={noop}>
            Button
          </GoabButton>,
        );

        const button = container.querySelector("goa-button");
        expect(button).toBeTruthy();
        expect(button?.getAttribute("size")).toEqual(size);
      });
    });
  });

  describe("type", () => {
    (["primary", "submit", "secondary", "tertiary"] as const).forEach(
      (type: GoabButtonType) => {
        it(`should render ${type} type`, async () => {
          const { container } = render(
            <GoabButton type={type} onClick={noop}>
              Button
            </GoabButton>,
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
    const { container } = render(<GoabButton onClick={onClick}>Button</GoabButton>);
    const button = container.querySelector("goa-button");
    expect(button).toBeTruthy();
    button && fireEvent(button, new CustomEvent("_click"));
    expect(onClick).toBeCalled();
  });
});

describe("GoabButton disabled attribute", () => {
  it("should set disabled attribute correctly when disabled=true", () => {
    const { container } = render(
      <GoabButton disabled={true}>Disabled Button</GoabButton>
    );
    const el = container.querySelector("goa-button");

    expect(el?.getAttribute("disabled")).toBe("true");
  });

  it("should not include disabled attribute when disabled=false", () => {
    const { container } = render(
      <GoabButton disabled={false}>Enabled Button</GoabButton>
    );
    const el = container.querySelector("goa-button");

    // disabled attribute should not be present
    expect(el?.hasAttribute("disabled")).toBe(false);
  });

  it("should handle toggle between disabled states", () => {
    // First render with disabled=true
    const { container, rerender } = render(
      <GoabButton disabled={true}>Toggle Button</GoabButton>
    );
    let el = container.querySelector("goa-button");
    expect(el?.getAttribute("disabled")).toBe("true");

    // Rerender with disabled=false
    rerender(<GoabButton disabled={false}>Toggle Button</GoabButton>);
    el = container.querySelector("goa-button");
    expect(el?.hasAttribute("disabled")).toBe(false);

    // Rerender with disabled=true again
    rerender(<GoabButton disabled={true}>Toggle Button</GoabButton>);
    el = container.querySelector("goa-button");
    expect(el?.getAttribute("disabled")).toBe("true");
  });
});
