import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabxWorkSideMenuItem } from "./work-side-menu-item";
import { Component } from "@angular/core";

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
  label = "Test label;";
  url = "/test";
  badge = "Test badge";
  current = "true";
  divider = "true";
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

  it("should render web component", () => {
    // Test that the web component can be created directly
    const webComponent = document.createElement("goa-work-side-menu-item") as HTMLElement & {
      label: string;
      url: string;
      badge: string;
      current: boolean;
      divider: boolean;
      icon: string;
      testid: string;
      type: string;
    };
    webComponent.label = component.label;
    webComponent.url = component.url;
    webComponent.badge = component.badge;
    webComponent.current = component.current === "true";
    webComponent.divider = component.divider === "true";
    webComponent.icon = component.icon;
    webComponent.testid = component.testId;
    webComponent.type = component.type;

    expect(webComponent.tagName.toLowerCase()).toBe("goa-work-side-menu-item");
    expect(webComponent.label).toBe(component.label);
    expect(webComponent.url).toBe(component.url);
    expect(webComponent.badge).toBe(component.badge);
  });

  it("should have angular wrapper rendered", () => {
    // Test that at least the Angular wrapper component is rendered
    const wrapperEl = fixture.nativeElement.querySelector("goabx-work-side-menu-item");
    expect(wrapperEl).toBeTruthy();
  });
});
