import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabNotificationBanner } from "./notification-banner";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { fireEvent } from "@testing-library/dom";
import { GoabAriaLiveType, GoabNotificationType } from "@abgov/ui-components-common";

@Component({
  template: `
  <goab-notification [type]="type"
                     [ariaLive]="ariaLive"
                     [maxContentWidth]="maxContentWidth"
                     [testId]="testId"
                     (onDismiss)="onDismiss()">
    Information to the user goes in the content
  </goab-notification>
  `
})
class TestNotificationBannerComponent {
  type = "information" as GoabNotificationType;
  ariaLive = "assertive" as GoabAriaLiveType;
  maxContentWidth = "100px";
  testId = "testId";
  onDismiss = () => {/** do something */};
}

describe("GoABNotificationBanner", () => {
  let fixture: ComponentFixture<TestNotificationBannerComponent>;
  let component: TestNotificationBannerComponent;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [TestNotificationBannerComponent],
      imports: [GoabNotificationBanner],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TestNotificationBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it("should render notification banner", () => {
    const el = fixture.nativeElement.querySelector("goa-notification");
    expect(el).toBeTruthy();

    expect(el?.getAttribute("type")).toEqual(component.type);
    expect(el?.getAttribute("arialive")).toEqual(component.ariaLive);
    expect(el?.getAttribute("maxcontentwidth")).toEqual(component.maxContentWidth);
    expect(el?.getAttribute("data-testid")).toEqual(component.testId);
    expect(el?.textContent).toContain("Information to the user goes in the content");
  });

  it("should trigger on notification banner dismiss", () => {
    const onDismissSpy = jest.spyOn(component, "onDismiss");
    const el = fixture.nativeElement.querySelector("goa-notification");
    fireEvent(el, new CustomEvent("_dismiss"));

    expect(onDismissSpy).toHaveBeenCalled();
  })
});
