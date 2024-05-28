import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABCalendar } from "./calendar";

let component: GoABCalendar;
let fixture: ComponentFixture<GoABCalendar>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABCalendar],
  });
  fixture = TestBed.createComponent(GoABCalendar);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
