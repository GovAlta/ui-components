import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABFormItem } from "./form-item";

let component: GoABFormItem;
let fixture: ComponentFixture<GoABFormItem>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABFormItem],
  });
  fixture = TestBed.createComponent(GoABFormItem);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
