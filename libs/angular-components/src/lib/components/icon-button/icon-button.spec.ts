import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABIconButton } from "./icon-button";

let component: GoABIconButton;
let fixture: ComponentFixture<GoABIconButton>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABIconButton],
  });
  fixture = TestBed.createComponent(GoABIconButton);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
