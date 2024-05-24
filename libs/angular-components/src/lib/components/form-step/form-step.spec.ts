import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABFormStep } from "./form-step";

let component: GoABFormStep;
let fixture: ComponentFixture<GoABFormStep>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABFormStep],
  });
  fixture = TestBed.createComponent(GoABFormStep);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
