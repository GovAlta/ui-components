import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabWorkSideMenu } from "./work-side-menu";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <goab-work-side-menu
      [title]="title"
      [url]="url"
      [userName]="userName"
      [userEmail]="userEmail"
      [testId]="testId"
    >
    </goab-work-side-menu>
  `,
})
class TestWorkSideMenuComponent {
  title = "Test title;";
  url = "/test";
  userName = "Test User";
  userEmail = "test@example.com";
  testId = "test-id";
}
describe("GoABWorkSideMenu", () => {
  let fixture: ComponentFixture<TestWorkSideMenuComponent>;
  let component: TestWorkSideMenuComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestWorkSideMenuComponent],
      imports: [GoabWorkSideMenu],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWorkSideMenuComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.debugElement.query(By.css("goa-work-side-menu")).nativeElement;

    expect(el?.getAttribute("title")).toBe(component.title);
    expect(el?.getAttribute("url")).toBe(component.url);
    expect(el?.getAttribute("username")).toBe(component.userName);
    expect(el?.getAttribute("useremail")).toBe(component.userEmail);
  });
});
