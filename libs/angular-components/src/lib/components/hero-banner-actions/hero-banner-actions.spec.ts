import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABHeroBannerActions } from "./hero-banner-actions";

let component: GoABHeroBannerActions;
let fixture: ComponentFixture<GoABHeroBannerActions>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABHeroBannerActions],
  });
  fixture = TestBed.createComponent(GoABHeroBannerActions);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
