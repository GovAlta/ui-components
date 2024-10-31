import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoabIconSize,
  GoabIconTheme,
  GoabIconType,
  Spacing,
} from "@abgov/ui-components-common";
import { GoabIcon } from "../icon/icon";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <goab-icon
      [type]="type"
      [size]="size"
      [theme]="theme"
      [inverted]="inverted"
      [fillColor]="fillColor"
      [opacity]="opacity"
      [title]="title"
      [ariaLabel]="ariaLabel"
      [testId]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    ></goab-icon>
  `,
})
class TestIconComponent {
  type = "information" as GoabIconType;
  size?: GoabIconSize;
  theme?: GoabIconTheme;
  inverted?: boolean;
  fillColor?: string;
  opacity?: number;
  title?: string;
  ariaLabel?: string;
  testId?: string;
  mt?: Spacing;
  mb?: Spacing;
  mr?: Spacing;
  ml?: Spacing;
}

describe("GoABIcon", () => {
  let fixture: ComponentFixture<TestIconComponent>;
  let component: TestIconComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestIconComponent],
      imports: [GoabIcon],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestIconComponent);
    component = fixture.componentInstance;

    component.size = "large";
    component.theme = "filled";
    component.inverted = true;
    component.fillColor = "blue";
    component.opacity = 0.5;
    component.title = "foo";
    component.ariaLabel = "bar";
    component.testId = "foo";
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";
    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.debugElement.query(By.css("goa-icon")).nativeElement;

    expect(el?.getAttribute("type")).toBe(component.type);
    expect(el?.getAttribute("size")).toBe(component.size);
    expect(el?.getAttribute("theme")).toBe(component.theme);
    expect(el?.getAttribute("inverted")).toBe(`${component.inverted}`);
    expect(el?.getAttribute("fillcolor")).toBe(component.fillColor);
    expect(el?.getAttribute("opacity")).toBe(`${component.opacity}`);
    expect(el?.getAttribute("title")).toBe(component.title);
    expect(el?.getAttribute("arialabel")).toBe(component.ariaLabel);
    expect(el?.getAttribute("testid")).toBe(component.testId);
    expect(el?.getAttribute("mt")).toBe(component.mt);
    expect(el?.getAttribute("mb")).toBe(component.mb);
    expect(el?.getAttribute("mr")).toBe(component.mr);
    expect(el?.getAttribute("ml")).toBe(component.ml);
  });
});
