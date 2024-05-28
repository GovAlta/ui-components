import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABSideMenuHeading } from "./side-menu-heading";

let component: GoABSideMenuHeading;
let fixture: ComponentFixture<GoABSideMenuHeading>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABSideMenuHeading],
  });
  fixture = TestBed.createComponent(GoABSideMenuHeading);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
