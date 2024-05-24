import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovDropdown } from "./dropdown";

let component: ABGovDropdown;
let fixture: ComponentFixture<ABGovDropdown>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovDropdown],
  });
  fixture = TestBed.createComponent(ABGovDropdown);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
