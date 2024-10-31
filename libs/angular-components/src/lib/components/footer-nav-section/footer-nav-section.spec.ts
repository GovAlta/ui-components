import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabAppFooterNavSection } from "./footer-nav-section";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <goab-app-footer-nav-section
      [testId]="testId"
      [heading]="heading"
      [maxColumnCount]="maxColumnCount"
      slot="nav"
    >
      <p>Testing footer</p>
    </goab-app-footer-nav-section>
  `,
})
class TestFooterNavSectionComponent {
  testId?: string;
  heading?: string;
  maxColumnCount?: number;
}

describe("GoABAppFooterNavSection", () => {
  let fixture: ComponentFixture<TestFooterNavSectionComponent>;
  let component: TestFooterNavSectionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestFooterNavSectionComponent],
      imports: [GoabAppFooterNavSection],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestFooterNavSectionComponent);
    component = fixture.componentInstance;

    component.testId = "foo";
    component.heading = "Footer heading";
    component.maxColumnCount = 3;

    fixture.detectChanges();
  });

  it("should render properties", () => {
    const el = fixture.debugElement.query(
      By.css("goa-app-footer-nav-section"),
    ).nativeElement;
    expect(el?.getAttribute("testid")).toBe(component.testId);
    expect(el?.getAttribute("heading")).toBe(component.heading);
    expect(el?.getAttribute("maxcolumncount")).toBe(`${component.maxColumnCount}`);
  });
});
