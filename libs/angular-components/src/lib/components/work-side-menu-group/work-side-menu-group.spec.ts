import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabWorkSideMenuGroup } from "./work-side-menu-group";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabWorkSideMenuGroup],
  template: `
    <goab-work-side-menu-group
      [heading]="heading"
      [icon]="icon"
      [testId]="testId"
      [open]="open"
    >
    </goab-work-side-menu-group>
  `,
})
class TestWorkSideMenuGroupComponent {
  heading?: string;
  icon?: string;
  testId?: string;
  open?: boolean;
}

describe("GoabWorkSideMenuGroup", () => {
  let fixture: ComponentFixture<TestWorkSideMenuGroupComponent>;
  let component: TestWorkSideMenuGroupComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestWorkSideMenuGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWorkSideMenuGroupComponent);
    component = fixture.componentInstance;
    component.heading = "Test heading";
    component.icon = "star";
    component.testId = "test-id";
    component.open = true;

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
    expect(menuGroupElement.hasAttribute("open")).toBe(true);
  });
});
