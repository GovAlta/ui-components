import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabDatePicker } from "./date-picker";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Spacing } from "@abgov/ui-components-common";
import { ReactiveFormsModule } from "@angular/forms";
import { addMonths } from "date-fns";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";

@Component({
  template: `
    <goab-date-picker
      [name]="name"
      [value]="value"
      [min]="min"
      [max]="max"
      type="input"
      [error]="error"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
      [width]="width"
      (onChange)="onChange()"
    ></goab-date-picker>
  `,
})
class TestDatePickerComponent {
  name?: string;
  value?: Date | string;
  min?: Date | string;
  max?: Date | string;
  error?: boolean;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
  width?: string;
  onChange() {
    /* do nothing */
  }
}

describe("GoABDatePicker", () => {
  let fixture: ComponentFixture<TestDatePickerComponent>;
  let component: TestDatePickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabDatePicker, ReactiveFormsModule],
      declarations: [TestDatePickerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDatePickerComponent);
    component = fixture.componentInstance;
    // Assign values
    const value = new Date();
    component.name = "foo";
    component.min = addMonths(value, -1);
    component.max = addMonths(value, 1);
    component.value = value;
    component.error = true;
    component.mt = "l";
    component.mb = "m";
    component.ml = "s";
    component.mr = "xs";
    component.width = "20ch";
    fixture.detectChanges();
  });

  it("should render successfully", () => {
    const el = fixture.debugElement.query(By.css("goa-date-picker")).nativeElement;
    expect(el).toBeTruthy();

    expect(el?.getAttribute("name")).toBe(component.name);
    expect(el?.getAttribute("value")).toBe((component.value as Date)?.toISOString());
    expect(el?.getAttribute("error")).toBe(`${component.error}`);
    expect(el?.getAttribute("min")).toBe(component.min?.toString());
    expect(el?.getAttribute("max")).toBe(component.max?.toString());
    expect(el?.getAttribute("mt")).toBe(component.mt);
    expect(el?.getAttribute("mb")).toBe(component.mb);
    expect(el?.getAttribute("ml")).toBe(component.ml);
    expect(el?.getAttribute("mr")).toBe(component.mr);
    expect(el?.getAttribute("width")).toBe(component.width);
  });

  it("should handle event", async () => {
    const onChange = jest.spyOn(component, "onChange");
    const el = fixture.debugElement.query(By.css("goa-date-picker")).nativeElement;

    fireEvent(
      el,
      new CustomEvent("_change", {
        detail: { name: component.name, value: new Date() },
      }),
    );

    expect(onChange).toHaveBeenCalled();
  });
});
