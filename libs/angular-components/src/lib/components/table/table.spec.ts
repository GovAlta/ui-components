import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABTable } from "./table";

let component: GoABTable;
let fixture: ComponentFixture<GoABTable>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABTable],
  });
  fixture = TestBed.createComponent(GoABTable);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
