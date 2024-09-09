import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabSideMenuHeading } from "./side-menu-heading";
import { Component } from "@angular/core";
import { GoabBadge } from "../badge/badge";

@Component({
  template: `
  <goab-side-menu-heading icon="home" testId="foo" [meta]="meta">Heading
    <ng-template #meta><goab-badge type="dark" content="details"></goab-badge></ng-template>
  </goab-side-menu-heading>
  `,
})
class TestSideMenuHeadingComponent {
  /** do nothing **/
}

describe("GoABSideMenuHeading", () => {
  let fixture: ComponentFixture<TestSideMenuHeadingComponent>;
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [TestSideMenuHeadingComponent],
      imports: [GoabSideMenuHeading, GoabBadge]
    }).compileComponents();

    fixture = TestBed.createComponent(TestSideMenuHeadingComponent);
    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-side-menu-heading");
    expect(el?.getAttribute("icon")).toBe("home");
    expect(el?.getAttribute("data-testid")).toBe("foo");
    expect(el?.textContent).toContain("Heading");
    expect(el?.querySelector("[slot='meta']")?.innerHTML).toContain("details");
  })
})
