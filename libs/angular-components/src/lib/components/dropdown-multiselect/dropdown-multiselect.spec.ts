import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabDropdownMultiselect } from "./dropdown-multiselect";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { fireEvent } from "@testing-library/dom";
import { By } from "@angular/platform-browser";
import { Spacing, GoabCheckboxSize, GoabPopoverPosition } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabDropdownMultiselect],
  template: `
    <goab-dropdown-multiselect
      [name]="name"
      [value]="value"
      [disabled]="disabled"
      [error]="error"
      [testId]="testId"
      [maxWidth]="maxWidth"
      [size]="size"
      [placeholder]="placeholder"
      [popoverPosition]="popoverPosition"
      [popoverMaxWidth]="popoverMaxWidth"
      [popoverMinWidth]="popoverMinWidth"
      [popoverPadded]="popoverPadded"
      [popoverWidth]="popoverWidth"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
      (onChange)="onChange($event)"
      (onPopoverOpen)="onPopoverOpen()"
      (onPopoverClose)="onPopoverClose()"
    >
    </goab-dropdown-multiselect>
  `,
})
class TestDropdownMultiselectComponent {
  name = "options";
  value?: string[];
  disabled?: boolean;
  error?: boolean;
  testId?: string;
  maxWidth?: string;
  size?: GoabCheckboxSize;
  placeholder?: string;
  popoverPosition?: GoabPopoverPosition;
  popoverMaxWidth?: string;
  popoverMinWidth?: string;
  popoverPadded?: boolean;
  popoverWidth?: string;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;

  onChange(_detail: unknown) {
    /* do nothing */
  }

  onPopoverOpen() {
    /* do nothing */
  }

  onPopoverClose() {
    /* do nothing */
  }
}

describe("GoabDropdownMultiselect", () => {
  let fixture: ComponentFixture<TestDropdownMultiselectComponent>;
  let component: TestDropdownMultiselectComponent;

  beforeEach(
    fakeAsync(() => {
      TestBed.configureTestingModule({
        imports: [TestDropdownMultiselectComponent, GoabDropdownMultiselect],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(TestDropdownMultiselectComponent);
      component = fixture.componentInstance;

      component.name = "options";
      component.value = ["a"];
      component.disabled = false;
      component.error = false;
      component.testId = "test-multiselect";
      component.maxWidth = "400px";
      component.size = "compact";
      component.placeholder = "Pick options";
      component.popoverPosition = "above";
      component.popoverMaxWidth = "500px";
      component.mt = "s";
      component.mr = "m";
      component.mb = "l";
      component.ml = "xl";
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    }),
  );

  it("should render with properties bound to attributes", () => {
    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;

    expect(el.getAttribute("name")).toBe("options");
    expect(el.getAttribute("testid")).toBe("test-multiselect");
    expect(el.getAttribute("maxwidth")).toBe("400px");
    expect(el.getAttribute("size")).toBe("compact");
    expect(el.getAttribute("placeholder")).toBe("Pick options");
    expect(el.getAttribute("popoverposition")).toBe("above");
    expect(el.getAttribute("popovermaxwidth")).toBe("500px");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should bind disabled as 'true' string when true", fakeAsync(() => {
    component.disabled = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;
    expect(el.getAttribute("disabled")).toBe("true");
  }));

  it("should not set disabled when false", () => {
    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;
    expect(el.getAttribute("disabled")).toBeNull();
  });

  it("should bind error as 'true' string when true", fakeAsync(() => {
    component.error = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;
    expect(el.getAttribute("error")).toBe("true");
  }));

  it("should handle onChange event", () => {
    const onChange = jest.spyOn(component, "onChange");

    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;

    fireEvent(
      el,
      new CustomEvent("_change", {
        detail: { name: "options", value: ["a", "b"], labels: ["Apple", "Banana"] },
      }),
    );

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "options",
        value: ["a", "b"],
        labels: ["Apple", "Banana"],
      }),
    );
  });

  it("should handle onPopoverOpen event", () => {
    const onPopoverOpen = jest.spyOn(component, "onPopoverOpen");

    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;

    fireEvent(el, new CustomEvent("_popoveropen"));

    expect(onPopoverOpen).toHaveBeenCalled();
  });

  it("should handle onPopoverClose event", () => {
    const onPopoverClose = jest.spyOn(component, "onPopoverClose");

    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;

    fireEvent(el, new CustomEvent("_popoverclose"));

    expect(onPopoverClose).toHaveBeenCalled();
  });

  it("should set popoverpadded to 'false' when popoverPadded=false", fakeAsync(() => {
    component.popoverPadded = false;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;
    expect(el.getAttribute("popoverpadded")).toBe("false");
  }));

  it("should set popoverpadded to 'true' when popoverPadded=true", fakeAsync(() => {
    component.popoverPadded = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css("goa-dropdown-multiselect"),
    ).nativeElement;
    expect(el.getAttribute("popoverpadded")).toBe("true");
  }));
});
