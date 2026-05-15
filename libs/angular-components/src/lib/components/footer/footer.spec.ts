import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabAppFooter } from "../footer/footer";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabAppFooter],
  template: ` <goab-app-footer [maxContentWidth]="maxContentWidth">
    <div slot="nav">This is the nav content</div>
    <div slot="meta">This is the meta content</div>
  </goab-app-footer>`,
})
class TestFooterComponent {
  maxContentWidth?: string;
}

describe("GoABFooter", () => {
  let fixture: ComponentFixture<TestFooterComponent>;
  let component: TestFooterComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabAppFooter, TestFooterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestFooterComponent);
    component = fixture.componentInstance;
    component.maxContentWidth = "100%";

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render and set the props correctly", () => {
    const footerElement = fixture.debugElement.query(
      By.css("goa-app-footer"),
    ).nativeElement;
    expect(footerElement.getAttribute("maxcontentwidth")).toBe("100%");
    const navContent = footerElement.querySelector("[slot='nav']");
    expect(navContent.textContent).toContain("This is the nav content");
    const metaContent = footerElement.querySelector("[slot='meta']");
    expect(metaContent.textContent).toContain("This is the meta content");
  });
});
