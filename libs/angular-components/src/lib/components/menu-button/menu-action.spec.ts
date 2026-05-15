import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabMenuAction } from "./menu-action";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabIconType } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabMenuAction],
  template: `
    <goab-menu-action
      [text]="text"
      [action]="action"
      [icon]="icon"
      [testId]="testId"
    >
    </goab-menu-action>
  `,
})
class TestMenuActionComponent {
  text = "View case";
  action = "view";
  icon?: GoabIconType;
  testId?: string;
}

describe("GoabMenuAction", () => {
  let fixture: ComponentFixture<TestMenuActionComponent>;
  let component: TestMenuActionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabMenuAction, TestMenuActionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestMenuActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should render text and action attributes", () => {
    const el = fixture.debugElement.query(
      By.css("goa-menu-action"),
    ).nativeElement;
    expect(el.getAttribute("text")).toBe("View case");
    expect(el.getAttribute("action")).toBe("view");
  });

  it("should render with icon", () => {
    component.icon = "pencil";
    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css("goa-menu-action"),
    ).nativeElement;
    expect(el.getAttribute("icon")).toBe("pencil");
  });

  it("should render without icon when not provided", () => {
    const el = fixture.debugElement.query(
      By.css("goa-menu-action"),
    ).nativeElement;
    expect(el.getAttribute("icon")).toBeNull();
  });

  it("should render with testId", () => {
    component.testId = "test-action";
    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css("goa-menu-action"),
    ).nativeElement;
    expect(el.getAttribute("testid")).toBe("test-action");
  });

  it("should render without testId when not provided", () => {
    const el = fixture.debugElement.query(
      By.css("goa-menu-action"),
    ).nativeElement;
    expect(el.getAttribute("testid")).toBeNull();
  });
});
