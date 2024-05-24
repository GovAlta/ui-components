import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovPagination } from "./pagination";

let component: ABGovPagination;
let fixture: ComponentFixture<ABGovPagination>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovPagination],
  });
  fixture = TestBed.createComponent(ABGovPagination);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
