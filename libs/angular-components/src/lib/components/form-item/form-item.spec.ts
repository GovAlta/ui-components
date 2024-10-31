import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabFormItem } from "./form-item";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabFormItemRequirement, Spacing } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";
import { GoabFormItemSlot } from "./form-item-slot";

@Component({
  template: `
    standalone: true,
    imports: [GoABFormItemSlot],
    <goab-form-item
      [label]="label"
      [requirement]="requirement"
      [error]="error"
      [helpText]="helpText"
      [id]="id"
      [testId]="testId"
      maxWidth="480px"
      [mt]="mt"
      [mb]="mb"
      [mr]="mr"
      [ml]="ml"
    >
      <input data-testid="foo" />
      <goab-form-item-slot slot="error" *ngIf="errorSlot">This is an error slot</goab-form-item-slot>
      <goab-form-item-slot slot="helptext" *ngIf="helpTextSlot">This is a helpText slot</goab-form-item-slot>
    </goab-form-item>
  `,
})
class TestFormItemComponent {
  label?: string;
  requirement?: GoabFormItemRequirement;
  error?: string;
  helpText?: string;
  id?: string;
  testId?: string;
  errorSlot?: boolean;
  helpTextSlot?: boolean;
  mt?: Spacing;
  mb?: Spacing;
  mr?: Spacing;
  ml?: Spacing;
}

describe("GoABFormItem", () => {
  let fixture: ComponentFixture<TestFormItemComponent>;
  let component: TestFormItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestFormItemComponent],
      imports: [GoabFormItem],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestFormItemComponent);
    component = fixture.componentInstance;

    component.label = "First name";
    component.requirement = "optional";
    component.id = "firstName";
    component.testId = "foo";
    component.mt = "s";
    component.mb = "l";
    component.ml = "xl";
    component.mr = "m";
  });

  it("should render with properties", () => {
    component.error = "This is an error";
    component.helpText = "this is some helptext";
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-form-item")).nativeElement;

    expect(el?.getAttribute("label")).toBe(component.label);
    expect(el?.getAttribute("requirement")).toBe(component.requirement);
    expect(el?.getAttribute("error")).toBe(component.error);
    expect(el?.getAttribute("helptext")).toBe(component.helpText);
    expect(el?.getAttribute("id")).toBe(component.id);
    expect(el?.getAttribute("testid")).toBe(component.testId);
    expect(el?.getAttribute("maxwidth")).toBe("480px");
    expect(el?.getAttribute("mt")).toBe(component.mt);
    expect(el?.getAttribute("mb")).toBe(component.mb);
    expect(el?.getAttribute("mr")).toBe(component.mr);
    expect(el?.getAttribute("ml")).toBe(component.ml);

    // Children is rendered
    expect(el?.querySelector("input[data-testid='foo']")).toBeTruthy();
  });

  it("should render error and helpText slot", () => {
    component.errorSlot = true;
    component.helpTextSlot = true;
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-form-item")).nativeElement;
    expect(el?.querySelector("[slot='error']")).toBeTruthy();
    expect(el?.innerHTML).toContain("This is an error slot");
    expect(el?.querySelector("[slot='helptext']")).toBeTruthy();
    expect(el?.innerHTML).toContain("This is a helpText slot");
    expect(el?.querySelector("input[data-testid='foo']")).toBeTruthy();
  });
});
