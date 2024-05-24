import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovCallout } from "./callout";

let component: ABGovCallout;
let fixture: ComponentFixture<ABGovCallout>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovCallout],
  });
  fixture = TestBed.createComponent(ABGovCallout);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
