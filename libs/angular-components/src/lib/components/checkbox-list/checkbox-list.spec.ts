import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";
import { GoabCheckboxListOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { GoabCheckboxList } from "./checkbox-list";
import { GoabCheckbox } from "../checkbox/checkbox";

@Component({
  template: `
    <goab-checkbox-list
      [name]="name"
      [value]="value"
      [disabled]="disabled"
      [error]="error"
      [testId]="testId"
      [id]="id"
      [maxWidth]="maxWidth"
      [mt]="mt"
      [mr]="mr"
      [mb]="mb"
      [ml]="ml"
      (onChange)="onChange($event)"
    >
      <goab-checkbox name="basic1" value="basic1" text="Basic 1"></goab-checkbox>
      <goab-checkbox name="basic2" value="basic2" text="Basic 2"></goab-checkbox>
      <goab-checkbox name="basic3" value="basic3" text="Basic 3"></goab-checkbox>
    </goab-checkbox-list>
  `,
})
class TestCheckboxListHostComponent {
  name?: string;
  value?: string[];
  disabled?: boolean;
  error?: boolean;
  testId?: string;
  id?: string;
  maxWidth?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;

  lastChange?: GoabCheckboxListOnChangeDetail;
  onChange(event: GoabCheckboxListOnChangeDetail) {
    this.lastChange = event; // keep a reference so the param isn't unused
  }
}

describe("GoabCheckboxList", () => {
  let fixture: ComponentFixture<TestCheckboxListHostComponent>;
  let host: TestCheckboxListHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestCheckboxListHostComponent],
      imports: [GoabCheckboxList, GoabCheckbox, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCheckboxListHostComponent);
    host = fixture.componentInstance;

    host.name = "fruits";
    host.value = ["apples", "oranges"];
    host.disabled = false;
    host.error = true;
    host.testId = "checkbox-list";
    host.id = "checkbox-list-id";
    host.maxWidth = "480px";
    host.mt = "s";
    host.mr = "m";
    host.mb = "l";
    host.ml = "xl";

    fixture.detectChanges();
  });

  it("should render and bind attributes", () => {
    const el: HTMLElement = fixture.debugElement.query(
      By.css("goa-checkbox-list"),
    ).nativeElement;

    expect(el.getAttribute("name")).toBe(host.name);
    expect(el.getAttribute("error")).toBe("true");
    expect(el.getAttribute("testid")).toBe(host.testId);
    expect(el.getAttribute("id")).toBe(host.id);
    expect(el.getAttribute("maxwidth")).toBe(host.maxWidth);
    expect(el.getAttribute("mt")).toBe(host.mt);
    expect(el.getAttribute("mr")).toBe(host.mr);
    expect(el.getAttribute("mb")).toBe(host.mb);
    expect(el.getAttribute("ml")).toBe(host.ml);

    // projected checkbox children exist and are configured
    const checkboxes = el.querySelectorAll("goa-checkbox");
    expect(checkboxes.length).toBeGreaterThan(0);
    const first = checkboxes[0] as HTMLElement & { value?: string };
    expect(first.getAttribute("name")).toBe("basic1");
    expect(first.getAttribute("text")).toBe("Basic 1");
    // value is bound as a property, not an attribute
    expect(first.value).toBe("basic1");
  });

  it("should work with reactive forms", () => {
    const comp = fixture.debugElement.query(By.directive(GoabCheckboxList))
      .componentInstance as GoabCheckboxList;

    // Simulate form control registration
    const fcChangeSpy = jest.fn();
    const fcTouchedSpy = jest.fn();
    comp.registerOnChange(fcChangeSpy);
    comp.registerOnTouched(fcTouchedSpy);

    // Test writeValue integration
    comp.writeValue(["option1", "option2"]);
    expect(comp.value).toEqual(["option1", "option2"]);

    // Test change event integration
    const el: HTMLElement = fixture.debugElement.query(
      By.css("goa-checkbox-list"),
    ).nativeElement;

    const detail: GoabCheckboxListOnChangeDetail = {
      name: "fruits",
      value: ["apple", "banana"],
    };

    fireEvent(
      el,
      new CustomEvent("_change", {
        detail,
      }) as Event,
    );

    expect(fcChangeSpy).toHaveBeenCalledWith(["apple", "banana"]);
    expect(fcTouchedSpy).toHaveBeenCalledTimes(1);
  });

  it("should handle disabled state correctly", () => {
    host.disabled = true;
    fixture.detectChanges();

    const el: HTMLElement = fixture.debugElement.query(
      By.css("goa-checkbox-list"),
    ).nativeElement;

    // The disabled property is bound directly, not as an attribute
    // Check the property instead of attribute
    expect((el as HTMLElement & { disabled: boolean }).disabled).toBe(true);

    // Change to false
    host.disabled = false;
    fixture.detectChanges();

    expect((el as HTMLElement & { disabled: boolean }).disabled).toBe(false);
  });

  it("should handle undefined/null props gracefully", () => {
    // leave name undefined by not setting it explicitly; verify attributes absent
    host.name = undefined as unknown as string;
    host.value = undefined;
    host.testId = undefined;
    host.maxWidth = undefined;

    expect(() => {
      fixture.detectChanges();
    }).not.toThrow();

    const el: HTMLElement = fixture.debugElement.query(
      By.css("goa-checkbox-list"),
    ).nativeElement;

    expect(el.getAttribute("name")).toBeNull();
    expect(el.getAttribute("testid")).toBeNull();
  });

  it("should handle spacing props correctly", () => {
    host.mt = "xs";
    host.mr = "none";
    host.mb = "3xl";
    host.ml = "4xl";
    fixture.detectChanges();

    const el: HTMLElement = fixture.debugElement.query(
      By.css("goa-checkbox-list"),
    ).nativeElement;

    expect(el.getAttribute("mt")).toBe("xs");
    expect(el.getAttribute("mr")).toBe("none");
    expect(el.getAttribute("mb")).toBe("3xl");
    expect(el.getAttribute("ml")).toBe("4xl");
  });

  it("should emit multiple change events correctly", () => {
    const comp = fixture.debugElement.query(By.directive(GoabCheckboxList))
      .componentInstance as GoabCheckboxList;
    const onChangeSpy = jest.spyOn(comp.onChange, "emit");

    const el: HTMLElement = fixture.debugElement.query(
      By.css("goa-checkbox-list"),
    ).nativeElement;

    // First change
    const detail1: GoabCheckboxListOnChangeDetail = {
      name: "fruits",
      value: ["apple"],
    };

    fireEvent(el, new CustomEvent("_change", { detail: detail1 }));
    expect(onChangeSpy).toHaveBeenCalledWith(detail1);

    // Second change
    const detail2: GoabCheckboxListOnChangeDetail = {
      name: "fruits",
      value: ["apple", "banana"],
    };

    fireEvent(el, new CustomEvent("_change", { detail: detail2 }));
    expect(onChangeSpy).toHaveBeenCalledWith(detail2);
    expect(onChangeSpy).toHaveBeenCalledTimes(2);
  });
});
