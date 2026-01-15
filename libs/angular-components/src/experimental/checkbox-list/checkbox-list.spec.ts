import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabxCheckboxList } from "./checkbox-list";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { fireEvent } from "@testing-library/dom";
import { By } from "@angular/platform-browser";
import { Spacing } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabxCheckboxList],
  template: `
    <goabx-checkbox-list
      [name]="name"
      [value]="value"
      [disabled]="disabled"
      [error]="error"
      [testId]="testId"
      [maxWidth]="maxWidth"
      [size]="size"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
      (onChange)="onChange()"
    >
    </goabx-checkbox-list>
  `,
})
class TestCheckboxListComponent {
  name?: string;
  value?: string[];
  disabled?: boolean;
  error?: boolean;
  testId?: string;
  maxWidth?: string;
  size?: "default" | "compact";
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;

  onChange() {
    /* do nothing */
  }
}

describe("GoabxCheckboxList", () => {
  let fixture: ComponentFixture<TestCheckboxListComponent>;
  let component: TestCheckboxListComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestCheckboxListComponent, GoabxCheckboxList, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCheckboxListComponent);
    component = fixture.componentInstance;

    component.name = "foo";
    component.value = ["option1"];
    component.disabled = false;
    component.error = false;
    component.testId = "testId";
    component.maxWidth = "480px";
    component.size = "compact";
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render properties", () => {
    const el = fixture.debugElement.query(
      By.css("goa-checkbox-list"),
    ).nativeElement;
    expect(el.getAttribute("name")).toBe(component.name);
    expect(el.getAttribute("version")).toBe("2");
    expect(el.getAttribute("size")).toBe("compact");
    expect(el.getAttribute("testid")).toBe(component.testId);
    expect(el.getAttribute("maxwidth")).toBe(component.maxWidth);
    expect(el.getAttribute("mt")).toBe(component.mt);
    expect(el.getAttribute("mr")).toBe(component.mr);
    expect(el.getAttribute("mb")).toBe(component.mb);
    expect(el.getAttribute("ml")).toBe(component.ml);
  });

  it("should default version to 2", () => {
    const el = fixture.debugElement.query(
      By.css("goa-checkbox-list"),
    ).nativeElement;
    expect(el.getAttribute("version")).toBe("2");
  });

  it("should handle onChange event", async () => {
    const onChange = jest.spyOn(component, "onChange");

    const el = fixture.debugElement.query(
      By.css("goa-checkbox-list"),
    ).nativeElement;

    fireEvent(
      el,
      new CustomEvent("_change", {
        detail: { name: "foo", value: ["option1", "option2"] },
      }),
    );

    expect(onChange).toHaveBeenCalled();
  });
});
