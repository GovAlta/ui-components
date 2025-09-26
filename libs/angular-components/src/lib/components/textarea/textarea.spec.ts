import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabTextArea } from "./textarea";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabTextAreaCountBy, Spacing } from "@abgov/ui-components-common";
import { fireEvent } from "@testing-library/dom";

@Component({
  template: `
    <goab-textarea
      [testId]="testId"
      [name]="name"
      [value]="value"
      [rows]="rows"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [countBy]="countBy"
      maxWidth="480px"
      autoComplete="off"
      [maxCount]="maxCount"
      [mt]="mt"
      [mr]="mr"
      [mb]="mb"
      [ml]="ml"
      (onChange)="onChange()"
      (onBlur)="onBlur()"
    ></goab-textarea>
  `,
})
class TestTextareaComponent {
  name = "textarea-name";
  value?: string;
  id?: string;
  placeholder?: string;
  rows?: number;
  error?: boolean;
  disabled?: boolean;
  width?: string;
  testId?: string;
  ariaLabel?: string;
  countBy?: GoabTextAreaCountBy;
  maxCount?: number;
  mt?: Spacing;
  mb?: Spacing;
  mr?: Spacing;
  ml?: Spacing;

  onChange() {
    /** do nothing **/
  }

  onBlur() {
    /** do nothing **/
  }
}

describe("GoABTextArea", () => {
  let fixture: ComponentFixture<TestTextareaComponent>;
  let component: TestTextareaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTextareaComponent],
      imports: [GoabTextArea],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(TestTextareaComponent);
    component = fixture.componentInstance;

    component.testId = "textarea-testid";
    component.value = "textarea-value";
    component.rows = 10;
    component.placeholder = "textarea-placeholder";
    component.disabled = true;
    component.countBy = "word";
    component.maxCount = 50;
    component.mt = "s" as Spacing;
    component.mr = "m" as Spacing;
    component.mb = "l" as Spacing;
    component.ml = "xl" as Spacing;
    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-textarea");
    expect(el?.getAttribute("name")).toBe(component.name);
    expect(el?.getAttribute("value")).toBe(component.value);
    expect(el?.getAttribute("rows")).toBe(`${component.rows}`);
    expect(el?.getAttribute("placeholder")).toBe(component.placeholder);
    expect(el?.getAttribute("countby")).toBe(component.countBy);
    expect(el?.getAttribute("maxcount")).toBe(`${component.maxCount}`);
    expect(el?.getAttribute("maxwidth")).toBe("480px");
    expect(el?.getAttribute("mt")).toBe(component.mt);
    expect(el?.getAttribute("mr")).toBe(component.mr);
    expect(el?.getAttribute("mb")).toBe(component.mb);
    expect(el?.getAttribute("ml")).toBe(component.ml);
    expect(el?.getAttribute("autocomplete")).toBe("off");
  });

  it("should dispatch onChange", () => {
    const onChange = jest.spyOn(component, "onChange");

    const el = fixture.nativeElement.querySelector("goa-textarea");
    fireEvent(
      el,
      new CustomEvent("_change", {
        detail: { name: "textarea-name", value: "test" },
      }),
    );

    expect(onChange).toBeCalledTimes(1);
  });

  it("should dispatch onBlur", () => {
    const onBlur = jest.spyOn(component, "onBlur");

    const el = fixture.nativeElement.querySelector("goa-textarea");
    fireEvent(
      el,
      new CustomEvent("_blur", {
        detail: { name: "textarea-name", value: "test value" },
      }),
    );

    expect(onBlur).toBeCalledTimes(1);
  });
});
