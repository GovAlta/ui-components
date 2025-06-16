import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { GoabPublicSubform } from "./public-subform";

describe("GoabPublicSubform", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders with all properties", () => {
    const { baseElement } = render(
      <GoabPublicSubform
        id="test-subform"
        name="test-subform-name"
        continueMsg="Continue to next step"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
      >
        <div data-testid="test-content">Test content</div>
      </GoabPublicSubform>
    );

    const el = baseElement.querySelector("goa-public-subform");
    expect(el?.getAttribute("id")).toBe("test-subform");
    expect(el?.getAttribute("name")).toBe("test-subform-name");
    expect(el?.getAttribute("continue-msg")).toBe("Continue to next step");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");

    // Content is rendered
    expect(baseElement.querySelector("[data-testid='test-content']")).toBeTruthy();
  });

  it("renders with default values", () => {
    const { baseElement } = render(
      <GoabPublicSubform>
        <div>Test content</div>
      </GoabPublicSubform>
    );

    const el = baseElement.querySelector("goa-public-subform");
    expect(el?.getAttribute("id")).toBe("");
    expect(el?.getAttribute("name")).toBe("");
    expect(el?.getAttribute("continue-msg")).toBe("");
  });

  it("renders without margin attributes when undefined", () => {
    const { baseElement } = render(
      <GoabPublicSubform>
        <div>Test content</div>
      </GoabPublicSubform>
    );

    const el = baseElement.querySelector("goa-public-subform");
    expect(el?.hasAttribute("mt")).toBe(false);
    expect(el?.hasAttribute("mr")).toBe(false);
    expect(el?.hasAttribute("mb")).toBe(false);
    expect(el?.hasAttribute("ml")).toBe(false);
  });

  it("renders complex children content", () => {
    const { baseElement } = render(
      <GoabPublicSubform id="complex-subform">
        <div data-testid="subform-index">
          <h2>Dependents List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>10</td>
                <td>
                  <button data-testid="edit-btn">Edit</button>
                  <button data-testid="remove-btn">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div data-testid="form-page">
          <h3>Add New Dependent</h3>
          <input data-testid="name-input" placeholder="Full name" />
          <input data-testid="age-input" placeholder="Age" />
          <button data-testid="save-btn">Save</button>
        </div>
      </GoabPublicSubform>
    );

    expect(baseElement.querySelector("[data-testid='subform-index']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='form-page']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='edit-btn']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='remove-btn']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='name-input']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='save-btn']")).toBeTruthy();
  });

  it("handles empty string properties", () => {
    const { baseElement } = render(
      <GoabPublicSubform
        id=""
        name=""
        continueMsg=""
      >
        <div>Test content</div>
      </GoabPublicSubform>
    );

    const el = baseElement.querySelector("goa-public-subform");
    expect(el?.getAttribute("id")).toBe("");
    expect(el?.getAttribute("name")).toBe("");
    expect(el?.getAttribute("continue-msg")).toBe("");
  });

  it("renders with all margin values", () => {
    const marginValues = ["none", "3xs", "2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl"];

    marginValues.forEach(margin => {
      const { baseElement } = render(
        <GoabPublicSubform
          mt={margin as any}
          mr={margin as any}
          mb={margin as any}
          ml={margin as any}
        >
          <div>Test content</div>
        </GoabPublicSubform>
      );

      const el = baseElement.querySelector("goa-public-subform");
      expect(el?.getAttribute("mt")).toBe(margin);
      expect(el?.getAttribute("mr")).toBe(margin);
      expect(el?.getAttribute("mb")).toBe(margin);
      expect(el?.getAttribute("ml")).toBe(margin);

      cleanup();
    });
  });

  it("handles special characters in text properties", () => {
    const specialTexts = {
      id: "subform-id-123",
      name: "form & subform",
      continueMsg: "Continue > Next Step",
    };

    const { baseElement } = render(
      <GoabPublicSubform
        id={specialTexts.id}
        name={specialTexts.name}
        continueMsg={specialTexts.continueMsg}
      >
        <div>Test content</div>
      </GoabPublicSubform>
    );

    const el = baseElement.querySelector("goa-public-subform");
    expect(el?.getAttribute("id")).toBe(specialTexts.id);
    expect(el?.getAttribute("name")).toBe(specialTexts.name);
    expect(el?.getAttribute("continue-msg")).toBe(specialTexts.continueMsg);
  });

  it("handles camelCase to kebab-case conversion correctly", () => {
    const { baseElement } = render(
      <GoabPublicSubform continueMsg="Test message">
        <div>Test content</div>
      </GoabPublicSubform>
    );

    const el = baseElement.querySelector("goa-public-subform");
    expect(el?.getAttribute("continue-msg")).toBe("Test message");
    expect(el?.hasAttribute("continueMsg")).toBe(false);
  });

  it("renders nested subform components correctly", () => {
    const { baseElement } = render(
      <GoabPublicSubform name="parent-subform">
        <div data-testid="subform-index" slot="subform-index">
          <h2>List View</h2>
          <div data-testid="item-list">
            <div>Item 1</div>
            <div>Item 2</div>
          </div>
        </div>
        <div data-testid="form-pages">
          <div data-testid="page-1">
            <h3>Page 1</h3>
            <input type="text" />
          </div>
          <div data-testid="page-2">
            <h3>Page 2</h3>
            <textarea></textarea>
          </div>
        </div>
      </GoabPublicSubform>
    );

    expect(baseElement.querySelector("[data-testid='subform-index']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='form-pages']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='item-list']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='page-1']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='page-2']")).toBeTruthy();
    expect(baseElement.querySelectorAll("input")).toHaveLength(1);
    expect(baseElement.querySelectorAll("textarea")).toHaveLength(1);
  });
});
