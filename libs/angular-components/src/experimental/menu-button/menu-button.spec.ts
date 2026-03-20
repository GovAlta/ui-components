import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabxMenuButton } from "./menu-button";
import { GoabxMenuAction } from "../menu-action/menu-action";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabIconType,
} from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";

@Component({
  standalone: true,
  imports: [GoabxMenuButton, GoabxMenuAction],
  template: `
    <goabx-menu-button
      [text]="text"
      [type]="type"
      [size]="size"
      [variant]="variant"
      [leadingIcon]="leadingIcon"
      [testId]="testId"
      (onAction)="onAction($event)"
    >
      <goabx-menu-action text="Action 1" action="action1" icon="person-circle">
      </goabx-menu-action>
      <goabx-menu-action text="Action 2" action="action2" icon="notifications">
      </goabx-menu-action>
    </goabx-menu-button>
  `,
})
class TestMenuButtonComponent {
  text?: string;
  type?: GoabButtonType;
  size?: GoabButtonSize;
  variant?: GoabButtonVariant;
  leadingIcon?: GoabIconType;
  testId?: string;

  onAction(event: unknown) {
    /* do nothing */
  }
}

describe("GoabxMenuButton", () => {
  let fixture: ComponentFixture<TestMenuButtonComponent>;
  let component: TestMenuButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabxMenuButton, GoabxMenuAction, TestMenuButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    const menuButtonElement = fixture.debugElement.query(
      By.css("goa-menu-button"),
    ).nativeElement;
    expect(menuButtonElement.getAttribute("text")).toBe("Menu actions");
    expect(menuButtonElement.getAttribute("type")).toBe("primary");
    expect(menuButtonElement.getAttribute("leading-icon")).toBe("alarm");
    expect(menuButtonElement.getAttribute("testid")).toBe("test-menu-button");
    expect(menuButtonElement.getAttribute("version")).toBe("2");
  });

  it("should render with leading icon", () => {
    const menuButtonElement = fixture.debugElement.query(
      By.css("goa-menu-button"),
    ).nativeElement;
    expect(menuButtonElement.getAttribute("leading-icon")).toBe("alarm");
  });

  it("should render without leading icon when not provided", () => {
    component.leadingIcon = undefined;
    fixture.detectChanges();

    const menuButtonElement = fixture.debugElement.query(
      By.css("goa-menu-button"),
    ).nativeElement;
    expect(menuButtonElement.getAttribute("leading-icon")).toBeNull();
  });

  it("should respond to action event", () => {
    const onAction = jest.spyOn(component, "onAction");
    const menuButtonElement = fixture.debugElement.query(
      By.css("goa-menu-button"),
    ).nativeElement;

    const mockDetail = { action: "action1", text: "Action 1" };
    fireEvent(menuButtonElement, new CustomEvent("_action", { detail: mockDetail }));

    expect(onAction).toHaveBeenCalledWith(mockDetail);
  });

  it("should render with size normal by default", () => {
    const menuButtonElement = fixture.debugElement.query(
      By.css("goa-menu-button"),
    ).nativeElement;
    expect(menuButtonElement.getAttribute("size")).toBeNull();
  });

  it("should render with size compact", () => {
    component.size = "compact";
    fixture.detectChanges();

    const menuButtonElement = fixture.debugElement.query(
      By.css("goa-menu-button"),
    ).nativeElement;
    expect(menuButtonElement.getAttribute("size")).toBe("compact");
  });

  it("should render with size normal", () => {
    component.size = "normal";
    fixture.detectChanges();

    const menuButtonElement = fixture.debugElement.query(
      By.css("goa-menu-button"),
    ).nativeElement;
    expect(menuButtonElement.getAttribute("size")).toBe("normal");
  });

  it("should render with variant destructive", () => {
    component.variant = "destructive";
    fixture.detectChanges();

    const menuButtonElement = fixture.debugElement.query(
      By.css("goa-menu-button"),
    ).nativeElement;
    expect(menuButtonElement.getAttribute("variant")).toBe("destructive");
  });

  it("should render without variant when not provided", () => {
    const menuButtonElement = fixture.debugElement.query(
      By.css("goa-menu-button"),
    ).nativeElement;
    expect(menuButtonElement.getAttribute("variant")).toBeNull();
  });

  it("should render without text for icon-only mode", () => {
    component.text = undefined;
    fixture.detectChanges();

    const menuButtonElement = fixture.debugElement.query(
      By.css("goa-menu-button"),
    ).nativeElement;
    expect(menuButtonElement.getAttribute("text")).toBeNull();
  });
});
