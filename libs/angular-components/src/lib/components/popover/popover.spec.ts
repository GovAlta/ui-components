import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovPopover } from "./popover";

let component: ABGovPopover;
let fixture: ComponentFixture<ABGovPopover>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovPopover],
  });
  fixture = TestBed.createComponent(ABGovPopover);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
