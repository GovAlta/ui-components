import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABContainer } from "./container";

let component: GoABContainer;
let fixture: ComponentFixture<GoABContainer>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABContainer],
  });
  fixture = TestBed.createComponent(GoABContainer);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
