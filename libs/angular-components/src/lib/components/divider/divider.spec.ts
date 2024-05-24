import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovDivider } from "./divider";

let component: ABGovDivider;
let fixture: ComponentFixture<ABGovDivider>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovDivider],
  });
  fixture = TestBed.createComponent(ABGovDivider);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
