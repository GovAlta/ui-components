import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABSideMenu } from "./side-menu";

let component: GoABSideMenu;
let fixture: ComponentFixture<GoABSideMenu>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABSideMenu],
  });
  fixture = TestBed.createComponent(GoABSideMenu);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
