import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GoabModal } from "./modal";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoabModalCalloutVariant,
  GoabModalRole,
  GoabModalTransition,
} from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <goab-modal
      [open]="open"
      [maxWidth]="maxWidth"
      [calloutVariant]="callOutVariant"
      [role]="role"
      [testId]="testId"
      [closable]="closable"
      [transition]="transition"
      (onClose)="onClose()"
      [heading]="heading"
      [actions]="actions"
    >
      <ng-template #heading>
        <h1>Heading</h1>
      </ng-template>
      <ng-template #actions>
        <button>Close</button>
      </ng-template>
      {{ content }}
    </goab-modal>
  `,
})
class TestModalComponent {
  open = true;
  maxWidth = "500px";
  callOutVariant = "information" as GoabModalCalloutVariant;
  role = "alertdialog" as GoabModalRole;
  testId = "testId";
  closable = true;
  transition = "fast" as GoabModalTransition;
  heading = "Modal Heading";
  actions = "Close";
  content = "Modal Content";

  onClose() {
    /* do nothing */
  }
}

describe("GoABModal", () => {
  let fixture: ComponentFixture<TestModalComponent>;
  let component: TestModalComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestModalComponent],
      imports: [GoabModal],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should render", () => {
    const modal = fixture.debugElement.query(By.css("goa-modal")).nativeElement;

    const actionContent = modal?.querySelector("[slot='actions']");
    expect(actionContent?.querySelector("button")?.textContent).toContain("Close");
    const headingContent = modal?.querySelector("[slot='heading']");
    expect(headingContent?.textContent).toContain("Heading");
    expect(modal?.getAttribute("open")).toBe(`${component.open}`);
    expect(modal?.getAttribute("maxwidth")).toBe(component.maxWidth);
    expect(modal?.getAttribute("closable")).toBe(`${component.closable}`);
    expect(modal?.textContent).toContain(component.content);
    expect(modal?.getAttribute("calloutvariant")).toBe(component.callOutVariant);
    expect(modal?.getAttribute("testid")).toBe(component.testId);
    expect(modal?.getAttribute("transition")).toBe(component.transition);
    expect(modal?.getAttribute("role")).toBe(component.role);
  });
});
