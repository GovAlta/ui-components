import { GoABAccordion } from "./accordion";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

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

let fixture: ComponentFixture<TestAccordionComponent>;

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [GoABAccordion],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [TestAccordionComponent]
  }).compileComponents();

  fixture = TestBed.createComponent(TestAccordionComponent);
  fixture.componentInstance.heading = "hi"

  fixture.detectChanges();
});

it("should render", () => {
  expect(fixture).toBeTruthy();
  expect(fixture).toMatchSnapshot();
});
