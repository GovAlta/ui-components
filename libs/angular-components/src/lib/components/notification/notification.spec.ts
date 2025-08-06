import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabNotification } from "./notification";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { fireEvent } from "@testing-library/dom";
import { GoabAriaLiveType, GoabNotificationType } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabNotification],
  template: `
    <goab-notification
      [type]="type"
      [ariaLive]="ariaLive"
      [maxContentWidth]="maxContentWidth"
      [testId]="testId"
      (onDismiss)="onDismiss()"
    >
      Information to the user goes in the content
    </goab-notification>
  `,
})
class TestNotificationComponent {
  type = "information" as GoabNotificationType;
  ariaLive = "assertive" as GoabAriaLiveType;
  maxContentWidth = "100px";
  testId = "testId";
  onDismiss = () => {
    /** do something */
  };
}

describe("GoABNotification", () => {
  let fixture: ComponentFixture<TestNotificationComponent>;
  let component: TestNotificationComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestNotificationComponent, GoabNotification],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render notification banner", () => {
    const el = fixture.nativeElement.querySelector("goa-notification");
    expect(el).toBeTruthy();

    expect(el?.getAttribute("type")).toEqual(component.type);
    expect(el?.getAttribute("arialive")).toEqual(component.ariaLive);
    expect(el?.getAttribute("maxcontentwidth")).toEqual(component.maxContentWidth);
    expect(el?.getAttribute("testid")).toEqual(component.testId);
    expect(el?.textContent).toContain("Information to the user goes in the content");
  });

  it("should trigger on notification banner dismiss", () => {
    const onDismissSpy = jest.spyOn(component, "onDismiss");
    const el = fixture.nativeElement.querySelector("goa-notification");
    fireEvent(el, new CustomEvent("_dismiss"));

    expect(onDismissSpy).toHaveBeenCalled();
  });
});
