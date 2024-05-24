import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABChip } from "./chip";

let component: GoABChip;
let fixture: ComponentFixture<GoABChip>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABChip],
  });
  fixture = TestBed.createComponent(GoABChip);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
