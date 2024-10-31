import { GoabAccordion } from "./accordion";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { By } from "@angular/platform-browser";
import { GoabAccordionHeadingSize, GoabAccordionIconPosition } from "@abgov/ui-components-common";

@Component({
  template: `
    <goab-accordion
    [heading]="heading"
    [secondaryText]="secondaryText"
    [open]="open"
    [headingSize]="headingSize"
    [headingContent]="headingContent"
    [iconPosition]="iconPosition"
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
}

describe("GoabAccordion", () => {
  let fixture: ComponentFixture<TestAccordionComponent>;
  let component: TestAccordionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabAccordion],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TestAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestAccordionComponent);
    component = fixture.componentInstance;
    component.heading = "hi";
    component.secondaryText = "Secondary Text";
    component.open = true;
    component.headingSize = "large" as GoabAccordionHeadingSize;
    component.iconPosition = "right" as GoabAccordionIconPosition;

    fixture.detectChanges();
  });

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
    const headingContent = accordionElement.querySelector("[slot='headingcontent']");
    expect(headingContent.textContent).toContain("This is the headingcontent");
  });
});
