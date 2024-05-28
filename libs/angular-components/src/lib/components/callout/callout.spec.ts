import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABCallout } from "./callout";

let component: GoABCallout;
let fixture: ComponentFixture<GoABCallout>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABCallout],
  });
  fixture = TestBed.createComponent(GoABCallout);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
