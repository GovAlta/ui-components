import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovChip } from "./chip";

let component: ABGovChip;
let fixture: ComponentFixture<ABGovChip>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovChip],
  });
  fixture = TestBed.createComponent(ABGovChip);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
