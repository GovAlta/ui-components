import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabAppFooter } from "../footer/footer";
import { By } from "@angular/platform-browser";

@Component({
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabAppFooter],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TestFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestFooterComponent);
    component = fixture.componentInstance;
    component.maxContentWidth = "100%";

    fixture.detectChanges();
  });

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
