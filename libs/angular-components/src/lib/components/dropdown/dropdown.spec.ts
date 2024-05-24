import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABDropdown } from "./dropdown";

let component: GoABDropdown;
let fixture: ComponentFixture<GoABDropdown>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABDropdown],
  });
  fixture = TestBed.createComponent(GoABDropdown);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
