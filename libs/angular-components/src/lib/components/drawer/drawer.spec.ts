import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabDrawer } from "./drawer";
import { Component } from "@angular/core";
import { GoabDrawerPosition, GoabDrawerSize } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabDrawer],
  template: `
    <goab-drawer
      [open]="open"
      [position]="position"
      [maxSize]="maxSize"
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
    </goab-drawer>
  `,
})
class TestDrawerComponent {
  open = false;
  position: GoabDrawerPosition = "bottom";
  maxSize = "50ch" as GoabDrawerSize;
  testId = "test-drawer";
  content = "Test Content";

  // Empty method for testing close event emission
  onClose() {
    /* empty */
  }
}

describe("GoabDrawer", () => {
  let component: TestDrawerComponent;
  let fixture: ComponentFixture<TestDrawerComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("renders with string heading", fakeAsync(() => {
    const drawerElement = fixture.nativeElement.querySelector("goa-drawer");
    expect(drawerElement).toBeTruthy();

    expect(drawerElement.getAttribute("position")).toBe("bottom");
    const headingContent = drawerElement.querySelector("[slot='heading']");
    expect(headingContent?.textContent).toContain("Heading");
    expect(drawerElement.getAttribute("maxsize")).toBe("50ch");
    expect(drawerElement.getAttribute("testid")).toBe("test-drawer");
    expect(drawerElement.textContent).toContain("Test Content");
    const actionsContent = drawerElement.querySelector("[slot='actions']");
    expect(actionsContent?.textContent).toContain("Close");
  }));
});
