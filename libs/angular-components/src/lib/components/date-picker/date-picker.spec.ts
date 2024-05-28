import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABDatePicker } from "./date-picker";

let component: GoABDatePicker;
let fixture: ComponentFixture<GoABDatePicker>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABDatePicker],
  });
  fixture = TestBed.createComponent(GoABDatePicker);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
