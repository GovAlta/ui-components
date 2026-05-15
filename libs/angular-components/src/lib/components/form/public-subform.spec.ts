import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabPublicSubform } from "./public-subform";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { Spacing } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabPublicSubform],
  template: `
    <goab-public-subform
      [id]="id"
      [name]="name"
      [continueMsg]="continueMsg"
      [mt]="mt"
      [mr]="mr"
      [mb]="mb"
      [ml]="ml"
      (onInit)="handleInit($event)"
      (onStateChange)="handleStateChange($event)"
    >
      <div data-testid="content">Test content</div>
    </goab-public-subform>
  `,
})
class TestPublicSubformComponent {
  id = "test-subform";
  name = "test-subform-name";
  continueMsg = "Continue to next step";
  mt = "s" as Spacing;
  mr = "m" as Spacing;
  mb = "l" as Spacing;
  ml = "xl" as Spacing;

  initEventCalled = false;
  stateChangeEventCalled = false;
  lastInitEvent: Event | null = null;
  lastStateChangeEvent: Event | null = null;

  handleInit(event: Event): void {
    this.initEventCalled = true;
    this.lastInitEvent = event;
  }

  handleStateChange(event: Event): void {
    this.stateChangeEventCalled = true;
    this.lastStateChangeEvent = event;
  }
}

describe("GoabPublicSubform", () => {
  let fixture: ComponentFixture<TestPublicSubformComponent>;
  let component: TestPublicSubformComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabPublicSubform, TestPublicSubformComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPublicSubformComponent);
    component = fixture.componentInstance;
  });

  it("should render with properties", () => {
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-subform")).nativeElement;

    expect(el?.getAttribute("id")).toBe(component.id);
    expect(el?.getAttribute("name")).toBe(component.name);
    expect(el?.getAttribute("continue-msg")).toBe(component.continueMsg);
    expect(el?.getAttribute("mt")).toBe(component.mt);
    expect(el?.getAttribute("mr")).toBe(component.mr);
    expect(el?.getAttribute("mb")).toBe(component.mb);
    expect(el?.getAttribute("ml")).toBe(component.ml);

    // Content is rendered
    expect(el?.querySelector("[data-testid='content']")).toBeTruthy();
  });

  it("should have default values", () => {
    const subform = new GoabPublicSubform();
    expect(subform.id).toBe("");
    expect(subform.name).toBe("");
    expect(subform.continueMsg).toBe("");
  });

  it("should emit onInit event", () => {
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-subform")).nativeElement;
    const testEvent = new CustomEvent("_init", { detail: { test: "data" } });

    el.dispatchEvent(testEvent);

    expect(component.initEventCalled).toBe(true);
    expect(component.lastInitEvent).toBeTruthy();
  });

  it("should emit onStateChange event", () => {
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-subform")).nativeElement;
    const testEvent = new CustomEvent("_stateChange", { detail: { state: "changed" } });

    el.dispatchEvent(testEvent);

    expect(component.stateChangeEventCalled).toBe(true);
    expect(component.lastStateChangeEvent).toBeTruthy();
  });

  it("should pass through different property values", () => {
    component.id = "updated-id";
    component.name = "updated-name";
    component.continueMsg = "Updated continue message";
    component.mt = "none";
    component.mr = "xs";
    component.mb = "2xl";
    component.ml = "3xl";

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-subform")).nativeElement;

    expect(el?.getAttribute("id")).toBe("updated-id");
    expect(el?.getAttribute("name")).toBe("updated-name");
    expect(el?.getAttribute("continue-msg")).toBe("Updated continue message");
    expect(el?.getAttribute("mt")).toBe("none");
    expect(el?.getAttribute("mr")).toBe("xs");
    expect(el?.getAttribute("mb")).toBe("2xl");
    expect(el?.getAttribute("ml")).toBe("3xl");
  });

  it("should handle empty string attributes correctly", () => {
    component.id = "";
    component.name = "";
    component.continueMsg = "";

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-subform")).nativeElement;

    expect(el?.getAttribute("id")).toBe("");
    expect(el?.getAttribute("name")).toBe("");
    expect(el?.getAttribute("continue-msg")).toBe("");
  });

  it("should emit multiple events in sequence", () => {
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-subform")).nativeElement;

    // Reset counters
    component.initEventCalled = false;
    component.stateChangeEventCalled = false;

    // Emit init event
    el.dispatchEvent(new CustomEvent("_init"));
    expect(component.initEventCalled).toBe(true);
    expect(component.stateChangeEventCalled).toBe(false);

    // Emit state change event
    el.dispatchEvent(new CustomEvent("_stateChange"));
    expect(component.stateChangeEventCalled).toBe(true);
  });
});
