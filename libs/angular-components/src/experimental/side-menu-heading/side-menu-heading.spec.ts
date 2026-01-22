import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabxSideMenuHeading } from "./side-menu-heading";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabxBadge } from "../badge/badge";

@Component({
  standalone: true,
  imports: [GoabxSideMenuHeading, GoabxBadge],
  template: `
  <goabx-side-menu-heading icon="home" testId="foo" [meta]="meta">Heading
    <ng-template #meta><goabx-badge type="dark" content="details"></goabx-badge></ng-template>
  </goabx-side-menu-heading>
  `,
})
class TestSideMenuHeadingComponent {
  /** do nothing **/
}

describe("GoABSideMenuHeading", () => {
  let fixture: ComponentFixture<TestSideMenuHeadingComponent>;
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabxSideMenuHeading, GoabxBadge, TestSideMenuHeadingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TestSideMenuHeadingComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-side-menu-heading");
    expect(el?.getAttribute("icon")).toBe("home");
    expect(el?.getAttribute("testid")).toBe("foo");
    expect(el?.textContent).toContain("Heading");
    expect(el?.querySelector("[slot='meta']")?.innerHTML).toContain("details");
  })
})
