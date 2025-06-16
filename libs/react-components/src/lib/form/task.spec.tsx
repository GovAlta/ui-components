import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GoabPublicFormTask } from "./task";
import { GoabPublicFormTaskStatus } from "@abgov/ui-components-common";

describe("GoabPublicFormTask", () => {
  it("renders with status property", () => {
    const { baseElement } = render(
      <GoabPublicFormTask status="completed">
        <div data-testid="task-content">Complete profile</div>
      </GoabPublicFormTask>
    );

    const el = baseElement.querySelector("goa-public-form-task");
    expect(el?.getAttribute("status")).toBe("completed");

    // Content is rendered
    expect(baseElement.querySelector("[data-testid='task-content']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='task-content']")?.textContent).toBe("Complete profile");
  });

  it("handles all valid status values", () => {
    const statuses: GoabPublicFormTaskStatus[] = ["completed", "not-started", "cannot-start"];
    
    statuses.forEach(status => {
      const { baseElement, unmount } = render(
        <GoabPublicFormTask status={status}>
          <div>Task content</div>
        </GoabPublicFormTask>
      );
      
      const el = baseElement.querySelector("goa-public-form-task");
      expect(el?.getAttribute("status")).toBe(status);
      
      unmount();
    });
  });

  it("renders with completed status", () => {
    const { baseElement } = render(
      <GoabPublicFormTask status="completed">
        <span>✓ Application submitted</span>
      </GoabPublicFormTask>
    );

    const el = baseElement.querySelector("goa-public-form-task");
    expect(el?.getAttribute("status")).toBe("completed");
    expect(baseElement.textContent).toContain("✓ Application submitted");
  });

  it("renders with not-started status", () => {
    const { baseElement } = render(
      <GoabPublicFormTask status="not-started">
        <span>📝 Upload documents</span>
      </GoabPublicFormTask>
    );

    const el = baseElement.querySelector("goa-public-form-task");
    expect(el?.getAttribute("status")).toBe("not-started");
    expect(baseElement.textContent).toContain("📝 Upload documents");
  });

  it("renders with cannot-start status", () => {
    const { baseElement } = render(
      <GoabPublicFormTask status="cannot-start">
        <span>🔒 Final submission (complete other tasks first)</span>
      </GoabPublicFormTask>
    );

    const el = baseElement.querySelector("goa-public-form-task");
    expect(el?.getAttribute("status")).toBe("cannot-start");
    expect(baseElement.textContent).toContain("🔒 Final submission (complete other tasks first)");
  });

  it("renders complex children content", () => {
    const { baseElement } = render(
      <GoabPublicFormTask status="not-started">
        <div data-testid="task-header">
          <h3>Complete Personal Information</h3>
          <p>Fill out all required fields in your profile</p>
        </div>
        <div data-testid="task-actions">
          <button data-testid="start-btn">Start Task</button>
          <button data-testid="skip-btn">Skip for Now</button>
        </div>
      </GoabPublicFormTask>
    );

    expect(baseElement.querySelector("[data-testid='task-header']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='task-actions']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='start-btn']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='skip-btn']")).toBeTruthy();
    expect(baseElement.querySelector("h3")?.textContent).toBe("Complete Personal Information");
    expect(baseElement.querySelector("p")?.textContent).toBe("Fill out all required fields in your profile");
  });

  it("renders with interactive elements", () => {
    const { baseElement } = render(
      <GoabPublicFormTask status="completed">
        <div data-testid="task-item">
          <span>Review application details</span>
          <div className="actions">
            <button data-testid="edit-btn" type="button">Edit</button>
            <button data-testid="view-btn" type="button">View</button>
            <a href="#details" data-testid="details-link">More details</a>
          </div>
        </div>
      </GoabPublicFormTask>
    );

    expect(baseElement.querySelector("[data-testid='edit-btn']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='view-btn']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='details-link']")).toBeTruthy();
    expect(baseElement.querySelectorAll("button")).toHaveLength(2);
    expect(baseElement.querySelectorAll("a")).toHaveLength(1);
  });

  it("renders with form elements", () => {
    const { baseElement } = render(
      <GoabPublicFormTask status="not-started">
        <div data-testid="task-form">
          <label>
            <input type="checkbox" data-testid="agree-checkbox" />
            I agree to the terms and conditions
          </label>
          <div>
            <input type="text" data-testid="name-input" placeholder="Enter your name" />
            <select data-testid="country-select">
              <option value="">Select country</option>
              <option value="ca">Canada</option>
              <option value="us">United States</option>
            </select>
          </div>
        </div>
      </GoabPublicFormTask>
    );

    expect(baseElement.querySelector("[data-testid='agree-checkbox']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='name-input']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='country-select']")).toBeTruthy();
    expect(baseElement.querySelectorAll("input")).toHaveLength(2);
    expect(baseElement.querySelectorAll("select")).toHaveLength(1);
  });

  it("renders nested task components", () => {
    const { baseElement } = render(
      <GoabPublicFormTask status="not-started">
        <div data-testid="main-task">
          <h2>Application Process</h2>
          <div data-testid="subtasks">
            <div data-testid="subtask-1" className="subtask">
              <span>Step 1: Personal Information</span>
              <span className="status">Required</span>
            </div>
            <div data-testid="subtask-2" className="subtask">
              <span>Step 2: Document Upload</span>
              <span className="status">Optional</span>
            </div>
            <div data-testid="subtask-3" className="subtask">
              <span>Step 3: Review & Submit</span>
              <span className="status">Required</span>
            </div>
          </div>
        </div>
      </GoabPublicFormTask>
    );

    expect(baseElement.querySelector("[data-testid='main-task']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='subtasks']")).toBeTruthy();
    expect(baseElement.querySelectorAll("[data-testid^='subtask-']")).toHaveLength(3);
    expect(baseElement.querySelectorAll(".subtask")).toHaveLength(3);
    expect(baseElement.querySelectorAll(".status")).toHaveLength(3);
    expect(baseElement.querySelector("h2")?.textContent).toBe("Application Process");
  });

  it("renders with text content only", () => {
    const { baseElement } = render(
      <GoabPublicFormTask status="completed">
        Complete your profile information by filling out all required fields
      </GoabPublicFormTask>
    );

    const el = baseElement.querySelector("goa-public-form-task");
    expect(el?.getAttribute("status")).toBe("completed");
    expect(el?.textContent).toBe("Complete your profile information by filling out all required fields");
  });

  it("renders with mixed content types", () => {
    const { baseElement } = render(
      <GoabPublicFormTask status="cannot-start">
        <div>
          Task description with <strong>bold text</strong> and <em>italic text</em>
        </div>
        <ul data-testid="task-list">
          <li>First requirement</li>
          <li>Second requirement</li>
          <li>Third requirement</li>
        </ul>
        <div>
          Progress: <span data-testid="progress">0/3 completed</span>
        </div>
      </GoabPublicFormTask>
    );

    expect(baseElement.querySelector("strong")?.textContent).toBe("bold text");
    expect(baseElement.querySelector("em")?.textContent).toBe("italic text");
    expect(baseElement.querySelector("[data-testid='task-list']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='progress']")?.textContent).toBe("0/3 completed");
    expect(baseElement.querySelectorAll("li")).toHaveLength(3);
  });

  it("renders empty children", () => {
    const { baseElement } = render(
      <GoabPublicFormTask status="completed">
        {null}
      </GoabPublicFormTask>
    );

    const el = baseElement.querySelector("goa-public-form-task");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("status")).toBe("completed");
    expect(el?.textContent).toBe("");
  });
});