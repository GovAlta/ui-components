import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovRadioItem } from "./radio-item";

let component: ABGovRadioItem;
let fixture: ComponentFixture<ABGovRadioItem>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovRadioItem],
  });
  fixture = TestBed.createComponent(ABGovRadioItem);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
