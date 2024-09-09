import { GoabAccordion } from "./accordion";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { By } from "@angular/platform-browser";
import { GoabAccordionHeadingSize } from "@abgov/ui-components-common";

@Component({
  template: `
    <goab-accordion
    [heading]="heading"
    [secondaryText]="secondaryText"
    [open]="open"
    [headingSize]="headingSize"
    [headingContent]="headingContent"
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
}

describe("GoABAccordion", () => {
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
    const headingContent = accordionElement.querySelector("[slot='headingcontent']");
    expect(headingContent.textContent).toContain("This is the headingcontent");
  });
});
