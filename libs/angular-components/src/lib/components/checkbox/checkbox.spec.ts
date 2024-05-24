import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABCheckbox } from "./checkbox";

let component: GoABCheckbox;
let fixture: ComponentFixture<GoABCheckbox>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABCheckbox],
  });
  fixture = TestBed.createComponent(GoABCheckbox);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
