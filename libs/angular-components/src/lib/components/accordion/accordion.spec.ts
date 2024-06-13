import { GoABAccordion } from "./accordion";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { By } from '@angular/platform-browser';
import { prettyDOM } from "@testing-library/dom";

@Component({
  template: `
    <goab-accordion [heading]="heading">
      test content
      <div slot="headingcontent">
        This is the headingcontent
      </div>
    </goab-accordion>`
})
class TestAccordionComponent {
  heading?: string;
}

describe('GoABAccordion', () => {
  let fixture: ComponentFixture<TestAccordionComponent>;
  let component: TestAccordionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoABAccordion],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TestAccordionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestAccordionComponent);
    component = fixture.componentInstance;
    component.heading = "hi";

    fixture.detectChanges();
  });

  it("should render and match snapshot", () => {
    expect(fixture).toBeTruthy();
    fixture.detectChanges();
    console.log(prettyDOM(fixture.debugElement.nativeElement));
    const accordionElement = fixture.debugElement.query(By.css('goa-accordion')).nativeElement;
    expect(accordionElement.getAttribute('heading')).toBe('hi');
    expect(fixture).toMatchSnapshot();
  });
});
