import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabSpinner } from "./spinner";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabSpinnerSize, GoabSpinnerType } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabSpinner],
  template: `
    <goab-spinner
      [type]="type"
      [size]="size"
      [invert]="invert"
      [testId]="testId"
      [progress]="progress"
    ></goab-spinner>
  `,
})
class TestSpinnerComponent {
  type = "progress" as GoabSpinnerType;
  size = "medium" as GoabSpinnerSize;
  invert = true;
  testId = "spinner-testid";
  progress = 20;
}

describe("GoABSpinner", () => {
  let fixture: ComponentFixture<TestSpinnerComponent>;
  let component: TestSpinnerComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabSpinner, TestSpinnerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-spinner");

    expect(el?.getAttribute("type")).toBe(component.type);
    expect(el?.getAttribute("size")).toBe(`${component.size}`);
    expect(el?.getAttribute("progress")).toBe(`${component.progress}`);
    expect(el?.getAttribute("invert")).toBe(`${component.invert}`);
    expect(el?.getAttribute("testid")).toBe(component.testId);
  });
});
