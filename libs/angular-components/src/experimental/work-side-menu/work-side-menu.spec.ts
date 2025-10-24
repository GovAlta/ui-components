import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabxWorkSideMenu } from "./work-side-menu";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabxWorkSideMenu],
  template: `
    <goabx-work-side-menu
      [heading]="heading"
      [url]="url"
      [userName]="userName"
      [userSecondaryText]="userSecondaryText"
      [testId]="testId"
    >
    </goabx-work-side-menu>
  `,
})
class TestWorkSideMenuComponent {
  heading = "Test heading;";
  url = "/test";
  userName = "Test User";
  userSecondaryText = "test@example.com";
  testId = "test-id";
}
describe("GoabxBWorkSideMenu", () => {
  let fixture: ComponentFixture<TestWorkSideMenuComponent>;
  let component: TestWorkSideMenuComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWorkSideMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWorkSideMenuComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.debugElement.query(By.css("goa-work-side-menu")).nativeElement;

    expect(el?.getAttribute("heading")).toBe(component.heading);
    expect(el?.getAttribute("url")).toBe(component.url);
    expect(el?.getAttribute("user-name")).toBe(component.userName);
    expect(el?.getAttribute("user-secondary-text")).toBe(component.userSecondaryText);
  });
});
