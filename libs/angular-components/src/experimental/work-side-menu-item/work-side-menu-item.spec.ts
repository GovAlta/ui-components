import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabxWorkSideMenuItem } from "./work-side-menu-item";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabxWorkSideMenuItem],
  template: `
    <goabx-work-side-menu-item
      [label]="label"
      [url]="url"
      [badge]="badge"
      [current]="current"
      [divider]="divider"
      [icon]="icon"
      [testId]="testId"
      [type]="type"
    >
    </goabx-work-side-menu-item>
  `,
})
class TestWorkSideMenuItemComponent {
  label = "Test label";
  url = "/test";
  badge = "Test badge";
  current = true;
  divider = true;
  icon = "triangle";
  testId = "test-id";
  type = "normal";
}

describe("GoabxWorkSideMenuItem", () => {
  let fixture: ComponentFixture<TestWorkSideMenuItemComponent>;
  let component: TestWorkSideMenuItemComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestWorkSideMenuItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWorkSideMenuItemComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    tick(); // Wait for setTimeout in ngOnInit
    fixture.detectChanges();
  }));

  it("should render and set the props correctly", () => {
    const menuItemElement = fixture.debugElement.query(
      By.css("goa-work-side-menu-item"),
    ).nativeElement;
    expect(menuItemElement.getAttribute("label")).toBe("Test label");
    expect(menuItemElement.getAttribute("url")).toBe("/test");
    expect(menuItemElement.getAttribute("badge")).toBe("Test badge");
    expect(menuItemElement.getAttribute("current")).toBe("true");
    expect(menuItemElement.getAttribute("divider")).toBe("true");
    expect(menuItemElement.getAttribute("icon")).toBe("triangle");
    expect(menuItemElement.getAttribute("testid")).toBe("test-id");
    expect(menuItemElement.getAttribute("type")).toBe("normal");
  });
});
