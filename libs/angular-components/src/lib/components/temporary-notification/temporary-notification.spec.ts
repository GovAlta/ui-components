import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabTemporaryNotification } from "./temporary-notification";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  template: `
    <goab-temporary-notification
      [message]="message"
      [type]="type"
      [duration]="duration"
      [progress]="progress"
      [testId]="testId"
      [actionText]="actionText"
      [visible]="visible"
      [animationDirection]="animationDirection"
    >
    </goab-temporary-notification>
  `,
})
class TestTemporaryNotificationComponent {
  message = "Test message";
  type = "success";
  duration = 5000;
  progress = 50;
  testId = "testId";
  actionText = "Dismiss";
  visible = true;
  animationDirection = "up";
}

describe("GoabTemporaryNotification", () => {
  let fixture: ComponentFixture<TestTemporaryNotificationComponent>;
  let component: TestTemporaryNotificationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTemporaryNotificationComponent],
      imports: [GoabTemporaryNotification],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTemporaryNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should render temporary notification", () => {
    const el = fixture.nativeElement.querySelector("goa-temp-notification");
    expect(el).toBeTruthy();

    expect(el?.getAttribute("message")).toEqual(component.message);
    expect(el?.getAttribute("type")).toEqual(component.type);
    expect(el?.getAttribute("duration")).toEqual(component.duration.toString());
    expect(el?.getAttribute("progress")).toEqual(component.progress.toString());
    expect(el?.getAttribute("testid")).toEqual(component.testId);
    expect(el?.getAttribute("action-text")).toEqual(component.actionText);
    expect(el?.getAttribute("visible")).toEqual(component.visible.toString());
    expect(el?.getAttribute("animation-direction")).toEqual(component.animationDirection);
  });
});
