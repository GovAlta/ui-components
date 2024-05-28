import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABDivider } from "./divider";

let component: GoABDivider;
let fixture: ComponentFixture<GoABDivider>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABDivider],
  });
  fixture = TestBed.createComponent(GoABDivider);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
