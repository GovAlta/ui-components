import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABButton } from "./button";

let component: GoABButton;
let fixture: ComponentFixture<GoABButton>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABButton],
  });
  fixture = TestBed.createComponent(GoABButton);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
