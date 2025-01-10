import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabDropdownItem } from "./dropdown-item";

let component: GoabDropdownItem;
let fixture: ComponentFixture<GoabDropdownItem>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoabDropdownItem],
  });
  fixture = TestBed.createComponent(GoabDropdownItem);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
