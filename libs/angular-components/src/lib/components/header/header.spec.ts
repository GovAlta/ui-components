import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABAppHeader } from "./header";

let component: GoABAppHeader;
let fixture: ComponentFixture<GoABAppHeader>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABAppHeader],
  });
  fixture = TestBed.createComponent(GoABAppHeader);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
