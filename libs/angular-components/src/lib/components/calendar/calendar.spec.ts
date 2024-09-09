import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabCalendar } from "./calendar";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { fireEvent } from "@testing-library/dom";

@Component({
  template: `
    <goab-calendar
      [name]="name"
      [value]="value"
      [min]="min"
      [max]="max"
      [testId]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
      (onChange)="onChange($event)"
    >
    </goab-calendar>
  `,
})
class TestCalendarComponent {
  name?: string;
  value?: Date;
  min?: Date;
  max?: Date;
  testId?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;

  onChange() {
    /* do nothing */
  }
}

describe("GoABCalendar", () => {
  let fixture: ComponentFixture<TestCalendarComponent>;
  let component: TestCalendarComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabCalendar],
      declarations: [TestCalendarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCalendarComponent);
    component = fixture.componentInstance;

    component.name = "calendar";
    component.value = new Date();
    component.min = new Date();
    component.max = new Date();
    component.testId = "test-calendar";
    component.mt = "m";
    component.mb = "xl";
    component.ml = "s";
    component.mr = "l";
    fixture.detectChanges();
  });

  it("should render properties", () => {
    const calendar = fixture.nativeElement.querySelector("goa-calendar");
    expect(calendar.getAttribute("name")).toBe(component.name);
    expect(calendar.getAttribute("min")).toBe(component.min?.toString());
    expect(calendar.getAttribute("max")).toBe(component.max?.toString());
    expect(calendar.getAttribute("data-testid")).toBe(component.testId);
    expect(calendar.getAttribute("mt")).toBe(component.mt);
    expect(calendar.getAttribute("mb")).toBe(component.mb);
    expect(calendar.getAttribute("ml")).toBe(component.ml);
    expect(calendar.getAttribute("mr")).toBe(component.mr);
  });

  it("should handle the event", () => {
    const onChange = jest.spyOn(component, "onChange");
    const calendar = fixture.nativeElement.querySelector("goa-calendar");

    fireEvent(
      calendar,
      new CustomEvent("_change", {
        detail: {
          type: "date",
          value: new Date(),
          name: component.name,
        },
      }),
    );
    expect(onChange).toHaveBeenCalled();
  });
});
