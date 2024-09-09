import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabButtonGroup } from "./button-group";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoabButtonGroupAlignment,
  GoabButtonGroupGap,
} from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";
import { GoabButton } from "../button/button";

@Component({
  template: `
    <goab-button-group
      [alignment]="alignment"
      [gap]="gap"
      [testId]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    >
      >
      <goab-button type="primary">Button 1</goab-button>
      <goab-button type="secondary">Button 2</goab-button>
      <goab-button type="tertiary">Button 3</goab-button>
    </goab-button-group>
  `,
})
class TestButtonGroupComponent {
  alignment?: GoabButtonGroupAlignment;
  gap?: GoabButtonGroupGap;
  testId?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
}

describe("GoABButtonGroup", () => {
  let fixture: ComponentFixture<TestButtonGroupComponent>;
  let component: TestButtonGroupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabButtonGroup, GoabButton],
      declarations: [TestButtonGroupComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestButtonGroupComponent);
    component = fixture.componentInstance;
    component.alignment = "start";
    component.gap = "compact";
    component.testId = "test-button-group";
    component.mt = "m";
    component.mb = "xl";
    component.ml = "s";
    component.mr = "l";
    fixture.detectChanges();
  });

  it("should render properties", () => {
    const buttonGroupElement = fixture.debugElement.query(
      By.css("goa-button-group"),
    ).nativeElement;
    expect(buttonGroupElement.getAttribute("alignment")).toBe(component.alignment);
    expect(buttonGroupElement.getAttribute("gap")).toBe(component.gap);
    expect(buttonGroupElement.getAttribute("data-testid")).toBe(component.testId);
    expect(buttonGroupElement.getAttribute("mt")).toBe(component.mt);
    expect(buttonGroupElement.getAttribute("mb")).toBe(component.mb);
    expect(buttonGroupElement.getAttribute("ml")).toBe(component.ml);
    expect(buttonGroupElement.getAttribute("mr")).toBe(component.mr);

    // Make sure it renders children
    const buttons = buttonGroupElement.querySelectorAll("goa-button");
    expect(buttons.length).toBe(3);
    expect(buttons[0].textContent).toBe("Button 1");
    expect(buttons[1].textContent).toBe("Button 2");
    expect(buttons[2].textContent).toBe("Button 3");
  });
});
