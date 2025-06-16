import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GoabPublicFormTaskList } from "./task-list";

describe("GoabPublicFormTaskList", () => {
  it("renders with heading property", () => {
    const { baseElement } = render(
      <GoabPublicFormTaskList heading="Required Tasks">
        <div data-testid="task-item-1">Task 1</div>
        <div data-testid="task-item-2">Task 2</div>
      </GoabPublicFormTaskList>
    );

    const el = baseElement.querySelector("goa-public-form-task-list");
    expect(el?.getAttribute("heading")).toBe("Required Tasks");

    // Content is rendered
    expect(baseElement.querySelector("[data-testid='task-item-1']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='task-item-2']")).toBeTruthy();
  });

  it("renders with different heading values", () => {
    const headings = [
      "Application Tasks",
      "Required Steps",
      "To-Do Items",
      "Checklist",
    ];

    headings.forEach(heading => {
      const { baseElement, unmount } = render(
        <GoabPublicFormTaskList heading={heading}>
          <div>Task content</div>
        </GoabPublicFormTaskList>
      );

      const el = baseElement.querySelector("goa-public-form-task-list");
      expect(el?.getAttribute("heading")).toBe(heading);
      
      unmount();
    });
  });

  it("renders complex children content with task items", () => {
    const { baseElement } = render(
      <GoabPublicFormTaskList heading="Application Progress">
        <div data-testid="task-completed" className="task-item">
          <span>✓ Complete profile information</span>
          <span className="status">Completed</span>
        </div>
        <div data-testid="task-in-progress" className="task-item">
          <span>📝 Upload documents</span>
          <span className="status">In Progress</span>
        </div>
        <div data-testid="task-pending" className="task-item">
          <span>⏳ Submit application</span>
          <span className="status">Pending</span>
        </div>
      </GoabPublicFormTaskList>
    );

    expect(baseElement.querySelector("[data-testid='task-completed']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='task-in-progress']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='task-pending']")).toBeTruthy();
    expect(baseElement.querySelectorAll(".task-item")).toHaveLength(3);
    expect(baseElement.querySelectorAll(".status")).toHaveLength(3);
  });

  it("renders nested task components", () => {
    const { baseElement } = render(
      <GoabPublicFormTaskList heading="Form Tasks">
        <div data-testid="task-1">
          <h3>Personal Information</h3>
          <ul>
            <li data-testid="subtask-1">Fill out name fields</li>
            <li data-testid="subtask-2">Provide contact details</li>
          </ul>
        </div>
        <div data-testid="task-2">
          <h3>Document Upload</h3>
          <button data-testid="upload-btn">Upload Files</button>
        </div>
      </GoabPublicFormTaskList>
    );

    expect(baseElement.querySelector("[data-testid='task-1']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='task-2']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='subtask-1']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='subtask-2']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='upload-btn']")).toBeTruthy();
    expect(baseElement.querySelectorAll("h3")).toHaveLength(2);
    expect(baseElement.querySelectorAll("li")).toHaveLength(2);
  });

  it("handles special characters in heading", () => {
    const specialHeadings = [
      "Tasks & Requirements",
      "Steps > Complete",
      "Items < 5",
      'Tasks with "quotes"',
      "Tasks with 'apostrophes'",
      "Tasks with numbers: 123",
      "Tasks with symbols: @#$%",
    ];

    specialHeadings.forEach(heading => {
      const { baseElement, unmount } = render(
        <GoabPublicFormTaskList heading={heading}>
          <div>Task content</div>
        </GoabPublicFormTaskList>
      );

      const el = baseElement.querySelector("goa-public-form-task-list");
      expect(el?.getAttribute("heading")).toBe(heading);
      
      unmount();
    });
  });

  it("renders empty task list", () => {
    const { baseElement } = render(
      <GoabPublicFormTaskList heading="Empty List">
        {null}
      </GoabPublicFormTaskList>
    );

    const el = baseElement.querySelector("goa-public-form-task-list");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("heading")).toBe("Empty List");
  });

  it("renders single task item", () => {
    const { baseElement } = render(
      <GoabPublicFormTaskList heading="Single Task">
        <div data-testid="only-task">Complete registration</div>
      </GoabPublicFormTaskList>
    );

    const el = baseElement.querySelector("goa-public-form-task-list");
    expect(el?.getAttribute("heading")).toBe("Single Task");
    expect(baseElement.querySelector("[data-testid='only-task']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='only-task']")?.textContent).toBe("Complete registration");
  });

  it("renders with interactive elements", () => {
    const { baseElement } = render(
      <GoabPublicFormTaskList heading="Interactive Tasks">
        <div data-testid="task-with-buttons">
          <span>Review application</span>
          <button data-testid="edit-btn">Edit</button>
          <button data-testid="delete-btn">Delete</button>
        </div>
        <div data-testid="task-with-links">
          <span>Submit documents</span>
          <a href="#" data-testid="help-link">Need help?</a>
        </div>
        <div data-testid="task-with-inputs">
          <label>
            <input type="checkbox" data-testid="checkbox" />
            Mark as completed
          </label>
        </div>
      </GoabPublicFormTaskList>
    );

    expect(baseElement.querySelector("[data-testid='edit-btn']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='delete-btn']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='help-link']")).toBeTruthy();
    expect(baseElement.querySelector("[data-testid='checkbox']")).toBeTruthy();
    expect(baseElement.querySelectorAll("button")).toHaveLength(2);
    expect(baseElement.querySelectorAll("a")).toHaveLength(1);
    expect(baseElement.querySelectorAll("input")).toHaveLength(1);
  });

  it("renders with long heading text", () => {
    const longHeading = "This is a very long heading that might wrap to multiple lines and should still be handled correctly by the component";
    
    const { baseElement } = render(
      <GoabPublicFormTaskList heading={longHeading}>
        <div>Task content</div>
      </GoabPublicFormTaskList>
    );

    const el = baseElement.querySelector("goa-public-form-task-list");
    expect(el?.getAttribute("heading")).toBe(longHeading);
  });

  it("renders with multiple task groups", () => {
    const { baseElement } = render(
      <GoabPublicFormTaskList heading="Grouped Tasks">
        <div data-testid="group-1">
          <h4>Personal Details</h4>
          <div data-testid="task-1-1">Enter full name</div>
          <div data-testid="task-1-2">Provide email</div>
        </div>
        <div data-testid="group-2">
          <h4>Professional Details</h4>
          <div data-testid="task-2-1">Add work experience</div>
          <div data-testid="task-2-2">Upload resume</div>
        </div>
        <div data-testid="group-3">
          <h4>Final Steps</h4>
          <div data-testid="task-3-1">Review information</div>
          <div data-testid="task-3-2">Submit application</div>
        </div>
      </GoabPublicFormTaskList>
    );

    expect(baseElement.querySelectorAll("[data-testid^='group-']")).toHaveLength(3);
    expect(baseElement.querySelectorAll("h4")).toHaveLength(3);
    expect(baseElement.querySelectorAll("[data-testid^='task-']")).toHaveLength(6);
  });
});