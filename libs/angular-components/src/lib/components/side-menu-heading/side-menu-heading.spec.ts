import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABSideMenuHeading } from "./side-menu-heading";
import { Component } from "@angular/core";

@Component({
  template: `
  <goab-side-menu-heading icon="home" testId="foo">Heading</goab-side-menu-heading>
  `
})
class TestSideMenuHeadingComponent {
  /** do nothing **/
}

describe("GoABSideMenuHeading", () => {
  let fixture: ComponentFixture<TestSideMenuHeadingComponent>;
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [TestSideMenuHeadingComponent],
      imports: [GoABSideMenuHeading]
    }).compileComponents();

    fixture = TestBed.createComponent(TestSideMenuHeadingComponent);
    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-side-menu-heading");
    expect(el?.getAttribute("icon")).toBe("home");
    expect(el?.getAttribute("data-testid")).toBe("foo");
    expect(el?.textContent).toBe("Heading");
  })
})
