import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovCircularProgress } from "./circular-progress";

let component: ABGovCircularProgress;
let fixture: ComponentFixture<ABGovCircularProgress>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovCircularProgress],
  });
  fixture = TestBed.createComponent(ABGovCircularProgress);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
