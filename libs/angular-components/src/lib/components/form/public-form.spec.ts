import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabPublicForm } from "./public-form";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { GoabFormState, GoabPublicFormStatus } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabPublicForm],
  template: `
    <goab-public-form
      [status]="status"
      [name]="name"
      (onInit)="handleInit($event)"
      (onComplete)="handleComplete($event)"
      (onStateChange)="handleStateChange($event)"
    >
      <div data-testid="content">Test content</div>
    </goab-public-form>
  `,
})
class TestPublicFormComponent {
  status: GoabPublicFormStatus = "complete";
  name = "test-form";

  handleInit(event: Event): void {/** do nothing **/}
  handleComplete(event: GoabFormState): void {/** do nothing **/}
  handleStateChange(event: GoabFormState): void {/** do nothing **/}
}

describe("GoabPublicForm", () => {
  let fixture: ComponentFixture<TestPublicFormComponent>;
  let component: TestPublicFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPublicFormComponent, GoabPublicForm],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPublicFormComponent);
    component = fixture.componentInstance;
  });

  it("should render with properties", () => {
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-form")).nativeElement;

    expect(el?.getAttribute("status")).toBe(component.status);
    expect(el?.getAttribute("name")).toBe(component.name);

    // Content is rendered
    expect(el?.querySelector("[data-testid='content']")).toBeTruthy();
  });

  it("should emit onInit event", () => {
    fixture.detectChanges();
    const spy = jest.spyOn(component, "handleInit");

    const el = fixture.debugElement.query(By.css("goa-public-form")).nativeElement;
    const detail = {
      el: document.createElement("form")
    };

    el.dispatchEvent(new CustomEvent("_init", { detail }));
    expect(spy).toHaveBeenCalledWith(expect.any(CustomEvent));
  });

  it("should emit onComplete event", () => {
    fixture.detectChanges();
    const spy = jest.spyOn(component, "handleComplete");

    const el = fixture.debugElement.query(By.css("goa-public-form")).nativeElement;
    const detail: GoabFormState = {
      uuid: "test-uuid",
      form: {},
      history: [],
      editting: "",
      status: "complete"
    };

    el.dispatchEvent(new CustomEvent("_complete", { detail }));
    expect(spy).toHaveBeenCalledWith(detail);
  });

  it("should emit onStateChange event", () => {
    fixture.detectChanges();
    const spy = jest.spyOn(component, "handleStateChange");

    const el = fixture.debugElement.query(By.css("goa-public-form")).nativeElement;
    const formState: GoabFormState = {
      uuid: "test-uuid",
      form: {},
      history: [],
      editting: "",
      status: "complete"
    };
    const detail = { data: formState };

    el.dispatchEvent(new CustomEvent("_stateChange", { detail }));
    expect(spy).toHaveBeenCalledWith(formState);
  });

  it("should set default status to complete", () => {
    const publicForm = new GoabPublicForm();
    expect(publicForm.status).toBe("complete");
  });
});
