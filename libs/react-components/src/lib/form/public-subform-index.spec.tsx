import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GoabPublicSubformIndex } from "./public-subform-index";

describe("GoabPublicSubformIndex", () => {
  it("renders with all properties", () => {
    const { baseElement } = render(
      <GoabPublicSubformIndex
        heading="Test Heading"
        sectionTitle="Test Section Title"
        actionButtonText="Add Item"
        buttonVisibility="visible"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
      >
        <div data-testid="test-content">Test content</div>
      </GoabPublicSubformIndex>
    );

    const el = baseElement.querySelector("goa-public-subform-index");
    expect(el?.getAttribute("heading")).toBe("Test Heading");
    expect(el?.getAttribute("section-title")).toBe("Test Section Title");
    expect(el?.getAttribute("action-button-text")).toBe("Add Item");
    expect(el?.getAttribute("button-visibility")).toBe("visible");
    expect(el?.getAttribute("slot")).toBe("subform-index");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");

    // Content is rendered
    expect(baseElement.querySelector("[data-testid='test-content']")).toBeTruthy();
  });

  it("renders with default values", () => {
    const { baseElement } = render(
      <GoabPublicSubformIndex>
        <div>Test content</div>
      </GoabPublicSubformIndex>
    );

    const el = baseElement.querySelector("goa-public-subform-index");
    expect(el?.getAttribute("heading")).toBe("");
    expect(el?.getAttribute("section-title")).toBe("");
    expect(el?.getAttribute("action-button-text")).toBe("");
    expect(el?.getAttribute("button-visibility")).toBe("hidden");
    expect(el?.getAttribute("slot")).toBe("subform-index");
  });

  it("renders with hidden button visibility", () => {
    const { baseElement } = render(
      <GoabPublicSubformIndex
        heading="Test Heading"
        buttonVisibility="hidden"
      >
        <div>Test content</div>
      </GoabPublicSubformIndex>
    );

    const el = baseElement.querySelector("goa-public-subform-index");
    expect(el?.getAttribute("button-visibility")).toBe("hidden");
  });

  it("renders complex children content", () => {
    const { baseElement } = render(
      <GoabPublicSubformIndex heading="Dependents List">
        <p data-testid="description">
          Please add information about your dependents.
        </p>
        <table data-testid="dependents-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>
                <button data-testid="edit-btn">Edit</button>
                <button data-testid="remove-btn">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </GoabPublicSubformIndex>
    );

    expect(baseElement.querySelector("[data-testid='description']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='dependents-table']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='edit-btn']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='remove-btn']")).toBeTruthy();
  });

  it("handles empty string properties", () => {
    const { baseElement } = render(
      <GoabPublicSubformIndex
        heading=""
        sectionTitle=""
        actionButtonText=""
      >
        <div>Test content</div>
      </GoabPublicSubformIndex>
    );

    const el = baseElement.querySelector("goa-public-subform-index");
    expect(el?.getAttribute("heading")).toBe("");
    expect(el?.getAttribute("section-title")).toBe("");
    expect(el?.getAttribute("action-button-text")).toBe("");
  });

  it("handles special characters in text properties", () => {
    const specialTexts = {
      heading: "Dependents & Family",
      sectionTitle: "Section > Details",
      actionButtonText: "Add \"New\" Item",
    };

    const { baseElement } = render(
      <GoabPublicSubformIndex
        heading={specialTexts.heading}
        sectionTitle={specialTexts.sectionTitle}
        actionButtonText={specialTexts.actionButtonText}
      >
        <div>Test content</div>
      </GoabPublicSubformIndex>
    );

    const el = baseElement.querySelector("goa-public-subform-index");
    expect(el?.getAttribute("heading")).toBe(specialTexts.heading);
    expect(el?.getAttribute("section-title")).toBe(specialTexts.sectionTitle);
    expect(el?.getAttribute("action-button-text")).toBe(specialTexts.actionButtonText);
  });

  it("always renders with slot='subform-index' attribute", () => {
    const { baseElement } = render(
      <GoabPublicSubformIndex heading="Any heading">
        <div>Any content</div>
      </GoabPublicSubformIndex>
    );

    const el = baseElement.querySelector("goa-public-subform-index");
    expect(el?.getAttribute("slot")).toBe("subform-index");
  });

  it("renders nested components correctly", () => {
    const { baseElement } = render(
      <GoabPublicSubformIndex heading="Task List">
        <div data-testid="text-content">
          Please complete the following tasks:
        </div>
        <div data-testid="task-item-1">
          <span>Task 1: Complete profile</span>
          <button>Edit</button>
        </div>
        <div data-testid="task-item-2">
          <span>Task 2: Upload documents</span>
          <button>Remove</button>
        </div>
      </GoabPublicSubformIndex>
    );

    expect(baseElement.querySelector("[data-testid='text-content']")?.textContent)
      .toContain("Please complete the following tasks:");
    expect(baseElement.querySelector("[data-testid='task-item-1']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='task-item-2']")).toBeTruthy();
    expect(baseElement.querySelectorAll("button")).toHaveLength(2);
  });
});
