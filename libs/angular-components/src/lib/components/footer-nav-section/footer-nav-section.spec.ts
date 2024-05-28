import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABAppFooterNavSection } from "./footer-nav-section";

let component: GoABAppFooterNavSection;
let fixture: ComponentFixture<GoABAppFooterNavSection>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABAppFooterNavSection],
  });
  fixture = TestBed.createComponent(GoABAppFooterNavSection);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
