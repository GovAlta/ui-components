import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABDetails } from "./details";

let component: GoABDetails;
let fixture: ComponentFixture<GoABDetails>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABDetails],
  });
  fixture = TestBed.createComponent(GoABDetails);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
