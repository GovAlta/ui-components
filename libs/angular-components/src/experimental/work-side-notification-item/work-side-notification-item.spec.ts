import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabxWorkSideNotificationItem } from "./work-side-notification-item";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabxWorkSideNotificationItem],
  template: `
    <goabx-work-side-notification-item
      [type]="type"
      [timestamp]="timestamp"
      [title]="title"
      [description]="description"
      [readStatus]="readStatus"
      [priority]="priority"
      [testId]="testId"
      (onClick)="clicked = true"
    >
    </goabx-work-side-notification-item>
  `,
})
class TestWorkSideNotificationItemComponent {
  type = "event";
  timestamp = "2026-01-29T10:00:00Z";
  title = "Test notification";
  description = "Test description";
  readStatus = "unread";
  priority = "normal";
  testId = "test-id";
  clicked = false;
}

describe("GoabxWorkSideNotificationItem", () => {
  it("should render and set the props correctly", fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestWorkSideNotificationItemComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestWorkSideNotificationItemComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css("goa-work-side-notification-item"),
    ).nativeElement;
    expect(el.getAttribute("type")).toBe("event");
    expect(el.getAttribute("timestamp")).toBe("2026-01-29T10:00:00Z");
    expect(el.getAttribute("title")).toBe("Test notification");
    expect(el.getAttribute("description")).toBe("Test description");
    expect(el.getAttribute("read-status")).toBe("unread");
    expect(el.getAttribute("priority")).toBe("normal");
    expect(el.getAttribute("testid")).toBe("test-id");
  }));

  it("should emit onClick when _click event is dispatched", fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestWorkSideNotificationItemComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestWorkSideNotificationItemComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css("goa-work-side-notification-item"),
    ).nativeElement;
    el.dispatchEvent(new CustomEvent("_click"));
    fixture.detectChanges();

    expect(fixture.componentInstance.clicked).toBe(true);
  }));
});
