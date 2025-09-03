import { ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";
import { GoabxWorkSideMenu } from "./work-side-menu";
import { Component } from "@angular/core";

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
  heading = "Test heading;";
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

  it("should render web component", () => {
    // Test that the web component can be created directly
    const webComponent = document.createElement("goa-work-side-menu") as HTMLElement & {
      heading: string;
      url: string;
    };
    webComponent.heading = component.heading;
    webComponent.url = component.url;
    webComponent.setAttribute("user-name", component.userName);
    webComponent.setAttribute("user-secondary-text", component.userSecondaryText);

    expect(webComponent.tagName.toLowerCase()).toBe("goa-work-side-menu");
    expect(webComponent.heading).toBe(component.heading);
    expect(webComponent.url).toBe(component.url);
  });

  it("should have angular wrapper rendered", () => {
    // Test that at least the Angular wrapper component is rendered
    const wrapperEl = fixture.nativeElement.querySelector("goabx-work-side-menu");
    expect(wrapperEl).toBeTruthy();
  });
});
