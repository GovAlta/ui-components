import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABRadioGroup } from "./radio-group";

let component: GoABRadioGroup;
let fixture: ComponentFixture<GoABRadioGroup>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABRadioGroup],
  });
  fixture = TestBed.createComponent(GoABRadioGroup);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
