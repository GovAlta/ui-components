import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/dom";
import ABGovButton, { ButtonSize, ButtonType } from "./button";
import { describe, it, expect, vi } from "vitest";

describe("ABGov Button", () => {
  const buttonText = "Test Title";

  const noop = () => { /* do nothing */ };

  it("should render the properties", () => {
    const { container } = render(
      <ABGovButton
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
      <ABGovButton onClick={() => { /* do nothing */ }}>{buttonText}</ABGovButton>
    );

    expect(baseElement).toBeTruthy();
    expect(screen.getByText(buttonText));
  });

  describe("size", () => {
    (["compact", "normal"] as const).forEach((size: ButtonSize) => {
      it(`should render ${size} size`, async () => {
        const { container } = render(
          <ABGovButton size={size} onClick={noop}>
            Button
          </ABGovButton>
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
            <ABGovButton type={type} onClick={noop}>
              Button
            </ABGovButton>
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
      <ABGovButton onClick={onClick}>Button</ABGovButton>
    );
    const button = container.querySelector("goa-button");
    expect(button).toBeTruthy();
    button && fireEvent(button, new CustomEvent("_click"));
    expect(onClick).toBeCalled();
  });
});
