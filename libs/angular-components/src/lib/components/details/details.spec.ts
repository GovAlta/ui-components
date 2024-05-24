import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovDetails } from "./details";

let component: ABGovDetails;
let fixture: ComponentFixture<ABGovDetails>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovDetails],
  });
  fixture = TestBed.createComponent(ABGovDetails);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
