import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABDropdownItem } from "./dropdown-item";

let component: GoABDropdownItem;
let fixture: ComponentFixture<GoABDropdownItem>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABDropdownItem],
  });
  fixture = TestBed.createComponent(GoABDropdownItem);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
