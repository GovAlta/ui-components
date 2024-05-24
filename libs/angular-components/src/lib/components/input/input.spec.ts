import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovInput } from "./input";

let component: ABGovInput;
let fixture: ComponentFixture<ABGovInput>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovInput],
  });
  fixture = TestBed.createComponent(ABGovInput);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
