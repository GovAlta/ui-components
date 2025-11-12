import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabGrid } from "./grid";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Spacing } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabGrid],
  template: `
    <goab-grid
      [gap]="gap"
      [minChildWidth]="minChildWidth"
      [testId]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    >
      <p>Children content</p>
    </goab-grid>
  `,
})
class TestGridComponent {
  gap?: Spacing;
  minChildWidth = "100px";
  testId?: string;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
}

describe("GoABGrid", () => {
  let fixture: ComponentFixture<TestGridComponent>;
  let component: TestGridComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabGrid, TestGridComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestGridComponent);
    component = fixture.componentInstance;

    component.gap = "xs";
    component.mt = "l";
    component.mb = "m";
    component.mr = "xs";
    component.ml = "s";
    component.testId = "foo";

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render successfully", () => {
    const el = fixture.debugElement.query(By.css("goa-grid")).nativeElement;

    expect(el?.getAttribute("gap")).toBe(component.gap);
    expect(el?.getAttribute("minchildwidth")).toBe(component.minChildWidth);
    expect(el?.getAttribute("mt")).toBe(component.mt);
    expect(el?.getAttribute("mb")).toBe(component.mb);
    expect(el?.getAttribute("ml")).toBe(component.ml);
    expect(el?.getAttribute("mr")).toBe(component.mr);
    expect(el?.getAttribute("testid")).toBe(component.testId);
    expect(el?.innerHTML).toContain("Children content");
  });
});
