import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabxWorkSideMenuGroup } from "./work-side-menu-group";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabxWorkSideMenuGroup],
  template: `
    <goabx-work-side-menu-group [heading]="heading" [icon]="icon" [testId]="testId">
    </goabx-work-side-menu-group>
  `,
})
class TestWorkSideMenuGroupComponent {
  heading = "Test heading";
  icon = "star";
  testId = "test-id";
}

describe("GoabxWorkSideMenuGroup", () => {
  let fixture: ComponentFixture<TestWorkSideMenuGroupComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestWorkSideMenuGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWorkSideMenuGroupComponent);

    fixture.detectChanges();
    tick(); // Wait for setTimeout in ngOnInit
    fixture.detectChanges();
  }));

  it("should render and set the props correctly", () => {
    const menuGroupElement = fixture.debugElement.query(
      By.css("goa-work-side-menu-group"),
    ).nativeElement;
    expect(menuGroupElement.getAttribute("heading")).toBe("Test heading");
    expect(menuGroupElement.getAttribute("icon")).toBe("star");
    expect(menuGroupElement.getAttribute("testid")).toBe("test-id");
  });
});
