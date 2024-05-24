import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABGrid } from "./grid";

let component: GoABGrid;
let fixture: ComponentFixture<GoABGrid>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABGrid],
  });
  fixture = TestBed.createComponent(GoABGrid);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
