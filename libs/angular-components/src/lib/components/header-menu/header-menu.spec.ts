import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABAppHeaderMenu } from "./header-menu";

let component: GoABAppHeaderMenu;
let fixture: ComponentFixture<GoABAppHeaderMenu>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABAppHeaderMenu],
  });
  fixture = TestBed.createComponent(GoABAppHeaderMenu);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
