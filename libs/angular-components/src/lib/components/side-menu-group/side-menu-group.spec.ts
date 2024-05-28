import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABSideMenuGroup } from "./side-menu-group";

let component: GoABSideMenuGroup;
let fixture: ComponentFixture<GoABSideMenuGroup>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABSideMenuGroup],
  });
  fixture = TestBed.createComponent(GoABSideMenuGroup);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
