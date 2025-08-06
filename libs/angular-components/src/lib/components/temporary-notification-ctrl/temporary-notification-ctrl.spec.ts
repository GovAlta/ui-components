import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabTemporaryNotificationCtrl } from "./temporary-notification-ctrl";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  standalone: true,
  imports: [GoabTemporaryNotificationCtrl],
  template: `
    <goab-temporary-notification-ctrl
      [verticalPosition]="verticalPosition"
      [horizontalPosition]="horizontalPosition"
      [testId]="testId"
    >
    </goab-temporary-notification-ctrl>
  `,
})
class TestTemporaryNotificationCtrlComponent {
  verticalPosition = "top";
  horizontalPosition = "left";
  testId = "testId";
}

describe("GoabTemporaryNotificationCtrl", () => {
  let fixture: ComponentFixture<TestTemporaryNotificationCtrlComponent>;
  let component: TestTemporaryNotificationCtrlComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestTemporaryNotificationCtrlComponent, GoabTemporaryNotificationCtrl],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTemporaryNotificationCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render temporary notification controller", () => {
    const el = fixture.nativeElement.querySelector("goa-temp-notification-ctrl");
    expect(el).toBeTruthy();

    expect(el?.getAttribute("vertical-position")).toEqual(component.verticalPosition);
    expect(el?.getAttribute("horizontal-position")).toEqual(component.horizontalPosition);
    expect(el?.getAttribute("testid")).toEqual(component.testId);
  });
});
