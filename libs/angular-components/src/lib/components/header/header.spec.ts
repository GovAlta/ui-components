import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabAppHeader } from "./header";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabAppHeader],
  template: `
    <goab-app-header
      [heading]="heading"
      [url]="url"
      [fullMenuBreakpoint]="fullMenuBreakpoint"
      [maxContentWidth]="maxContentWidth"
      [testId]="testId"
    >
      <p>Children content</p>
    </goab-app-header>
  `,
})
class TestAppHeaderComponent {
  heading?: string;
  url?: string;
  fullMenuBreakpoint?: number;
  testId?: string;
  maxContentWidth?: string;
}

describe("GoABAppHeader", () => {
  let fixture: ComponentFixture<TestAppHeaderComponent>;
  let component: TestAppHeaderComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabAppHeader, TestAppHeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestAppHeaderComponent);
    component = fixture.componentInstance;

    component.heading = "App Heading";
    component.url = "https://example.com";
    component.fullMenuBreakpoint = 1400;
    component.maxContentWidth = "1600px";
    component.testId = "foo";

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render successfully", () => {
    const el = fixture.debugElement.query(By.css("goa-app-header")).nativeElement;

    expect(el?.getAttribute("heading")).toBe(component.heading);
    expect(el?.getAttribute("url")).toBe(component.url);
    expect(el?.getAttribute("maxcontentwidth")).toBe(component.maxContentWidth);
    expect(el?.getAttribute("fullmenubreakpoint")).toBe(
      `${component.fullMenuBreakpoint}`,
    );
    expect(el?.getAttribute("testid")).toBe(component.testId);
    expect(el?.innerHTML).toContain("Children content");
  });
});
