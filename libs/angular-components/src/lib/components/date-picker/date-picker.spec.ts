import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovDatePicker } from "./date-picker";

let component: ABGovDatePicker;
let fixture: ComponentFixture<ABGovDatePicker>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovDatePicker],
  });
  fixture = TestBed.createComponent(ABGovDatePicker);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
