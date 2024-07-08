import { GoABAccordion } from "./accordion";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { By } from "@angular/platform-browser";
import { GoABAccordionHeadingSize } from "@abgov/ui-components-common";
import { prettyDOM } from "@testing-library/dom";

@Component({
  template: `
    <goab-accordion
    [heading]="heading"
    [secondaryText]="secondaryText"
    [open]="open"
    [headingSize]="headingSize"
  >
    test content
    <div slot="headingContent">This is the headingcontent</div>
  </goab-accordion>`,
})
class TestAccordionComponent {
  heading?: string;
  secondaryText?: string;
  open?: boolean;
  headingSize?: GoABAccordionHeadingSize;
}

describe("GoABAccordion", () => {
  let fixture: ComponentFixture<TestAccordionComponent>;
  let component: TestAccordionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoABAccordion],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TestAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestAccordionComponent);
    component = fixture.componentInstance;
    component.heading = "hi";
    component.secondaryText = "Secondary Text";
    component.open = true;
    component.headingSize = "large" as GoABAccordionHeadingSize;

    fixture.detectChanges();
  });

  it("should render and set the props correctly", () => {
    console.log(prettyDOM(fixture.nativeElement));
    const accordionElement = fixture.debugElement.query(
      By.css("goa-accordion"),
    ).nativeElement;
    expect(accordionElement.getAttribute("heading")).toBe("hi");
    expect(accordionElement.getAttribute("secondarytext")).toBe("Secondary Text");
    expect(accordionElement.getAttribute("open")).toBe("true");
    expect(accordionElement.getAttribute("headingsize")).toBe("large");
    const headingContent = accordionElement.querySelector("[slot='headingcontent']");
    expect(headingContent.textContent).toContain("This is the headingcontent");
  });
});
