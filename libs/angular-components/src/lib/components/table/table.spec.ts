import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovTable } from "./table";

let component: ABGovTable;
let fixture: ComponentFixture<ABGovTable>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovTable],
  });
  fixture = TestBed.createComponent(ABGovTable);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
