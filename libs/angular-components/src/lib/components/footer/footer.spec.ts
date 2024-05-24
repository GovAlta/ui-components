import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABAppFooter } from "./footer";

let component: GoABAppFooter;
let fixture: ComponentFixture<GoABAppFooter>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABAppFooter],
  });
  fixture = TestBed.createComponent(GoABAppFooter);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
