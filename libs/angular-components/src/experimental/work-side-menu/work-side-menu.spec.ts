import { ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";
import { GoabxWorkSideMenu } from "./work-side-menu";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabxWorkSideMenu],
  template: `
    <goabx-work-side-menu
      [open]="open"
      [heading]="heading"
      [url]="url"
      [userName]="userName"
      [userSecondaryText]="userSecondaryText"
      [testId]="testId"
      [primaryContent]="primaryTemplate"
      [secondaryContent]="secondaryTemplate"
      [accountContent]="accountTemplate"
    >
    </goabx-work-side-menu>
    <ng-template #primaryTemplate>
      <div>Primary content</div>
    </ng-template>
    <ng-template #secondaryTemplate>
      <div>Secondary content</div>
    </ng-template>
    <ng-template #accountTemplate>
      <div>Account content</div>
    </ng-template>
  `,
})
class TestWorkSideMenuComponent {
  open = true;
  heading = "Test heading";
  url = "/test";
  userName = "Test User";
  userSecondaryText = "test@example.com";
  testId = "test-id";
}
describe("GoabxBWorkSideMenu", () => {
  let fixture: ComponentFixture<TestWorkSideMenuComponent>;
  let component: TestWorkSideMenuComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestWorkSideMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWorkSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick(); // Wait for setTimeout in ngOnInit
    fixture.detectChanges();
  }));

  it("should render and set the props correctly", () => {
    const menuElement = fixture.debugElement.query(
      By.css("goa-work-side-menu"),
    ).nativeElement;
    expect(menuElement.getAttribute("heading")).toBe("Test heading");
    expect(menuElement.getAttribute("url")).toBe("/test");
    expect(menuElement.getAttribute("user-name")).toBe("Test User");
    expect(menuElement.getAttribute("user-secondary-text")).toBe("test@example.com");
    expect(menuElement.getAttribute("testId")).toBe("test-id");
  });
});
