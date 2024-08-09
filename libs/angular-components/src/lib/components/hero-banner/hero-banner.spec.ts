import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABHeroBanner } from "./hero-banner";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <goab-hero-banner
      [heading]="heading"
      [backgroundUrl]="backgroundUrl"
      [backgroundColor]="backgroundColor"
      [textColor]="textColor"
      [minHeight]="minHeight"
      [maxContentWidth]="maxContentWidth"
      [testId]="testId"
    >
      <p>Children content</p>
    </goab-hero-banner>
  `,
})
class TestHeroBannerComponent {
  heading?: string;
  backgroundUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  minHeight?: string;
  maxContentWidth?: string;
  testId?: string;
}

describe("GoABHeroBanner", () => {
  let fixture: ComponentFixture<TestHeroBannerComponent>;
  let component: TestHeroBannerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHeroBannerComponent],
      imports: [GoABHeroBanner],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHeroBannerComponent);
    component = fixture.componentInstance;

    component.heading = "Upgrading our bitumen";
    component.backgroundUrl = "some-bg.png";
    component.backgroundColor = "#000";
    component.textColor = "#fff";
    component.minHeight = "500px";
    component.maxContentWidth = "500px";
    component.testId = "foo";

    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.debugElement.query(By.css("goa-hero-banner")).nativeElement;

    expect(el?.getAttribute("heading")).toBe(component.heading);
    expect(el?.getAttribute("backgroundurl")).toBe(component.backgroundUrl);
    expect(el?.getAttribute("backgroundcolor")).toBe(component.backgroundColor);
    expect(el?.getAttribute("textcolor")).toBe(component.textColor);
    expect(el?.getAttribute("minheight")).toBe(component.minHeight);
    expect(el?.getAttribute("maxcontentwidth")).toBe(component.maxContentWidth);
    expect(el?.getAttribute("data-testid")).toBe(component.testId);
    expect(el?.innerHTML).toContain("Children content");
  });
});
