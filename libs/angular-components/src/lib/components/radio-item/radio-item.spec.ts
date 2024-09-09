import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabRadioItem } from "./radio-item";

let component: GoabRadioItem;
let fixture: ComponentFixture<GoabRadioItem>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoabRadioItem],
  });
  fixture = TestBed.createComponent(GoabRadioItem);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
