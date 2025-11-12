import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";

import { GoabInputNumber } from "./input-number";
import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef } from "@angular/core";
import {
  GoabIconType,
  GoabInputAutoCapitalize,
  GoabInputOnChangeDetail,
  GoabInputType,
  Spacing,
} from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";

@Component({
  standalone: true,
  imports: [GoabInputNumber],
  template: `
    <goab-input-number
      [type]="type"
      [debounce]="debounce"
      [focused]="focused"
      [name]="name"
      [autoCapitalize]="autoCapitalize"
      [id]="id"
      [leadingIcon]="leadingIcon"
      [trailingIcon]="trailingIcon"
      [variant]="variant"
      [disabled]="disabled"
      [readonly]="readonly"
      [placeholder]="placeholder"
      [error]="error"
      [testId]="testId"
      [value]="value"
      [width]="width"
      [min]="min"
      [max]="max"
      [step]="step"
      [maxLength]="maxLength"
      [prefix]="prefix"
      [suffix]="suffix"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [textAlign]="textAlign"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
      [trailingIconAriaLabel]="trailingIconAriaLabel"
      (onTrailingIconClick)="onTrailingIconClick()"
      (onChange)="onChange($event)"
      (onBlur)="onBlur()"
      (onFocus)="onFocus()"
      (onKeyPress)="onKeyPress()"
      [leadingContent]="leadingContent"
      [trailingContent]="trailingContent"
    >
      <ng-template #leadingContent>
        <div>Leading Content</div>
      </ng-template>
      <ng-template #trailingContent>
        <div>Trailing Content</div>
      </ng-template>
    </goab-input-number>
  `,
})
class TestInputNumberComponent {
  name = "foo-number";
  id?: string;
  debounce?: number;
  disabled?: boolean;
  autoCapitalize?: GoabInputAutoCapitalize;
  placeholder?: string;
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  variant?: string;
  focused?: boolean;
  readonly?: boolean;
  error?: boolean;
  width?: string;
  prefix?: string;
  suffix?: string;
  testId?: string;
  ariaLabel?: string;
  maxLength?: number;
  value?: number | null = null;
  min?: number;
  max?: number;
  step?: number;
  type?: GoabInputType = "number";
  ariaLabelledBy?: string;
  textAlign?: "left" | "right";
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  leadingContent!: string | TemplateRef<any>;
  trailingContent!: string | TemplateRef<any>;
  trailingIconAriaLabel?: string;

  onTrailingIconClick() {
    /** do nothing **/
  }
  onFocus() {
    /** do nothing **/
  }
  onBlur() {
    /** do nothing **/
  }
  onKeyPress() {
    /** do nothing **/
  }
  onChange(event: GoabInputOnChangeDetail) {
    /** do nothing **/
  }
}

describe("GoabInputNumber", () => {
  let fixture: ComponentFixture<TestInputNumberComponent>;
  let component: TestInputNumberComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestInputNumberComponent, GoabInputNumber],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestInputNumberComponent);
    component = fixture.componentInstance;

    component.value = 42.5;
    component.id = "foo-num-id";
    component.leadingIcon = "calculator";
    component.trailingIcon = "close";
    component.autoCapitalize = "off";
    component.variant = "bare";
    component.disabled = true;
    component.readonly = true;
    component.focused = true;
    component.placeholder = "placeholder number";
    component.prefix = "$";
    component.suffix = "CAD";
    component.testId = "test-id-number";
    component.debounce = 1000;
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";
    component.maxLength = 10;
    component.ariaLabel = "foo number input";
    component.ariaLabelledBy = "foo-label";
    component.min = 0;
    component.max = 100;
    component.step = 0.5;
    component.error = true;
    component.width = "50ch";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render attributes correctly on the underlying goa-input", () => {
    const inputNumber = fixture.debugElement.query(By.css("goa-input")).nativeElement;
    expect(inputNumber?.getAttribute("name")).toBe(component.name);
    expect(inputNumber?.getAttribute("value")).toBe(`${component.value}`);
    expect(inputNumber?.getAttribute("type")).toBe(component.type);
    expect(inputNumber?.getAttribute("id")).toBe(component.id);
    expect(inputNumber?.getAttribute("leadingicon")).toBe(component.leadingIcon);
    expect(inputNumber?.getAttribute("trailingicon")).toBe(component.trailingIcon);
    expect(inputNumber?.getAttribute("autocapitalize")).toBe(component.autoCapitalize);
    expect(inputNumber?.getAttribute("variant")).toBe(component.variant);
    expect(inputNumber?.getAttribute("focused")).toBe(`${component.focused}`);
    expect(inputNumber?.getAttribute("placeholder")).toBe(component.placeholder);
    expect(inputNumber?.getAttribute("prefix")).toBe(component.prefix);
    expect(inputNumber?.getAttribute("suffix")).toBe(component.suffix);
    expect(inputNumber?.getAttribute("data-testid")).toBe(component.testId);
    expect(inputNumber?.getAttribute("debounce")).toBe(`${component.debounce}`);
    expect(inputNumber?.getAttribute("mt")).toBe(component.mt);
    expect(inputNumber?.getAttribute("mr")).toBe(component.mr);
    expect(inputNumber?.getAttribute("mb")).toBe(component.mb);
    expect(inputNumber?.getAttribute("ml")).toBe(component.ml);
    expect(inputNumber?.getAttribute("maxlength")).toBe(`${component.maxLength}`);
    expect(inputNumber?.getAttribute("arialabel")).toBe(component.ariaLabel);
    expect(inputNumber?.getAttribute("arialabelledby")).toBe(component.ariaLabelledBy);
    expect(inputNumber?.getAttribute("min")).toBe(`${component.min}`);
    expect(inputNumber?.getAttribute("max")).toBe(`${component.max}`);
  });

  it("should handle onChange event", fakeAsync(() => {
    const inputNumber = fixture.debugElement.query(By.css("goa-input")).nativeElement;

    const validateOnChange = jest.spyOn(component, "onChange");
    const testValue = "99.9";
    const expectedDetail: GoabInputOnChangeDetail = {
      name: component.name,
      value: testValue,
    };

    fireEvent(
      inputNumber,
      new CustomEvent("_change", {
        bubbles: true,
        composed: true,
        detail: expectedDetail,
      }),
    );
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(validateOnChange).toHaveBeenCalledTimes(1);
    expect(validateOnChange).toHaveBeenCalledWith(expectedDetail);
  }));

  it("should handle onFocus event", fakeAsync(() => {
    const inputNumber = fixture.debugElement.query(By.css("goa-input")).nativeElement;

    const validateOnFocus = jest.spyOn(component, "onFocus");
    const detail = { name: component.name, value: `${component.value}` };

    fireEvent(
      inputNumber,
      new CustomEvent("_focus", { bubbles: true, composed: true, detail }),
    );
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(validateOnFocus).toHaveBeenCalledTimes(1);
  }));

  it("should handle onBlur event", fakeAsync(() => {
    const inputNumber = fixture.debugElement.query(By.css("goa-input")).nativeElement;

    const validateOnBlur = jest.spyOn(component, "onBlur");
    const detail = { name: component.name, value: `${component.value}` }; // Example detail

    fireEvent(
      inputNumber,
      new CustomEvent("_blur", { bubbles: true, composed: true, detail }),
    );
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(validateOnBlur).toHaveBeenCalledTimes(1);
  }));

  it("should handle onKeyPress event", () => {
    const inputNumber = fixture.debugElement.query(By.css("goa-input")).nativeElement;
    const validateOnKeyPress = jest.spyOn(component, "onKeyPress");
    fireEvent(inputNumber, new CustomEvent("_keypress"));
    expect(validateOnKeyPress).toHaveBeenCalledTimes(1);
  });

  describe("Text Alignment", () => {
    it("passes textAlign prop through to web component", fakeAsync(() => {
      const testFixture = TestBed.createComponent(TestInputNumberComponent);
      const testComponent = testFixture.componentInstance;
      testComponent.name = "test-number";
      testComponent.value = 123;
      testComponent.textAlign = "left"; // Override default
      testFixture.detectChanges();
      tick();
      testFixture.detectChanges();

      const input = testFixture.debugElement.query(By.css("goa-input")).nativeElement;
      expect(input?.getAttribute("textalign")).toBe("left");

      // Test changing the value
      testComponent.textAlign = "right";
      testFixture.detectChanges();

      expect(input?.getAttribute("textalign")).toBe("right");
    }));
  });

  it("should render leading and trailing content", () => {
    const inputNumber = fixture.debugElement.query(By.css("goa-input"));
    const leadingContent = inputNumber.nativeElement.querySelector(
      "[slot='leadingContent']",
    );
    const trailingContent = inputNumber.nativeElement.querySelector(
      "[slot='trailingContent']",
    );

    expect(leadingContent).toBeTruthy();
    expect(leadingContent.textContent).toContain("Leading Content");

    expect(trailingContent).toBeTruthy();
    expect(trailingContent.textContent).toContain("Trailing Content");
  });
});

@Component({
  standalone: true,
  imports: [GoabInputNumber],
  template: `
    <goab-input-number
      [leadingContent]="leadingContent"
      [trailingContent]="trailingContent"
    ></goab-input-number>
  `,
})
class TestStringContentComponent {
  leadingContent = "String Leading Content";
  trailingContent = "String Trailing Content";
}

describe("GoabInputNumber with string content", () => {
  let fixture: ComponentFixture<TestStringContentComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestStringContentComponent, GoabInputNumber],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestStringContentComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render string leadingContent and trailingContent", () => {
    const input = fixture.debugElement.query(By.css("goa-input"));
    const leadingContent = input.nativeElement.querySelector("[slot='leadingContent']");
    const trailingContent = input.nativeElement.querySelector("[slot='trailingContent']");

    expect(leadingContent).toBeTruthy();
    expect(leadingContent.textContent).toContain("String Leading Content");

    expect(trailingContent).toBeTruthy();
    expect(trailingContent.textContent).toContain("String Trailing Content");
  });
});
