import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabRadioGroup } from "./radio-group";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoabRadioGroupOnChangeDetail,
  GoabRadioGroupOrientation,
  Spacing,
} from "@abgov/ui-components-common";
import { GoabRadioItem } from "../radio-item/radio-item";
import { fireEvent } from "@testing-library/dom";

interface RadioOption {
  text: string;
  value: string;
  description?: string;
  isDescriptionSlot?: boolean;
}

@Component({
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabRadioGroup, GoabRadioItem],
      declarations: [TestRadioGroupComponent],
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
  });

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-radio-group");
    expect(el).toBeTruthy();

    expect(el?.getAttribute("arialabel")).toBe(component.ariaLabel);
    expect(el?.getAttribute("data-testid")).toBe(component.testId);
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
    fireEvent(radioGroup, new CustomEvent("_change", {
      detail: {"name": component.name, value: component.options[0].value}
    }));

    expect(onChange).toBeCalledWith({name: component.name, value: component.options[0].value});
  })
});
