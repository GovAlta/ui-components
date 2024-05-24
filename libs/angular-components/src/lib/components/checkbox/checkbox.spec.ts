import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovCheckbox } from "./checkbox";

let component: ABGovCheckbox;
let fixture: ComponentFixture<ABGovCheckbox>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovCheckbox],
  });
  fixture = TestBed.createComponent(ABGovCheckbox);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
