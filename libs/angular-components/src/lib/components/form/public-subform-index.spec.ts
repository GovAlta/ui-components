import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabPublicSubformIndex } from "./public-subform-index";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { Spacing } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabPublicSubformIndex],
  template: `
    <goab-public-subform-index
      [heading]="heading"
      [sectionTitle]="sectionTitle"
      [actionButtonText]="actionButtonText"
      [buttonVisibility]="buttonVisibility"
      [mt]="mt"
      [mr]="mr"
      [mb]="mb"
      [ml]="ml"
    >
      <div data-testid="content">Test content</div>
    </goab-public-subform-index>
  `,
})
class TestPublicSubformIndexComponent {
  heading = "Test Heading";
  sectionTitle = "Test Section Title";
  actionButtonText = "Add Item";
  buttonVisibility: "visible" | "hidden" = "visible";
  mt = "s" as Spacing;
  mr = "m" as Spacing;
  mb = "l" as Spacing;
  ml = "xl" as Spacing;
}

describe("GoabPublicSubformIndex", () => {
  let fixture: ComponentFixture<TestPublicSubformIndexComponent>;
  let component: TestPublicSubformIndexComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabPublicSubformIndex, TestPublicSubformIndexComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPublicSubformIndexComponent);
    component = fixture.componentInstance;
  });

  it("should render with properties", () => {
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-subform-index")).nativeElement;

    expect(el?.getAttribute("heading")).toBe(component.heading);
    expect(el?.getAttribute("section-title")).toBe(component.sectionTitle);
    expect(el?.getAttribute("action-button-text")).toBe(component.actionButtonText);
    expect(el?.getAttribute("button-visibility")).toBe(component.buttonVisibility);
    expect(el?.getAttribute("mt")).toBe(component.mt);
    expect(el?.getAttribute("mr")).toBe(component.mr);
    expect(el?.getAttribute("mb")).toBe(component.mb);
    expect(el?.getAttribute("ml")).toBe(component.ml);

    // Content is rendered
    expect(el?.querySelector("[data-testid='content']")).toBeTruthy();
  });

  it("should have default values", () => {
    const subformIndex = new GoabPublicSubformIndex();
    expect(subformIndex.heading).toBe("");
    expect(subformIndex.sectionTitle).toBe("");
    expect(subformIndex.actionButtonText).toBe("");
    expect(subformIndex.buttonVisibility).toBe("hidden");
  });

  it("should have the correct slot attribute on host element", () => {
    fixture.detectChanges();

    const hostElement = fixture.debugElement.query(By.css("goab-public-subform-index")).nativeElement;
    expect(hostElement.getAttribute("slot")).toBe("subform-index");
  });

  it("should pass through different property values", () => {
    component.heading = "Updated Heading";
    component.sectionTitle = "Updated Section";
    component.actionButtonText = "Add Another";
    component.buttonVisibility = "hidden";
    component.mt = "none";
    component.mr = "xs";
    component.mb = "2xl";
    component.ml = "3xl";

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-subform-index")).nativeElement;

    expect(el?.getAttribute("heading")).toBe("Updated Heading");
    expect(el?.getAttribute("section-title")).toBe("Updated Section");
    expect(el?.getAttribute("action-button-text")).toBe("Add Another");
    expect(el?.getAttribute("button-visibility")).toBe("hidden");
    expect(el?.getAttribute("mt")).toBe("none");
    expect(el?.getAttribute("mr")).toBe("xs");
    expect(el?.getAttribute("mb")).toBe("2xl");
    expect(el?.getAttribute("ml")).toBe("3xl");
  });
});
