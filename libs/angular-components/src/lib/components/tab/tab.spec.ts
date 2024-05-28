import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABTab } from "./tab";

let component: GoABTab;
let fixture: ComponentFixture<GoABTab>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABTab],
  });
  fixture = TestBed.createComponent(GoABTab);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
