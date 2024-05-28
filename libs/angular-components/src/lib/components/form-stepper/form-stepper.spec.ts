import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABFormStepper } from "./form-stepper";

let component: GoABFormStepper;
let fixture: ComponentFixture<GoABFormStepper>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABFormStepper],
  });
  fixture = TestBed.createComponent(GoABFormStepper);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
