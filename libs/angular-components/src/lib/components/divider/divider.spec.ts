import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabDivider } from "./divider";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Spacing } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <goab-divider
      [testId]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    ></goab-divider>
  `,
})
class TestDividerComponent {
  testId?: string;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
}

describe("GoABDivider", () => {
  let fixture: ComponentFixture<TestDividerComponent>;
  let component: TestDividerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabDivider],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TestDividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDividerComponent);
    component = fixture.componentInstance;

    // Assign values
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";
    component.testId = "divider-testid";

    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.debugElement.query(By.css("goa-divider")).nativeElement;
    expect(el?.getAttribute("data-testid")).toBe(component.testId);
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });
});
