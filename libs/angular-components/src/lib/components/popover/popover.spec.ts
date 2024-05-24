import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABPopover } from "./popover";

let component: GoABPopover;
let fixture: ComponentFixture<GoABPopover>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABPopover],
  });
  fixture = TestBed.createComponent(GoABPopover);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
