import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABCheckbox } from "./checkbox";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { fireEvent } from "@testing-library/dom";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <goab-checkbox [name]="name"
    [checked]="checked"
    [text]="text"
    [value]="value"
    [description]="description"
    [disabled]="disabled"
    [error]="error"
   [ariaLabel]="ariaLabel"
    [testId]="testId"
    [mt]="mt"
    [mb]="mb"
    [ml]="ml"
    [mr]="mr"
    (onChange)="onChange($event)">
    <div *ngIf="slotDescription" slot="description">{{slotDescription}}</div>
</goab-checkbox>
  `
})
class TestCheckboxComponent{
  name?: string;
  checked?: boolean;
  text?: string;
  value?: string | number | boolean;
  description?: string;
  disabled?: boolean;
  error?: boolean;
  ariaLabel?: string;
  testId?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  slotDescription?: string;

  onChange() {
    /* do nothing */
  }
}

describe("GoABCheckbox", () => {
  let fixture: ComponentFixture<TestCheckboxComponent>;
  let component: TestCheckboxComponent;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [GoABCheckbox, ReactiveFormsModule],
      declarations: [TestCheckboxComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TestCheckboxComponent);
    component = fixture.componentInstance;

    component.name = "foo";
    component.value = "bar";
    component.text = "to display";
    component.disabled = false;
    component.checked = true;
    component.error = false;
    component.testId = "testId";
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";
    fixture.detectChanges();
  });

  it("should render properties", () => {
    const checkboxElement = fixture.debugElement.query(By.css("goa-checkbox")).nativeElement;
    expect(checkboxElement.getAttribute("name")).toBe(component.name);
    expect(checkboxElement.getAttribute("text")).toBe(component.text);
    expect(checkboxElement.getAttribute("data-testid")).toBe(component.testId);
    expect(checkboxElement.getAttribute("mt")).toBe(component.mt);
    expect(checkboxElement.getAttribute("mr")).toBe(component.mr);
    expect(checkboxElement.getAttribute("mb")).toBe(component.mb);
    expect(checkboxElement.getAttribute("ml")).toBe(component.ml);
  })

  it("should render with text description", () => {
    component.description = "description text";
    fixture.detectChanges();
    const checkboxElement = fixture.debugElement.query(By.css("goa-checkbox")).nativeElement;
    expect(checkboxElement.getAttribute("description")).toBe(component.description);
  })

  it("should render with slot description", () => {
    component.slotDescription = "description slot";
    fixture.detectChanges();
    const checkboxElement = fixture.debugElement.query(By.css("goa-checkbox")).nativeElement;
    const slotDescription = checkboxElement.querySelector("[slot='description']");
    expect(slotDescription.textContent).toContain(component.slotDescription);
  })

  it("should handle onChange event", async() => {
    const onChange = jest.spyOn(component, "onChange");

    const checkboxElement = fixture.debugElement.query(By.css("goa-checkbox")).nativeElement;

    fireEvent(checkboxElement, new CustomEvent("_change", {
      detail: { name: "foo", value: "bar", checked: true },
    }));

    expect(onChange).toHaveBeenCalled();
  })
})
