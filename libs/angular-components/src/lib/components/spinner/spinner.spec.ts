import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovSpinner } from "./spinner";

let component: ABGovSpinner;
let fixture: ComponentFixture<ABGovSpinner>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovSpinner],
  });
  fixture = TestBed.createComponent(ABGovSpinner);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
