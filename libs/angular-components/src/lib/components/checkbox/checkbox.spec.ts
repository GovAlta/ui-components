import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabCheckbox } from "./checkbox";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { fireEvent } from "@testing-library/dom";
import { By } from "@angular/platform-browser";
import { Spacing } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabCheckbox],
  template: `
    <goab-checkbox
      [name]="name"
      [checked]="checked"
      [text]="text"
      [value]="value"
      description="Description text"
      [disabled]="disabled"
      maxWidth="480px"
      [error]="error"
      [ariaLabel]="ariaLabel"
      [testId]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
      (onChange)="onChange()"
    >
    </goab-checkbox>
  `,
})
class TestCheckboxComponent {
  name?: string;
  checked?: boolean;
  text?: string;
  value?: string | number | boolean;
  disabled?: boolean;
  error?: boolean;
  ariaLabel?: string;
  testId?: string;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;

  onChange() {
    /* do nothing */
  }
}

describe("GoabCheckbox", () => {
  let fixture: ComponentFixture<TestCheckboxComponent>;
  let component: TestCheckboxComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestCheckboxComponent, GoabCheckbox, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    tick();
    fixture.detectChanges();
  }));

  it("should render properties", () => {
    const checkboxElement = fixture.debugElement.query(
      By.css("goa-checkbox"),
    ).nativeElement;
    expect(checkboxElement.getAttribute("name")).toBe(component.name);
    expect(checkboxElement.getAttribute("text")).toBe(component.text);
    expect(checkboxElement.getAttribute("testid")).toBe(component.testId);
    expect(checkboxElement.getAttribute("mt")).toBe(component.mt);
    expect(checkboxElement.getAttribute("mr")).toBe(component.mr);
    expect(checkboxElement.getAttribute("mb")).toBe(component.mb);
    expect(checkboxElement.getAttribute("ml")).toBe(component.ml);
    expect(checkboxElement.getAttribute("description")).toBe("Description text");
    expect(checkboxElement.getAttribute("maxwidth")).toBe("480px");
  });

  it("should handle onChange event", fakeAsync(() => {
    const onChange = jest.spyOn(component, "onChange");

    const checkboxElement = fixture.debugElement.query(
      By.css("goa-checkbox"),
    ).nativeElement;

    fireEvent(
      checkboxElement,
      new CustomEvent("_change", {
        detail: { name: "foo", value: "bar", checked: true },
      }),
    );

    expect(onChange).toHaveBeenCalled();
  }));
});

@Component({
  standalone: true,
  imports: [GoabCheckbox],
  template: `
    <goab-checkbox
      name="test"
      [checked]="true"
      text="check box text"
      [description]="descriptionTemplate"
    >
      <ng-template #descriptionTemplate>
        <strong>A description slot</strong>
      </ng-template>
    </goab-checkbox>
  `,
})
class TestCheckboxWithDescriptionSlotComponent {
  /** do nothing **/
}

describe("Checkbox with description slot", () => {
  let fixture: ComponentFixture<TestCheckboxWithDescriptionSlotComponent>;

  it("should render with slot description", fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabCheckbox, ReactiveFormsModule, TestCheckboxWithDescriptionSlotComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCheckboxWithDescriptionSlotComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const checkboxElement = fixture.debugElement.query(
      By.css("goa-checkbox"),
    ).nativeElement;
    const slotDescription = checkboxElement.querySelector("[slot='description']");
    expect(slotDescription.textContent).toContain("A description slot");
  }));
});

@Component({
  standalone: true,
  imports: [GoabCheckbox, ReactiveFormsModule],
  template: `
    <goab-checkbox
      name="test"
      [checked]="true"
      text="check box text"
      [reveal]="revealTemplate"
      revealArialLabel="Screen reader announcement for reveal content"
    >
      <ng-template #revealTemplate>
        <strong>A reveal slot</strong>
      </ng-template>
    </goab-checkbox>
  `,
})
class TestCheckboxWithRevealSlotComponent {}

describe("Checkbox with reveal slot", () => {
  let fixture: ComponentFixture<TestCheckboxWithRevealSlotComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabCheckbox, ReactiveFormsModule, TestCheckboxWithRevealSlotComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCheckboxWithRevealSlotComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render with slot reveal", () => {
    const checkboxElement = fixture.debugElement.query(
      By.css("goa-checkbox"),
    ).nativeElement;
    const slotReveal = checkboxElement.querySelector("[slot='reveal']");
    expect(slotReveal.textContent).toContain("A reveal slot");
  });

  it("should pass the revealAriaLabel property to the web component", () => {
    const checkboxElement = fixture.debugElement.query(
      By.css("goa-checkbox"),
    ).nativeElement;
    expect(checkboxElement.getAttribute("revealarialabel")).toBe("Screen reader announcement for reveal content");
  });
});
