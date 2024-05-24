import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABInput } from "./input";

let component: GoABInput;
let fixture: ComponentFixture<GoABInput>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABInput],
  });
  fixture = TestBed.createComponent(GoABInput);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
