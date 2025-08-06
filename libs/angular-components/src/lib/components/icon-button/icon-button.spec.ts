import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabIconButton } from "./icon-button";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoabIconButtonVariant,
  GoabIconSize,
  GoabIconType,
  Spacing,
} from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";

@Component({
  standalone: true,
  imports: [GoabIconButton],
  template: `
    <goab-icon-button
      [icon]="icon"
      [disabled]="disabled"
      [variant]="variant"
      [size]="size"
      [title]="title"
      [ariaLabel]="ariaLabel"
      [testId]="testId"
      [mt]="mt"
      [mr]="mr"
      [mb]="mb"
      [ml]="ml"
      (onClick)="onClick()"
    >
      Submit
    </goab-icon-button>
  `,
})
class TestIconButtonComponent {
  icon = "information" as GoabIconType;
  disabled?: boolean;
  size?: GoabIconSize;
  variant?: GoabIconButtonVariant;
  title?: string;
  testId?: string;
  ariaLabel?: string;
  mt?: Spacing;
  mr?: Spacing;
  ml?: Spacing;
  mb?: Spacing;

  onClick() {
    /** do nothing **/
  }
}

describe("GoABIconButton", () => {
  let fixture: ComponentFixture<TestIconButtonComponent>;
  let component: TestIconButtonComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabIconButton, TestIconButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestIconButtonComponent);
    component = fixture.componentInstance;

    component.disabled = true;
    component.size = "small";
    component.variant = "color";
    component.title = "Information";
    component.testId = "foo";
    component.ariaLabel = "Information button";
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.debugElement.query(By.css("goa-icon-button")).nativeElement;
    expect(el?.getAttribute("icon")).toBe(component.icon);
    expect(el?.getAttribute("size")).toBe(component.size);
    expect(el?.getAttribute("variant")).toBe(component.variant);
    expect(el?.getAttribute("title")).toBe(component.title);
    expect(el?.getAttribute("testid")).toBe(component.testId);
    expect(el?.getAttribute("arialabel")).toBe(component.ariaLabel);
    expect(el?.getAttribute("mt")).toBe(component.mt);
    expect(el?.getAttribute("mb")).toBe(component.mb);
    expect(el?.getAttribute("mr")).toBe(component.mr);
    expect(el?.getAttribute("ml")).toBe(component.ml);
  });

  it("should dispatch onClick event", () => {
    const onClick = jest.spyOn(component, "onClick");
    const el = fixture.debugElement.query(By.css("goa-icon-button")).nativeElement;

    fireEvent(el, new CustomEvent("_click"));

    expect(onClick).toBeCalledTimes(1);
  });
});
