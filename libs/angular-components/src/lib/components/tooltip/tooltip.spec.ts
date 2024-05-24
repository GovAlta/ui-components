import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABTooltip } from "./tooltip";

let component: GoABTooltip;
let fixture: ComponentFixture<GoABTooltip>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABTooltip],
  });
  fixture = TestBed.createComponent(GoABTooltip);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
