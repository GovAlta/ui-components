import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovFormItem } from "./form-item";

let component: ABGovFormItem;
let fixture: ComponentFixture<ABGovFormItem>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovFormItem],
  });
  fixture = TestBed.createComponent(ABGovFormItem);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
