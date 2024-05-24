import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovFormStep } from "./form-step";

let component: ABGovFormStep;
let fixture: ComponentFixture<ABGovFormStep>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovFormStep],
  });
  fixture = TestBed.createComponent(ABGovFormStep);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
