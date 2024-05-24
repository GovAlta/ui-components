import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovGrid } from "./grid";

let component: ABGovGrid;
let fixture: ComponentFixture<ABGovGrid>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovGrid],
  });
  fixture = TestBed.createComponent(ABGovGrid);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
