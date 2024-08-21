import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabButton } from "./button";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabButtonSize, GoabButtonVariant, GoabIconType, Spacing, GoabButtonType } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";

@Component({
  template: `
    <goab-button
      [type]="type"
      [size]="size"
      [variant]="variant"
      [disabled]="disabled"
      [leadingIcon]="leadingIcon"
      [trailingIcon]="trailingIcon"
      [testId]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
      (onClick)="onClick()">
      {{buttonText}}
    </goab-button>
  `
})
class TestButtonComponent{
  type?: GoabButtonType;
  size?: GoabButtonSize;
  variant?: GoabButtonVariant;
  disabled?: boolean;
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  testId?: string;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
  buttonText?: string;

  onClick() {
    /* do nothing */
  }

}

describe("GoABButton", () => {
  let fixture: ComponentFixture<TestButtonComponent>;
  let component: TestButtonComponent;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [GoabButton],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TestButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestButtonComponent);
    component = fixture.componentInstance;
    component.buttonText = "Click me";
    component.type = "primary";
    component.size = "compact";
    component.variant = "destructive";
    component.leadingIcon = "car";
    component.trailingIcon = "bag";
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";
    fixture.detectChanges();
  });

  it("should render the properties", () => {
    const buttonElement = fixture.debugElement.query(By.css("goa-button")).nativeElement;
    expect(buttonElement.getAttribute("type")).toBe("primary");
    expect(buttonElement.getAttribute("size")).toBe("compact");
    expect(buttonElement.getAttribute("variant")).toBe("destructive");
    expect(buttonElement.getAttribute("leadingicon")).toBe("car");
    expect(buttonElement.getAttribute("trailingicon")).toBe("bag");
    expect(buttonElement.getAttribute("mt")).toBe("s");
    expect(buttonElement.getAttribute("mr")).toBe("m");
    expect(buttonElement.getAttribute("mb")).toBe("l");
    expect(buttonElement.getAttribute("ml")).toBe("xl");
    // it should render the content
    expect(buttonElement.textContent).toContain("Click me");
  });

  it("should respond to click event", async() => {
    const onClick = jest.spyOn(component, "onClick");
    const buttonElement = fixture.debugElement.query(By.css("goa-button")).nativeElement;

    fireEvent(buttonElement, new CustomEvent("_click"));
    expect(onClick).toHaveBeenCalled();
  })
})
