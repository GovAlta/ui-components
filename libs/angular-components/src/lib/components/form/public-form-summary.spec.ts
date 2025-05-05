import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabPublicFormSummary } from "./public-form-summary";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <goab-public-form-summary
      [heading]="heading"
    >
      <div data-testid="content">Test content</div>
    </goab-public-form-summary>
  `,
})
class TestPublicFormSummaryComponent {
  heading = "Test Summary Heading";
}

describe("GoabPublicFormSummary", () => {
  let fixture: ComponentFixture<TestPublicFormSummaryComponent>;
  let component: TestPublicFormSummaryComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestPublicFormSummaryComponent],
      imports: [GoabPublicFormSummary],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPublicFormSummaryComponent);
    component = fixture.componentInstance;
  });

  it("should render with properties", () => {
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-form-summary")).nativeElement;

    expect(el?.getAttribute("heading")).toBe(component.heading);

    // Content is rendered
    expect(el?.querySelector("[data-testid='content']")).toBeTruthy();
  });

  it("should have default values", () => {
    const summary = new GoabPublicFormSummary();
    expect(summary.heading).toBeUndefined();
  });
});