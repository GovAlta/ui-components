import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabSideMenuGroup } from "./side-menu-group";
import { Component } from "@angular/core";

@Component({
  template: `
    <goab-side-menu-group [heading]="heading" [testId]="testId">
      <a href="#">Link</a>
    </goab-side-menu-group>
  `,
})
class TestSideMenuGroupComponent {
  heading = "some header";
  testId = "foo";
}

describe("GoABSideMenuGroup", () => {
  let fixture: ComponentFixture<TestSideMenuGroupComponent>;
  let component: TestSideMenuGroupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestSideMenuGroupComponent],
      imports: [GoabSideMenuGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(TestSideMenuGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-side-menu-group");
    expect(el?.getAttribute("heading")).toBe(component.heading);
    expect(el?.getAttribute("testid")).toBe(component.testId);
    expect(el?.querySelector("a")?.textContent).toContain("Link");
  });
});
