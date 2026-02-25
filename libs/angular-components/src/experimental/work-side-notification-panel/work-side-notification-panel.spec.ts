import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabxWorkSideNotificationPanel } from "./work-side-notification-panel";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabxWorkSideNotificationPanel],
  template: `
    <goabx-work-side-notification-panel
      [heading]="heading"
      [activeTab]="activeTab"
      [testId]="testId"
      (onMarkAllRead)="markAllReadCalled = true"
      (onViewAll)="viewAllCalled = true"
    >
      <div class="panel-child">Child content</div>
    </goabx-work-side-notification-panel>
  `,
})
class TestWorkSideNotificationPanelComponent {
  heading = "Notifications";
  activeTab = "all";
  testId = "test-id";
  markAllReadCalled = false;
  viewAllCalled = false;
}

describe("GoabxWorkSideNotificationPanel", () => {
  it("should render and set the props correctly", fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestWorkSideNotificationPanelComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestWorkSideNotificationPanelComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css("goa-work-side-notification-panel"),
    ).nativeElement;
    expect(el.getAttribute("heading")).toBe("Notifications");
    expect(el.getAttribute("active-tab")).toBe("all");
    expect(el.getAttribute("testid")).toBe("test-id");
  }));

  it("should project child content", fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestWorkSideNotificationPanelComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestWorkSideNotificationPanelComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const child = fixture.debugElement.query(By.css(".panel-child"));
    expect(child).toBeTruthy();
    expect(child.nativeElement.textContent).toBe("Child content");
  }));

  it("should emit onMarkAllRead when _markAllRead event is dispatched", fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestWorkSideNotificationPanelComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestWorkSideNotificationPanelComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css("goa-work-side-notification-panel"),
    ).nativeElement;
    el.dispatchEvent(new CustomEvent("_markAllRead"));
    fixture.detectChanges();

    expect(fixture.componentInstance.markAllReadCalled).toBe(true);
  }));

  it("should emit onViewAll when _viewAll event is dispatched", fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestWorkSideNotificationPanelComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestWorkSideNotificationPanelComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css("goa-work-side-notification-panel"),
    ).nativeElement;
    el.dispatchEvent(new CustomEvent("_viewAll"));
    fixture.detectChanges();

    expect(fixture.componentInstance.viewAllCalled).toBe(true);
  }));
});
