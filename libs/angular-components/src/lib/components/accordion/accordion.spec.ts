import { GoabAccordion } from "./accordion";
import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { By } from "@angular/platform-browser";
import {
  GoabAccordionHeadingSize,
  GoabAccordionIconPosition,
  GoabAccordionType,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabAccordion],
  template: ` <goab-accordion
    [heading]="heading"
    [secondaryText]="secondaryText"
    [open]="open"
    [headingSize]="headingSize"
    [headingContent]="headingContent"
    [iconPosition]="iconPosition"
    [type]="type"
    maxWidth="480px"
  >
    test content
    <ng-template #headingContent>This is the headingcontent</ng-template>
  </goab-accordion>`,
})
class TestAccordionComponent {
  heading?: string;
  secondaryText?: string;
  open?: boolean;
  headingSize?: GoabAccordionHeadingSize;
  iconPosition?: GoabAccordionIconPosition;
  type?: GoabAccordionType;
}

@Component({
  standalone: true,
  imports: [GoabAccordion],
  template: `
    <goab-accordion heading="Title" [actions]="actionsTemplate">
      test content
      <ng-template #actionsTemplate>This is the actions content</ng-template>
    </goab-accordion>
  `,
})
class TestAccordionWithActionsComponent {}

describe("GoabAccordion", () => {
  let fixture: ComponentFixture<TestAccordionComponent>;
  let component: TestAccordionComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabAccordion, TestAccordionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestAccordionComponent);
    component = fixture.componentInstance;
    component.heading = "hi";
    component.secondaryText = "Secondary Text";
    component.open = true;
    component.headingSize = "large" as GoabAccordionHeadingSize;
    component.iconPosition = "right" as GoabAccordionIconPosition;
    component.type = "filled";

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render and set the props correctly", () => {
    const accordionElement = fixture.debugElement.query(
      By.css("goa-accordion"),
    ).nativeElement;
    expect(accordionElement.getAttribute("heading")).toBe("hi");
    expect(accordionElement.getAttribute("secondarytext")).toBe("Secondary Text");
    expect(accordionElement.getAttribute("open")).toBe("true");
    expect(accordionElement.getAttribute("headingsize")).toBe("large");
    expect(accordionElement.getAttribute("maxwidth")).toBe("480px");
    expect(accordionElement.getAttribute("iconposition")).toBe("right");
    expect(accordionElement.getAttribute("type")).toBe("filled");
    const headingContent = accordionElement.querySelector("[slot='headingcontent']");
    expect(headingContent.textContent).toContain("This is the headingcontent");
  });
});

describe("GoabAccordion actions slot", () => {
  let fixture: ComponentFixture<TestAccordionWithActionsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabAccordion, TestAccordionWithActionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestAccordionWithActionsComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render the actions slot content", () => {
    const accordionElement = fixture.debugElement.query(
      By.css("goa-accordion"),
    ).nativeElement;
    const actionsSlot = accordionElement.querySelector("[slot='actions']");
    expect(actionsSlot).toBeTruthy();
    expect(actionsSlot.textContent).toContain("This is the actions content");
  });
});
