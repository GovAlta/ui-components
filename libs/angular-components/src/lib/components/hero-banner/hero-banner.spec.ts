import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovHeroBanner } from "./hero-banner";

let component: ABGovHeroBanner;
let fixture: ComponentFixture<ABGovHeroBanner>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovHeroBanner],
  });
  fixture = TestBed.createComponent(ABGovHeroBanner);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
