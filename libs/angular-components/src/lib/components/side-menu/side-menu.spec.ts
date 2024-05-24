import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovSideMenu } from "./side-menu";

let component: ABGovSideMenu;
let fixture: ComponentFixture<ABGovSideMenu>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovSideMenu],
  });
  fixture = TestBed.createComponent(ABGovSideMenu);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
