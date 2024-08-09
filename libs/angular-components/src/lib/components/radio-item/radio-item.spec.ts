import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABRadioItem } from "./radio-item";

let component: GoABRadioItem;
let fixture: ComponentFixture<GoABRadioItem>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABRadioItem],
  });
  fixture = TestBed.createComponent(GoABRadioItem);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
