import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABSpinner } from "./spinner";

let component: GoABSpinner;
let fixture: ComponentFixture<GoABSpinner>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABSpinner],
  });
  fixture = TestBed.createComponent(GoABSpinner);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
