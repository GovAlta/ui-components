import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovCalendar } from "./calendar";

let component: ABGovCalendar;
let fixture: ComponentFixture<ABGovCalendar>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovCalendar],
  });
  fixture = TestBed.createComponent(ABGovCalendar);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
