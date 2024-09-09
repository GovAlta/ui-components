import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabDetails } from "./details";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Spacing } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <goab-details
      [heading]="heading"
      [open]="open"
      [testId]="testId"
      maxWidth="480px"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    >
      The content
    </goab-details>
  `,
})
class TestDetailsComponent {
  heading?: string;
  testId?: string;
  open?: boolean;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
}

describe("GoABDetails", () => {
  let fixture: ComponentFixture<TestDetailsComponent>;
  let component: TestDetailsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabDetails],
      declarations: [TestDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDetailsComponent);
    component = fixture.componentInstance;

    // Assign values
    component.heading = "The heading";
    component.open = true;
    component.testId = "details-test-id";
    component.mt = "l";
    component.mb = "s";
    component.mr = "xl";
    component.ml = "2xl";

    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.debugElement.query(By.css("goa-details")).nativeElement;
    expect(el?.getAttribute("heading")).toBe(component.heading);
    expect(el?.getAttribute("open")).toBe(`${component.open}`);
    expect(el?.getAttribute("mt")).toBe(component.mt);
    expect(el?.getAttribute("mb")).toBe(component.mb);
    expect(el?.getAttribute("mr")).toBe(component.mr);
    expect(el?.getAttribute("ml")).toBe(component.ml);
    expect(el?.getAttribute("data-testid")).toBe(component.testId);
    expect(el?.innerHTML).toContain("The content");
    expect(el?.getAttribute("maxwidth")).toBe("480px");
  });
});
