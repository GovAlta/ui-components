import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/dom";
import GoAButton, { ButtonSize, ButtonType } from "./button";
import { describe, it, expect, vi } from "vitest";

describe("GoA Button", () => {
  const buttonText = "Test Title";

  const noop = () => {};

  it("should render the properties", () => {
    const { container } = render(
      <GoAButton
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
      />
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
      <GoAButton onClick={() => {}}>{buttonText}</GoAButton>
    );

    expect(baseElement).toBeTruthy();
    expect(screen.getByText(buttonText));
  });

  describe("size", () => {
    (["compact", "normal"] as const).forEach((size: ButtonSize) => {
      it(`should render ${size} size`, async () => {
        const { container } = render(
          <GoAButton size={size} onClick={noop}>
            Button
          </GoAButton>
        );

        const button = container.querySelector("goa-button");
        expect(button).toBeTruthy();
        expect(button?.getAttribute("size")).toEqual(size);
      });
    });
  });

  describe("type", () => {
    (["primary", "submit", "secondary", "tertiary"] as const).forEach(
      (type: ButtonType) => {
        it(`should render ${type} type`, async () => {
          const { container } = render(
            <GoAButton type={type} onClick={noop}>
              Button
            </GoAButton>
          );
          const button = container.querySelector("goa-button");

          expect(button).toBeTruthy();
          expect(button?.getAttribute("type")).toEqual(type);
        });
      }
    );
  });

  it("responds to events", async () => {
    const onClick = vi.fn();
    const { container } = render(
      <GoAButton onClick={onClick}>Button</GoAButton>
    );
    const button = container.querySelector("goa-button");
    expect(button).toBeTruthy();
    button && fireEvent(button, new CustomEvent("_click"));
    expect(onClick).toBeCalled();
  });
});
