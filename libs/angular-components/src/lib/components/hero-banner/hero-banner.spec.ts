import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABHeroBanner } from "./hero-banner";

let component: GoABHeroBanner;
let fixture: ComponentFixture<GoABHeroBanner>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABHeroBanner],
  });
  fixture = TestBed.createComponent(GoABHeroBanner);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
