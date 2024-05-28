import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABPagination } from "./pagination";

let component: GoABPagination;
let fixture: ComponentFixture<GoABPagination>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABPagination],
  });
  fixture = TestBed.createComponent(GoABPagination);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
