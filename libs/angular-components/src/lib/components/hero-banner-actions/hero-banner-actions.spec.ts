import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovHeroBannerActions } from "./hero-banner-actions";

let component: ABGovHeroBannerActions;
let fixture: ComponentFixture<ABGovHeroBannerActions>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovHeroBannerActions],
  });
  fixture = TestBed.createComponent(ABGovHeroBannerActions);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
