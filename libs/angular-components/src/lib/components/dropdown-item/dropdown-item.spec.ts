import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovDropdownItem } from "./dropdown-item";

let component: ABGovDropdownItem;
let fixture: ComponentFixture<ABGovDropdownItem>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovDropdownItem],
  });
  fixture = TestBed.createComponent(ABGovDropdownItem);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
