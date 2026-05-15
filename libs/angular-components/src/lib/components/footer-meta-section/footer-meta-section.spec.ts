import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabAppFooterMetaSection } from "./footer-meta-section";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabAppFooterMetaSection],
  template: `
    <goab-app-footer-meta-section testId="foo" slot="meta">
      <a href="#">Home</a>
    </goab-app-footer-meta-section>
  `,
})
class TestFooterMetaSectionComponent {
  /** do nothing **/
}

describe("GoABFooterMetaSection", () => {
  let fixture: ComponentFixture<TestFooterMetaSectionComponent>;
  let component: TestFooterMetaSectionComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabAppFooterMetaSection, TestFooterMetaSectionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestFooterMetaSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.debugElement.query(
      By.css("goa-app-footer-meta-section"),
    ).nativeElement;
    expect(el?.getAttribute("testid")).toBe("foo");
    expect(el?.querySelector("a")).toBeTruthy();
    expect(el?.innerHTML).toContain("Home");
  });
});
