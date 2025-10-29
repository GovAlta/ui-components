import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabDropdown } from "./dropdown";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabIconType, Spacing } from "@abgov/ui-components-common";
import { GoabDropdownItem } from "../dropdown-item/dropdown-item";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";

@Component({
  standalone: true,
  imports: [GoabDropdown, GoabDropdownItem],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <goab-dropdown
      [leadingIcon]="leadingIcon"
      [name]="name"
      [value]="value"
      [maxHeight]="maxHeight"
      [placeholder]="placeholder"
      [filterable]="filterable"
      [disabled]="disabled"
      [error]="error"
      [testId]="testId"
      [id]="id"
      [width]="width"
      [maxWidth]="maxWidth"
      [mt]="mt"
      [mr]="mr"
      [mb]="mb"
      [ml]="ml"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [autoComplete]="autoComplete"
      (onChange)="onChange()"
    >
      <goab-dropdown-item [name]="name" label="Red" value="red"></goab-dropdown-item>
      <goab-dropdown-item [name]="name" label="Blue" value="blue"></goab-dropdown-item>
      <goab-dropdown-item
        [name]="name"
        label="Yellow"
        value="yellow"
      ></goab-dropdown-item>
    </goab-dropdown>
  `,
})
class TestDropdownComponent {
  name?: string;
  value?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  id?: string;
  disabled?: boolean;
  error?: boolean;
  filterable?: boolean;
  leadingIcon?: GoabIconType;
  maxHeight?: string;
  multiselect?: boolean;
  native?: boolean;
  placeholder?: string;
  testId?: string;
  width?: string;
  maxWidth?: string;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
  autoComplete?: string;

  onChange() {
    /** do nothing **/
  }
}

describe("GoABDropdown", () => {
  let fixture: ComponentFixture<TestDropdownComponent>;
  let component: TestDropdownComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestDropdownComponent, GoabDropdown, GoabDropdownItem, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDropdownComponent);
    component = fixture.componentInstance;

    // Assign values
    component.leadingIcon = "color-wand";
    component.name = "favColor";
    component.value = "blue";
    component.maxHeight = "100px";
    component.placeholder = "Select...";
    component.filterable = true;
    component.disabled = true;
    component.error = true;
    component.testId = "foo";
    component.id = "foo-dropdown";
    component.width = "200px";
    component.maxWidth = "400px";
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";
    component.ariaLabel = "Label";
    component.ariaLabelledBy = "foo-dropdown-label";
    component.autoComplete = "off";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should bind all web-components attribute", () => {
    const el = fixture.debugElement.query(By.css("goa-dropdown")).nativeElement;
    expect(el?.getAttribute("leadingicon")).toBe("color-wand");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
    expect(el?.getAttribute("id")).toBe("foo-dropdown");
    expect(el?.getAttribute("filterable")).toBe("true");
    expect(el?.getAttribute("arialabel")).toBe("Label");
    expect(el?.getAttribute("arialabelledby")).toBe("foo-dropdown-label");
    expect(el?.getAttribute("autocomplete")).toBe("off");
    expect(el?.getAttribute("maxwidth")).toBe("400px");

    // Check options
    const dropdownItems = el.querySelectorAll("goa-dropdown-item");
    expect(dropdownItems.length).toBe(3);
    const expectedOptions = [
      { label: "Red", value: "red" },
      { label: "Blue", value: "blue" },
      { label: "Yellow", value: "yellow" },
    ];
    expectedOptions.forEach((option, index) => {
      expect(dropdownItems[index].getAttribute("name")).toBe(component.name);
    });
  });

  it("should allow for a single selection", fakeAsync(() => {
    const onChangeMock = jest.spyOn(component, "onChange");
    component.native = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-dropdown")).nativeElement;
    expect(el).toBeTruthy();

    fireEvent(
      el,
      new CustomEvent("_change", {
        detail: { name: component.name, value: "yellow" },
      }),
    );
    expect(onChangeMock).toHaveBeenCalled();
  }));

  describe("writeValue", () => {
    it("should set value attribute when writeValue is called with a value", () => {
      const dropdownComponent = fixture.debugElement.query(By.css("goab-dropdown")).componentInstance;
      const dropdownElement = fixture.debugElement.query(By.css("goa-dropdown")).nativeElement;

      dropdownComponent.writeValue("red");
      expect(dropdownElement.getAttribute("value")).toBe("red");

      dropdownComponent.writeValue("blue");
      expect(dropdownElement.getAttribute("value")).toBe("blue");
    });

    it("should set value attribute to empty string when writeValue is called with null", () => {
      const dropdownComponent = fixture.debugElement.query(By.css("goab-dropdown")).componentInstance;
      const dropdownElement = fixture.debugElement.query(By.css("goa-dropdown")).nativeElement;

      // First set a value
      dropdownComponent.writeValue("red");
      expect(dropdownElement.getAttribute("value")).toBe("red");

      // Then clear it
      dropdownComponent.writeValue(null);
      expect(dropdownElement.getAttribute("value")).toBe("");
    });

    it("should update component value property", () => {
      const dropdownComponent = fixture.debugElement.query(By.css("goab-dropdown")).componentInstance;

      dropdownComponent.writeValue("yellow");
      expect(dropdownComponent.value).toBe("yellow");

      dropdownComponent.writeValue(null);
      expect(dropdownComponent.value).toBe(null);
    });
  });

  describe("_onChange", () => {
    it("should update component value when user selects an option", () => {
      const dropdownComponent = fixture.debugElement.query(By.css("goab-dropdown")).componentInstance;
      const dropdownElement = fixture.debugElement.query(By.css("goa-dropdown")).nativeElement;

      fireEvent(
        dropdownElement,
        new CustomEvent("_change", {
          detail: { name: component.name, value: "yellow" },
        }),
      );

      expect(dropdownComponent.value).toBe("yellow");
    });

    it("should update value to null when cleared", () => {
      const dropdownComponent = fixture.debugElement.query(By.css("goab-dropdown")).componentInstance;
      const dropdownElement = fixture.debugElement.query(By.css("goa-dropdown")).nativeElement;

      // Set initial value
      fireEvent(
        dropdownElement,
        new CustomEvent("_change", {
          detail: { name: component.name, value: "red" },
        }),
      );
      expect(dropdownComponent.value).toBe("red");

      // Clear value
      fireEvent(
        dropdownElement,
        new CustomEvent("_change", {
          detail: { name: component.name, value: "" },
        }),
      );
      expect(dropdownComponent.value).toBe(null);
    });
  });
});