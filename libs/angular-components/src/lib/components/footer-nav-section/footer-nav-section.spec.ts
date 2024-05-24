import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovAppFooterNavSection } from "./footer-nav-section";

let component: ABGovAppFooterNavSection;
let fixture: ComponentFixture<ABGovAppFooterNavSection>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovAppFooterNavSection],
  });
  fixture = TestBed.createComponent(ABGovAppFooterNavSection);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
