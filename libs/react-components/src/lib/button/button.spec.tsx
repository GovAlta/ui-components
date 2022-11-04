import React from "react";
import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/dom";
import GoAButton, { ButtonSize, ButtonType } from "./button";

describe("GoA Button", () => {
  const buttonText = "Test Title";

  const noop = () => {};

  it("should render content", () => {
    const { baseElement } = render(
      <GoAButton onClick={() => {}}>{buttonText}</GoAButton>
    );

    expect(baseElement).toBeTruthy();
    expect(screen.getByText(buttonText));
  });

  describe("size", () => {
    ["compact", "normal"].forEach((size: ButtonSize) => {
      it(`should render ${size} size`, async () => {
        const { container } = render(
          <GoAButton size={size} onClick={noop}>
            Button
          </GoAButton>
        );

        const button = container.querySelector("goa-button");
        expect(button).toBeTruthy();
        expect(button.getAttribute("size")).toEqual(size);
      });
    });
  });

  describe("type", () => {
    ["primary", "submit", "secondary", "tertiary"].forEach(
      (type: ButtonType) => {
        it(`should render ${type} type`, async () => {
          const { container } = render(
            <GoAButton type={type} onClick={noop}>
              Button
            </GoAButton>
          );
          const button = container.querySelector("goa-button");

          expect(button).toBeTruthy();
          expect(button.getAttribute("type")).toEqual(type);
        });
      }
    );
  });

  it("responds to events", async () => {
    const onClick = jest.fn();
    const { container } = render(
      <GoAButton onClick={onClick}>Button</GoAButton>
    );
    const button = container.querySelector("goa-button");

    fireEvent(button, new CustomEvent("_click"));
    expect(onClick).toBeCalled();
  });
});
