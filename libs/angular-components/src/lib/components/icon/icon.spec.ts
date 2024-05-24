import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABIcon } from "./icon";

let component: GoABIcon;
let fixture: ComponentFixture<GoABIcon>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABIcon],
  });
  fixture = TestBed.createComponent(GoABIcon);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
