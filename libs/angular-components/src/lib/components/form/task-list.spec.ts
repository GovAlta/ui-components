import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabPublicFormTaskList } from "./task-list";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabPublicFormTaskList],
  template: `
    <goab-public-form-task-list
      [heading]="heading"
    >
      <div data-testid="task-item-1">Task 1</div>
      <div data-testid="task-item-2">Task 2</div>
    </goab-public-form-task-list>
  `,
})
class TestPublicFormTaskListComponent {
  heading = "Required Tasks";
}

describe("GoabPublicFormTaskList", () => {
  let fixture: ComponentFixture<TestPublicFormTaskListComponent>;
  let component: TestPublicFormTaskListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPublicFormTaskListComponent, GoabPublicFormTaskList],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPublicFormTaskListComponent);
    component = fixture.componentInstance;
  });

  it("should render with heading property", () => {
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-form-task-list")).nativeElement;

    expect(el?.getAttribute("heading")).toBe(component.heading);

    // Content is rendered
    expect(el?.querySelector("[data-testid='task-item-1']")).toBeTruthy();
    expect(el?.querySelector("[data-testid='task-item-2']")).toBeTruthy();
  });

  it("should have undefined heading by default", () => {
    const taskList = new GoabPublicFormTaskList();
    expect(taskList.heading).toBeUndefined();
  });

  it("should handle heading changes", () => {
    // Initial heading
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css("goa-public-form-task-list")).nativeElement;
    expect(el?.getAttribute("heading")).toBe("Required Tasks");

    // Change heading
    component.heading = "Updated Task List";
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css("goa-public-form-task-list")).nativeElement;
    expect(el?.getAttribute("heading")).toBe("Updated Task List");

    // Empty heading
    component.heading = "";
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css("goa-public-form-task-list")).nativeElement;
    expect(el?.getAttribute("heading")).toBe("");
  });

  it("should render without heading attribute when undefined", () => {
    component.heading = undefined as any;
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-form-task-list")).nativeElement;
    expect(el?.hasAttribute("heading")).toBeFalsy();
  });

  it("should handle multiple nested elements", () => {
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-form-task-list")).nativeElement;
    const taskItems = el?.querySelectorAll("[data-testid^='task-item']");

    expect(taskItems?.length).toBe(2);
    expect(taskItems?.[0]?.textContent).toContain("Task 1");
    expect(taskItems?.[1]?.textContent).toContain("Task 2");
  });

  it("should handle special characters in heading", () => {
    const specialHeadings = [
      "Tasks & Requirements",
      "Tasks > 5",
      "Tasks < 10",
      "Tasks with \"quotes\"",
      "Tasks with 'apostrophes'",
    ];

    specialHeadings.forEach(heading => {
      component.heading = heading;
      fixture.detectChanges();

      const el = fixture.debugElement.query(By.css("goa-public-form-task-list")).nativeElement;
      expect(el?.getAttribute("heading")).toBe(heading);
    });
  });
});
