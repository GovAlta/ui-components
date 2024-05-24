import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABSpacer } from "./spacer";

let component: GoABSpacer;
let fixture: ComponentFixture<GoABSpacer>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABSpacer],
  });
  fixture = TestBed.createComponent(GoABSpacer);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
