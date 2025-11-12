import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabPublicFormTask } from "./task";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { GoabPublicFormTaskStatus } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabPublicFormTask],
  template: `
    <goab-public-form-task
      [status]="status"
    >
      <div data-testid="content">Task content</div>
    </goab-public-form-task>
  `,
})
class TestPublicFormTaskComponent {
  status: GoabPublicFormTaskStatus = "not-started";
}

describe("GoabPublicFormTask", () => {
  let fixture: ComponentFixture<TestPublicFormTaskComponent>;
  let component: TestPublicFormTaskComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPublicFormTaskComponent, GoabPublicFormTask],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPublicFormTaskComponent);
    component = fixture.componentInstance;
  });

  it("should render with status property", () => {
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-form-task")).nativeElement;

    expect(el?.getAttribute("status")).toBe(component.status);

    // Content is rendered
    expect(el?.querySelector("[data-testid='content']")).toBeTruthy();
  });

  it("should have undefined status by default", () => {
    const task = new GoabPublicFormTask();
    expect(task.status).toBeUndefined();
  });

  it("should handle all valid status values", () => {
    const statuses: GoabPublicFormTaskStatus[] = ["completed", "not-started", "cannot-start"];

    statuses.forEach(status => {
      component.status = status;
      fixture.detectChanges();

      const el = fixture.debugElement.query(By.css("goa-public-form-task")).nativeElement;
      expect(el?.getAttribute("status")).toBe(status);
    });
  });

  it("should handle status changes", () => {
    // Start with not-started
    component.status = "not-started";
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css("goa-public-form-task")).nativeElement;
    expect(el?.getAttribute("status")).toBe("not-started");

    // Change to completed
    component.status = "completed";
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css("goa-public-form-task")).nativeElement;
    expect(el?.getAttribute("status")).toBe("completed");

    // Change to cannot-start
    component.status = "cannot-start";
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css("goa-public-form-task")).nativeElement;
    expect(el?.getAttribute("status")).toBe("cannot-start");
  });

  it("should render without status attribute when undefined", () => {
    component.status = undefined as any;
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-form-task")).nativeElement;
    expect(el?.hasAttribute("status")).toBeFalsy();
  });
});
