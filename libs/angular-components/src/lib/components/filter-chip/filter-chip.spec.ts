import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabChipTheme, Spacing } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";
import { GoabFilterChip } from "./filter-chip";

@Component({
  template: `
    <goab-filter-chip
      [error]="error"
      [iconTheme]="iconTheme"
      [content]="content"
      [testId]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
      (onClick)="onClick()"
    >
    </goab-filter-chip>
  `,
})
class TestFilterChipComponent {
  error?: boolean;
  content?: string;
  iconTheme?: GoabChipTheme;
  testId?: string;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;

  onClick() {
    /* do nothing */
  }
}

describe("GoabFilterChip", () => {
  let fixture: ComponentFixture<TestFilterChipComponent>;
  let component: TestFilterChipComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabFilterChip],
      declarations: [TestFilterChipComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestFilterChipComponent);
    component = fixture.componentInstance;

    component.error = true;
    component.content = "some chip";
    component.testId = "chip-test";
    component.iconTheme = "filled";
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";
    fixture.detectChanges();
  });

  it("should render properties", () => {
    const chipElement = fixture.debugElement.query(By.css("goa-filter-chip")).nativeElement;
    expect(chipElement.getAttribute("error")).toBe(`${component.error}`);
    expect(chipElement.getAttribute("content")).toBe(component.content);
    expect(chipElement.getAttribute("icontheme")).toBe(`${component.iconTheme}`);
    expect(chipElement.getAttribute("testid")).toBe(component.testId);
    expect(chipElement.getAttribute("mt")).toBe(component.mt);
    expect(chipElement.getAttribute("mr")).toBe(component.mr);
    expect(chipElement.getAttribute("mb")).toBe(component.mb);
    expect(chipElement.getAttribute("ml")).toBe(component.ml);
  });

  it("should allow to handle delete event", async () => {
    const onClick = jest.spyOn(component, "onClick");
    const chipElement = fixture.debugElement.query(By.css("goa-filter-chip")).nativeElement;
    fireEvent(chipElement, new CustomEvent("_click"));

    expect(onClick).toHaveBeenCalled();
  });
});
