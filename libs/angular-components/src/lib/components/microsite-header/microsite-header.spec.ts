import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabMicrositeHeader } from "./microsite-header";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  standalone: true,
  imports: [GoabMicrositeHeader],
  template: `
    <goab-microsite-header
      [type]="type"
      [version]="version"
      [feedbackUrl]="feedbackUrl"
      [maxContentWidth]="maxContentWidth"
      [feedbackUrlTarget]="feedbackUrlTarget"
      [headerUrlTarget]="headerUrlTarget"
      [testId]="testId"
    >
    </goab-microsite-header>
  `,
})
class TestMicrositeHeaderComponent {
  type = "alpha";
  version = "v1.2.3";
  feedbackUrl = "https://example.com";
  maxContentWidth = "100%";
  feedbackUrlTarget = "_blank";
  headerUrlTarget = "_self";
  testId = "test-id";
}

describe("GoABMicrositeHeader", () => {
  let fixture: ComponentFixture<TestMicrositeHeaderComponent>;
  let component: TestMicrositeHeaderComponent;
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabMicrositeHeader, TestMicrositeHeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(TestMicrositeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));
  it("should render properties", () => {
    const el = document.querySelector("goa-microsite-header");
    expect(el?.getAttribute("type")).toEqual("alpha");
    expect(el?.getAttribute("version")).toEqual("v1.2.3");
    expect(el?.getAttribute("feedbackurl")).toEqual("https://example.com");
    expect(el?.getAttribute("maxcontentwidth")).toEqual("100%");
    expect(el?.getAttribute("feedbackurltarget")).toEqual("_blank");
    expect(el?.getAttribute("headerurltarget")).toEqual("_self");
    expect(el?.getAttribute("data-testid")).toEqual;
  });
});
