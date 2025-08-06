import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabInput } from "./input";
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
  imports: [GoabInput],
  template: `
    <goab-input
      [type]="type"
      [debounce]="debounce"
      [focused]="focused"
      [name]="name"
      [autoCapitalize]="autoCapitalize"
      [autoComplete]="autoComplete"
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
      (onTrailingIconClick)="(onTrailingIconClick)"
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
    </goab-input>
  `,
})
class TestInputComponent {
  name = "foo";
  id?: string;
  debounce?: number;
  disabled?: boolean;
  autoCapitalize?: GoabInputAutoCapitalize;
  autoComplete?: string;
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
  value?: string | null = "";
  min?: number;
  max?: number;
  step?: number;
  type?: GoabInputType = "text";
  ariaLabelledBy?: string;
  textAlign?: "left" | "right";
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  leadingContent!: string | TemplateRef<any>;
  trailingContent!: string | TemplateRef<any>;

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

describe("GoABInput", () => {
  let fixture: ComponentFixture<TestInputComponent>;
  let component: TestInputComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestInputComponent, GoabInput],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestInputComponent);
    component = fixture.componentInstance;

    // assign values
    component.value = "bar";
    component.id = "foo";
    component.leadingIcon = "search";
    component.trailingIcon = "close";
    component.autoCapitalize = "on";
    component.autoComplete = "off";
    component.variant = "bare";
    component.disabled = true;
    component.readonly = true;
    component.focused = true;
    component.placeholder = "placeholder";
    component.prefix = "foo";
    component.suffix = "bar";
    component.testId = "test-id";
    component.debounce = 1000;
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";
    component.maxLength = 10;
    component.prefix = "$";
    component.suffix = "items";
    component.ariaLabel = "foo input";
    component.ariaLabelledBy = "foo";
    component.min = 0;
    component.max = 100;

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const input = fixture.debugElement.query(By.css("goa-input")).nativeElement;
    expect(input?.getAttribute("name")).toBe(component.name);
    expect(input?.getAttribute("value")).toBe(component.value);
    expect(input?.getAttribute("type")).toBe(component.type);
    expect(input?.getAttribute("id")).toBe(component.id);
    expect(input?.getAttribute("leadingicon")).toBe(component.leadingIcon);
    expect(input?.getAttribute("trailingicon")).toBe(component.trailingIcon);
    expect(input?.getAttribute("autocapitalize")).toBe(component.autoCapitalize);
    expect(input?.getAttribute("autocomplete")).toBe(component.autoComplete);
    expect(input?.getAttribute("variant")).toBe(component.variant);
    expect(input?.getAttribute("focused")).toBe(`${component.focused}`);
    expect(input?.getAttribute("placeholder")).toBe(component.placeholder);
    expect(input?.getAttribute("prefix")).toBe(component.prefix);
    expect(input?.getAttribute("suffix")).toBe(component.suffix);
    expect(input?.getAttribute("data-testid")).toBe(component.testId);
    expect(input?.getAttribute("debounce")).toBe(`${component.debounce}`);
    expect(input?.getAttribute("mt")).toBe(component.mt);
    expect(input?.getAttribute("mr")).toBe(component.mr);
    expect(input?.getAttribute("mb")).toBe(component.mb);
    expect(input?.getAttribute("ml")).toBe(component.ml);
    expect(input?.getAttribute("maxlength")).toBe(`${component.maxLength}`);
    expect(input?.getAttribute("arialabel")).toBe(component.ariaLabel);
    expect(input?.getAttribute("arialabelledby")).toBe(component.ariaLabelledBy);
    expect(input?.getAttribute("min")).toBe(`${component.min}`);
    expect(input?.getAttribute("max")).toBe(`${component.max}`);
  });

  describe("Text Alignment", () => {
    it("passes textAlign prop through to web component", fakeAsync(() => {
      const testFixture = TestBed.createComponent(TestInputComponent);
      const testComponent = testFixture.componentInstance;
      testComponent.name = "test";
      testComponent.textAlign = "right";
      testFixture.detectChanges();
      tick();
      testFixture.detectChanges();

      const input = testFixture.debugElement.query(By.css("goa-input")).nativeElement;
      expect(input?.getAttribute("textalign")).toBe("right");

      testComponent.textAlign = "left";
      testFixture.detectChanges();

      expect(input?.getAttribute("textalign")).toBe("left");
    }));
  });

  it("should handle onChange event", () => {
    const validateOnChange = jest.spyOn(component, "onChange");

    const input = fixture.debugElement.query(By.css("goa-input")).nativeElement;

    fireEvent(
      input,
      new CustomEvent("_change", { detail: { name: "foo", value: "new value" } }),
    );

    expect(validateOnChange).toBeCalledWith({ name: "foo", value: "new value" });
  });

  it("should handle onFocus event", () => {
    const validateOnFocus = jest.spyOn(component, "onFocus");

    const input = fixture.debugElement.query(By.css("goa-input")).nativeElement;

    fireEvent(input, new CustomEvent("_focus"));

    expect(validateOnFocus).toBeCalled();
  });

  it("should handle onBlur event", () => {
    const validateOnBlur = jest.spyOn(component, "onBlur");

    const input = fixture.debugElement.query(By.css("goa-input")).nativeElement;

    fireEvent(input, new CustomEvent("_blur"));

    expect(validateOnBlur).toBeCalled();
  });

  it("should handle onKeyPress event", () => {
    const validateOnKeyPress = jest.spyOn(component, "onKeyPress");

    const input = fixture.debugElement.query(By.css("goa-input")).nativeElement;

    fireEvent(input, new CustomEvent("_keyPress"));

    expect(validateOnKeyPress).toBeCalled();
  });

  it("should render leading and trailing content", () => {
    const input = fixture.debugElement.query(By.css("goa-input"));
    const leadingContent = input.nativeElement.querySelector("[slot='leadingContent']");
    const trailingContent = input.nativeElement.querySelector("[slot='trailingContent']");

    expect(leadingContent).toBeTruthy();
    expect(leadingContent.textContent).toContain("Leading Content");

    expect(trailingContent).toBeTruthy();
    expect(trailingContent.textContent).toContain("Trailing Content");
  });
});

@Component({
  standalone: true,
  imports: [GoabInput],
  template: `
    <goab-input
      [leadingContent]="leadingContent"
      [trailingContent]="trailingContent"
    ></goab-input>
  `,
})
class TestStringContentComponent {
  leadingContent = "String Leading Content";
  trailingContent = "String Trailing Content";
}

describe("GoabInput with string content", () => {
  let fixture: ComponentFixture<TestStringContentComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestStringContentComponent, GoabInput],
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
