import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovFormStepper } from "./form-stepper";

let component: ABGovFormStepper;
let fixture: ComponentFixture<ABGovFormStepper>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovFormStepper],
  });
  fixture = TestBed.createComponent(ABGovFormStepper);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
