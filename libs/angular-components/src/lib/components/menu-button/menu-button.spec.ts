import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabMenuButton } from "./menu-button";
import { GoabMenuAction } from "./menu-action";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabButtonType, GoabIconType } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";

@Component({
  template: `
    <goab-menu-button
      [text]="text"
      [type]="type"
      [leadingIcon]="leadingIcon"
      [testId]="testId"
      (onAction)="onAction($event)">
      <goab-menu-action
        text="Action 1"
        action="action1"
        icon="person-circle">
      </goab-menu-action>
      <goab-menu-action
        text="Action 2"
        action="action2"
        icon="notifications">
      </goab-menu-action>
    </goab-menu-button>
  `
})
class TestMenuButtonComponent {
  text?: string;
  type?: GoabButtonType;
  leadingIcon?: GoabIconType;
  testId?: string;

  onAction(event: unknown) {
    /* do nothing */
  }
}

describe("GoabMenuButton", () => {
  let fixture: ComponentFixture<TestMenuButtonComponent>;
  let component: TestMenuButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabMenuButton, GoabMenuAction],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TestMenuButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestMenuButtonComponent);
    component = fixture.componentInstance;
    component.text = "Menu actions";
    component.type = "primary";
    component.leadingIcon = "alarm";
    component.testId = "test-menu-button";
    fixture.detectChanges();
  });

  it("should render the properties", () => {
    const menuButtonElement = fixture.debugElement.query(By.css("goa-menu-button")).nativeElement;
    expect(menuButtonElement.getAttribute("text")).toBe("Menu actions");
    expect(menuButtonElement.getAttribute("type")).toBe("primary");
    expect(menuButtonElement.getAttribute("leading-icon")).toBe("alarm");
    expect(menuButtonElement.getAttribute("testid")).toBe("test-menu-button");
  });

  it("should render with leading icon", () => {
    const menuButtonElement = fixture.debugElement.query(By.css("goa-menu-button")).nativeElement;
    expect(menuButtonElement.getAttribute("leading-icon")).toBe("alarm");
  });

  it("should render without leading icon when not provided", () => {
    component.leadingIcon = undefined;
    fixture.detectChanges();

    const menuButtonElement = fixture.debugElement.query(By.css("goa-menu-button")).nativeElement;
    expect(menuButtonElement.getAttribute("leading-icon")).toBeNull();
  });

  it("should respond to action event", () => {
    const onAction = jest.spyOn(component, "onAction");
    const menuButtonElement = fixture.debugElement.query(By.css("goa-menu-button")).nativeElement;

    const mockDetail = { action: "action1", text: "Action 1" };
    fireEvent(menuButtonElement, new CustomEvent("_action", { detail: mockDetail }));

    expect(onAction).toHaveBeenCalledWith(mockDetail);
  });
});
