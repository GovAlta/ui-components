import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovSideMenuGroup } from "./side-menu-group";

let component: ABGovSideMenuGroup;
let fixture: ComponentFixture<ABGovSideMenuGroup>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovSideMenuGroup],
  });
  fixture = TestBed.createComponent(ABGovSideMenuGroup);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
