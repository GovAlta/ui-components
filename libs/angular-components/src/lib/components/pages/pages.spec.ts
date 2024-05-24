import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABPages } from "./pages";

let component: GoABPages;
let fixture: ComponentFixture<GoABPages>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABPages],
  });
  fixture = TestBed.createComponent(GoABPages);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
