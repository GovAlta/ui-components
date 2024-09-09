import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabPopover } from "./popover";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabPopoverPosition, Spacing } from "@abgov/ui-components-common";
import { GoabButton } from "../button/button";

@Component({
  template: `
    <goab-popover
      [testId]="testId"
      [maxWidth]="maxWidth"
      [padded]="padded"
      [position]="position"
      [relative]="relative"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
      [target]="target"
    >
      <ng-template #target>
        <goab-button type="secondary" size="compact">Click me</goab-button>
      </ng-template>
      The content of the pop over.
    </goab-popover>
  `,
})
class TestPopoverComponent {
  maxWidth = "320px";
  padded = true;
  position?: GoabPopoverPosition;
  relative?: boolean;
  testId?: string;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
}

describe("GoABPopover", () => {
  let fixture: ComponentFixture<TestPopoverComponent>;
  let component: TestPopoverComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestPopoverComponent],
      imports: [GoabPopover, GoabButton],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPopoverComponent);
    component = fixture.componentInstance;

    component.testId = "testId";
    component.maxWidth = "500px";
    component.padded = false;
    component.position = "above" as GoabPopoverPosition;
    component.relative = true;
    component.mt = "l" as Spacing;
    component.mb = "s" as Spacing;
    component.ml = "xs" as Spacing;
    component.mr = "m" as Spacing;
    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-popover");
    expect(el).toBeTruthy();

    const target = el.querySelector("[slot='target']");
    expect(target).toBeTruthy();
    expect(target.innerHTML).toContain("Click me");
    expect(el.innerHTML).toContain("The content of the pop over");
    expect(el.getAttribute("data-testid")).toBe(component.testId);
    expect(el.getAttribute("maxwidth")).toBe(component.maxWidth);
    expect(el.getAttribute("padded")).toBe(`${component.padded}`);
    expect(el.getAttribute("position")).toBe(component.position);
    expect(el.getAttribute("relative")).toBe(`${component.relative}`);

    expect(el.getAttribute("mt")).toBe("l");
    expect(el.getAttribute("mb")).toBe("s");
    expect(el.getAttribute("ml")).toBe("xs");
    expect(el.getAttribute("mr")).toBe("m");

    // Have target and children
    const targetSlot = el.querySelector("[slot='target']");
    expect(targetSlot).toBeTruthy();
    expect(targetSlot.querySelector("goa-button")).toBeTruthy();
    expect(targetSlot.querySelector("goa-button").innerHTML).toContain("Click me");
    expect(el.innerHTML).toContain("The content of the pop over");
  });
});
