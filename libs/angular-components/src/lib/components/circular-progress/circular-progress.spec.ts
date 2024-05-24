import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABCircularProgress } from "./circular-progress";

let component: GoABCircularProgress;
let fixture: ComponentFixture<GoABCircularProgress>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABCircularProgress],
  });
  fixture = TestBed.createComponent(GoABCircularProgress);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
