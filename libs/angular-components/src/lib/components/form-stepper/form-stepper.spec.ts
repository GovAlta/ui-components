import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabFormStepper } from "./form-stepper";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Spacing } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";

@Component({
  standalone: true,
  imports: [GoabFormStepper],
  template: `
    <goab-form-stepper
      [testId]="testId"
      [step]="step"
      [mt]="mt"
      [mr]="mr"
      [mb]="mb"
      [ml]="ml"
      (onChange)="onChange()"
    >
      <div>Some children</div>
    </goab-form-stepper>
  `,
})
class TestFormStepperComponent {
  testId?: string;
  step?: number;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;

  onChange() {
    /** do nothing **/
  }
}

describe("GoABFormStepper", () => {
  let fixture: ComponentFixture<TestFormStepperComponent>;
  let component: TestFormStepperComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabFormStepper, TestFormStepperComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestFormStepperComponent);
    component = fixture.componentInstance;

    component.testId = "form-stepper-id";
    component.step = 2;
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.debugElement.query(By.css("goa-form-stepper")).nativeElement;
    expect(el?.getAttribute("testid")).toBe(component.testId);
    expect(el?.getAttribute("step")).toBe(`${component.step}`);
    expect(el?.getAttribute("mt")).toBe(component.mt);
    expect(el?.getAttribute("mb")).toBe(component.mb);
    expect(el?.getAttribute("mr")).toBe(component.mr);
    expect(el?.getAttribute("ml")).toBe(component.ml);
    expect(el?.innerHTML).toContain("Some children");
  });

  it("should dispatch onChange event", () => {
    const onChange = jest.spyOn(component, "onChange");
    const el = fixture.debugElement.query(By.css("goa-form-stepper")).nativeElement;

    fireEvent(el, new CustomEvent("_change"));

    expect(onChange).toBeCalledTimes(1);
  });
});
