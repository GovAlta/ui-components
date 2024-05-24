import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovRadioGroup } from "./radio-group";

let component: ABGovRadioGroup;
let fixture: ComponentFixture<ABGovRadioGroup>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovRadioGroup],
  });
  fixture = TestBed.createComponent(ABGovRadioGroup);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
