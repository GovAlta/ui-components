import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovSideMenuHeading } from "./side-menu-heading";

let component: ABGovSideMenuHeading;
let fixture: ComponentFixture<ABGovSideMenuHeading>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovSideMenuHeading],
  });
  fixture = TestBed.createComponent(ABGovSideMenuHeading);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
