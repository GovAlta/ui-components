import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabDrawer } from "./drawer";
import { Component } from "@angular/core";
import { GoabDrawerPosition, GoabDrawerSize } from "@abgov/ui-components-common";

@Component({
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
  standalone: true,
  imports: [GoabDrawer],
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("renders with string heading", async () => {
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
  });
});
