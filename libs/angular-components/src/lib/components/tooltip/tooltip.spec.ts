import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovTooltip } from "./tooltip";

let component: ABGovTooltip;
let fixture: ComponentFixture<ABGovTooltip>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovTooltip],
  });
  fixture = TestBed.createComponent(ABGovTooltip);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
