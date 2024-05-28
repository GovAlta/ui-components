import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABBadge } from "./badge";

let component: GoABBadge;
let fixture: ComponentFixture<GoABBadge>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABBadge],
  });
  fixture = TestBed.createComponent(GoABBadge);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
