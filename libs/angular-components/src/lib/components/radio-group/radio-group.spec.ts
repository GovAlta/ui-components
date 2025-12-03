import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabRadioGroup } from "./radio-group";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoabRadioGroupOnChangeDetail,
  GoabRadioGroupOrientation,
  Spacing,
} from "@abgov/ui-components-common";
import { GoabRadioItem } from "../radio-item/radio-item";
import { fireEvent } from "@testing-library/dom";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

interface RadioOption {
  text: string;
  value: string;
  description?: string;
  isDescriptionSlot?: boolean;
}

@Component({
  standalone: true,
  imports: [GoabRadioGroup, GoabRadioItem, CommonModule],
  template: `
    <goab-radio-group
      [name]="name"
      [value]="value"
      [orientation]="orientation"
      [disabled]="disabled"
      [error]="error"
      [testId]="testId"
      [ariaLabel]="ariaLabel"
      [mt]="mt"
      [mr]="mr"
      [mb]="mb"
      [ml]="ml"
      (onChange)="onChange($event)"
    >
      <goab-radio-item
        *ngFor="let option of options"
        [label]="option.text"
        [name]="name"
        [checked]="value === option.value"
        [value]="option.value"
        [ariaLabel]="option.text"
        [description]="option.isDescriptionSlot ? '' : option.description"
      >
        {{ option.text }}
        <div slot="description" *ngIf="option.isDescriptionSlot">
          {{ option.description }}
        </div>
      </goab-radio-item>
    </goab-radio-group>
  `,
})
class TestRadioGroupComponent {
  name?: string;
  value?: string;
  disabled?: boolean;
  orientation?: GoabRadioGroupOrientation;
  error?: boolean;
  ariaLabel?: string;
  testId?: string;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;

  options: RadioOption[] = [];

  onChange(event: GoabRadioGroupOnChangeDetail) {
    /** do nothing **/
  }
}

describe("GoABRadioGroup", () => {
  let fixture: ComponentFixture<TestRadioGroupComponent>;
  let component: TestRadioGroupComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestRadioGroupComponent, GoabRadioGroup, GoabRadioItem],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestRadioGroupComponent);
    component = fixture.componentInstance;

    // Assign values
    component.name = "fruits";
    component.ariaLabel = "Fruit Radio Group";
    component.testId = "foo";
    component.value = "bananas";
    component.orientation = "horizontal";
    component.disabled = true;
    component.error = true;
    component.mt = "m";
    component.mb = "s";
    component.mr = "xl";
    component.ml = "2xl";

    // Basic options
    component.options = [
      { text: "Apples", value: "apples" },
      { text: "Oranges", value: "oranges", description: "Oranges are orange" },
      { text: "Bananas", value: "bananas" },
    ];

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-radio-group");
    expect(el).toBeTruthy();

    expect(el?.getAttribute("arialabel")).toBe(component.ariaLabel);
    expect(el?.getAttribute("testid")).toBe(component.testId);
    expect(el?.getAttribute("error")).toBe(`${component.error}`);
    expect(el?.getAttribute("mb")).toBe(component.mb);
    expect(el?.getAttribute("ml")).toBe(component.ml);
    expect(el?.getAttribute("mr")).toBe(component.mr);
    expect(el?.getAttribute("mt")).toBe(component.mt);
    expect(el?.getAttribute("orientation")).toBe(component.orientation);
    expect(el?.getAttribute("value")).toBe(component.value);

    const radioItems = el?.querySelectorAll("goa-radio-item");
    expect(radioItems.length).toBe(component.options?.length);
    component.options?.forEach((option, index) => {
      expect(radioItems[index].getAttribute("checked")).toBe(
        `${option.value === component.value}`,
      );
      expect(radioItems[index].getAttribute("label")).toBe(option.text);
      expect(radioItems[index].getAttribute("name")).toBe(component.name);
      expect(radioItems[index].getAttribute("value")).toBe(option.value);
    });
  });

  it("should render description", () => {
    component.options.forEach((option, index) => {
      component.options[index].description = `Description for ${component.options[index].text}`;
    });
    component.options[0].isDescriptionSlot = true;
    fixture.detectChanges();

    const radioGroup = fixture.nativeElement.querySelector("goa-radio-group");
    expect(radioGroup).toBeTruthy();
    const radioItems = radioGroup?.querySelectorAll("goa-radio-item");
    expect(radioItems.length).toBe(component.options.length);

    // Slot description
    expect(radioItems[0].querySelector("div[slot='description']")?.innerHTML,
    ).toContain(`Description for ${component.options[0].text}`);

    // attribute description
    expect(radioItems[1].getAttribute("description")).toBe(`Description for ${component.options[1].text}`);
    expect(radioItems[2].getAttribute("description")).toBe(`Description for ${component.options[2].text}`);
  });

  it("should dispatch onChange", () => {
    const onChange = jest.spyOn(component, "onChange");

    const radioGroup = fixture.nativeElement.querySelector("goa-radio-group");
    const changeEvent = new CustomEvent("_change", {
      detail: { name: component.name, value: component.options[0].value },
    });

    fireEvent(radioGroup, changeEvent);

    expect(onChange).toBeCalledWith(
      expect.objectContaining({
        name: component.name,
        value: component.options[0].value,
        event: expect.any(Event),
      }),
    );
  });

  describe("writeValue", () => {
    it("should set value attribute when writeValue is called", () => {
      const radioGroupComponent = fixture.debugElement.query(By.css("goab-radio-group")).componentInstance;
      const radioGroupElement = fixture.nativeElement.querySelector("goa-radio-group");

      radioGroupComponent.writeValue("apples");
      expect(radioGroupElement.getAttribute("value")).toBe("apples");

      radioGroupComponent.writeValue("oranges");
      expect(radioGroupElement.getAttribute("value")).toBe("oranges");
    });

    it("should set value attribute to empty string when writeValue is called with null or empty", () => {
      const radioGroupComponent = fixture.debugElement.query(By.css("goab-radio-group")).componentInstance;
      const radioGroupElement = fixture.nativeElement.querySelector("goa-radio-group");

      // First set a value
      radioGroupComponent.writeValue("bananas");
      expect(radioGroupElement.getAttribute("value")).toBe("bananas");

      // Then clear it with null
      radioGroupComponent.writeValue(null);
      expect(radioGroupElement.getAttribute("value")).toBe("");

      // Set again and clear with undefined
      radioGroupComponent.writeValue("apples");
      radioGroupComponent.writeValue(undefined);
      expect(radioGroupElement.getAttribute("value")).toBe("");

      // Set again and clear with empty string
      radioGroupComponent.writeValue("oranges");
      radioGroupComponent.writeValue("");
      expect(radioGroupElement.getAttribute("value")).toBe("");
    });

    it("should update component value property", () => {
      const radioGroupComponent = fixture.debugElement.query(By.css("goab-radio-group")).componentInstance;

      radioGroupComponent.writeValue("apples");
      expect(radioGroupComponent.value).toBe("apples");

      radioGroupComponent.writeValue(null);
      expect(radioGroupComponent.value).toBe(null);
    });
  });
});
