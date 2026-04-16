import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabPushDrawer } from "./push-drawer";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  imports: [GoabPushDrawer],
  template: `
    <goab-push-drawer
      [open]="open"
      [width]="width"
      [testId]="testId"
      (onClose)="onClose()"
      [heading]="heading"
      [actions]="actions"
    >
      {{ content }}
      <ng-template #heading>
        <h1>Heading</h1>
      </ng-template>
      <ng-template #actions>
        <button>Close</button>
      </ng-template>
    </goab-push-drawer>
  `,
})
class TestPushDrawerComponent {
  open = false;
  width = "600px";
  testId = "test-push-drawer";
  content = "Test Content";

  onClose() {
    /* empty */
  }
}

describe("GoabPushDrawer", () => {
  let component: TestPushDrawerComponent;
  let fixture: ComponentFixture<TestPushDrawerComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestPushDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPushDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("renders with correct attributes", fakeAsync(() => {
    const pushDrawerElement = fixture.nativeElement.querySelector("goa-push-drawer");
    expect(pushDrawerElement).toBeTruthy();

    expect(pushDrawerElement.getAttribute("width")).toBe("600px");
    expect(pushDrawerElement.getAttribute("testid")).toBe("test-push-drawer");
    expect(pushDrawerElement.getAttribute("version")).toBe("2");
    const headingContent = pushDrawerElement.querySelector("[slot='heading']");
    expect(headingContent?.textContent).toContain("Heading");
    expect(pushDrawerElement.textContent).toContain("Test Content");
    const actionsContent = pushDrawerElement.querySelector("[slot='actions']");
    expect(actionsContent?.textContent).toContain("Close");
  }));
});
