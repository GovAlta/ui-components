import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABButtonGroup } from "./button-group";

let component: GoABButtonGroup;
let fixture: ComponentFixture<GoABButtonGroup>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABButtonGroup],
  });
  fixture = TestBed.createComponent(GoABButtonGroup);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
