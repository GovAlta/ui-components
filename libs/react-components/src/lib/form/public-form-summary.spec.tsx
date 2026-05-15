import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GoabPublicFormSummary } from "./public-form-summary";

describe("GoabPublicFormSummary", () => {
  it("renders with default properties", () => {
    const { baseElement } = render(
      <GoabPublicFormSummary />
    );

    const el = baseElement.querySelector("goa-public-form-summary");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("heading")).toBe("");
  });

  it("renders with custom heading", () => {
    const heading = "Test Heading";
    const { baseElement } = render(
      <GoabPublicFormSummary heading={heading} />
    );

    const el = baseElement.querySelector("goa-public-form-summary");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("heading")).toBe(heading);
  });

  it("should pass data-grid attributes", () => {
    const { baseElement } = render(
      <GoabPublicFormSummary
        heading="Test Summary"
        data-grid="cell"
      />
    );
    const el = baseElement.querySelector("goa-public-form-summary");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
