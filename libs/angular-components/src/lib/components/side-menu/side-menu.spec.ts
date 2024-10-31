import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabSideMenu } from "./side-menu";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  template: `
    <goab-side-menu testId="foo">
      <a href="#foo">Link</a>
    </goab-side-menu>
  `,
})
class TestSideMenuComponent {
  /** do nothing **/
}

describe("GoABSideMenu", () => {
  let fixture: ComponentFixture<TestSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestSideMenuComponent],
      imports: [GoabSideMenu],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestSideMenuComponent);

    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-side-menu");
    expect(el?.getAttribute("testid")).toBe("foo");
    expect(el?.querySelector("a")?.textContent).toBe("Link");
  });
});
