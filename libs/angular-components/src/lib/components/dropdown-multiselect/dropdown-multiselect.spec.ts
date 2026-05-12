import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabDropdownMultiselect } from "./dropdown-multiselect";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { fireEvent } from "@testing-library/dom";
import { By } from "@angular/platform-browser";
import { GoabDropdownMultiselectSize, Spacing } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabDropdownMultiselect],
  template: `
    <goab-dropdown-multiselect
      [name]="name"
      [value]="value"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [error]="error"
      [testId]="testId"
      [maxHeight]="maxHeight"
      [width]="width"
      [size]="size"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [showSelectAll]="showSelectAll"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
      (onChange)="onChangeFn($event)"
    >
    </goab-dropdown-multiselect>
  `,
})
class TestDropdownMultiselectComponent {
  name?: string;
  value?: string[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  testId?: string;
  maxHeight?: string;
  width?: string;
  size?: GoabDropdownMultiselectSize;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  showSelectAll?: boolean;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;

  onChangeFn(_detail: unknown) {
    /* do nothing */
  }
}

describe("GoabDropdownMultiselect", () => {
  let fixture: ComponentFixture<TestDropdownMultiselectComponent>;
  let component: TestDropdownMultiselectComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestDropdownMultiselectComponent, GoabDropdownMultiselect],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDropdownMultiselectComponent);
    component = fixture.componentInstance;

    component.name = "fruit";
    component.value = ["apple"];
    component.placeholder = "Select fruit";
    component.disabled = false;
    component.error = false;
    component.testId = "testId";
    component.maxHeight = "300px";
    component.width = "400px";
    component.size = "compact";
    component.ariaLabel = "Choose fruit";
    component.ariaLabelledBy = "fruit-label";
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";
    component.showSelectAll = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render properties", () => {
    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;

    console.log(el.outerHTML);

    expect(el.getAttribute("name")).toBe("fruit");
    expect(el.getAttribute("placeholder")).toBe("Select fruit");
    expect(el.getAttribute("max-height")).toBe("300px");
    expect(el.getAttribute("width")).toBe("400px");
    expect(el.getAttribute("size")).toBe("compact");
    expect(el.getAttribute("aria-label")).toBe("Choose fruit");
    expect(el.getAttribute("aria-labelledby")).toBe("fruit-label");
    expect(el.getAttribute("testid")).toBe("testId");
    expect(el.getAttribute("show-select-all")).toBe("true");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should not set disabled attribute when false", () => {
    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;
    expect(el.getAttribute("disabled")).toBeNull();
  });

  it("should set disabled attribute when true", fakeAsync(() => {
    component.disabled = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;
    expect(el.getAttribute("disabled")).toBe("true");
  }));

  it("should not set error attribute when false", () => {
    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;
    expect(el.getAttribute("error")).toBeNull();
  });

  it("should set error attribute when true", fakeAsync(() => {
    component.error = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;
    expect(el.getAttribute("error")).toBe("true");
  }));

  it("should emit onChange when _change event fires", fakeAsync(() => {
    const spy = jest.spyOn(component, "onChangeFn");
    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;

    fireEvent(
      el,
      new CustomEvent("_change", {
        detail: {
          name: "fruit",
          value: ["apple", "banana"],
          labels: ["Apple", "Banana"],
        },
        bubbles: true,
      }),
    );

    tick();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    const detail = spy.mock.calls[0][0] as any;
    expect(detail.name).toBe("fruit");
    expect(detail.value).toEqual(["apple", "banana"]);
    expect(detail.labels).toEqual(["Apple", "Banana"]);
  }));
});
