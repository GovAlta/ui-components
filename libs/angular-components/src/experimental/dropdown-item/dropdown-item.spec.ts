import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabxDropdownItem } from "./dropdown-item";

let component: GoabxDropdownItem;
let fixture: ComponentFixture<GoabxDropdownItem>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoabxDropdownItem],
  });
  fixture = TestBed.createComponent(GoabxDropdownItem);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
