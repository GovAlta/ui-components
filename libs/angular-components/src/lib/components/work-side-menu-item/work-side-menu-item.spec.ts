import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabWorkSideMenuItem } from "./work-side-menu-item";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <goab-work-side-menu-item
      [label]="label"
      [url]="url"
      [badge]="badge"
      [current]="current"
      [divider]="divider"
      [icon]="icon"
      [testId]="testId"
      [type]="type"
      [variation]="variation"
    >
    </goab-work-side-menu-item>
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
  variation = "normal";
}

describe("GoABWorkSideMenuItem", () => {
  let fixture: ComponentFixture<TestWorkSideMenuItemComponent>;
  let component: TestWorkSideMenuItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestWorkSideMenuItemComponent],
      imports: [GoabWorkSideMenuItem],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWorkSideMenuItemComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.debugElement.query(
      By.css("goa-work-side-menu-item"),
    ).nativeElement;

    expect(el?.getAttribute("label")).toBe(component.label);
    expect(el?.getAttribute("url")).toBe(component.url);
    expect(el?.getAttribute("badge")).toBe(component.badge);
    expect(el?.getAttribute("current")).toBe(component.current);
    expect(el?.getAttribute("divider")).toBe(component.divider);
    expect(el?.getAttribute("icon")).toBe(component.icon);
    expect(el?.getAttribute("testid")).toBe(component.testId);
    expect(el?.getAttribute("type")).toBe(component.type);
    expect(el?.getAttribute("variation")).toBe(component.variation);
  });
});
