import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABSkeleton } from "./skeleton";

let component: GoABSkeleton;
let fixture: ComponentFixture<GoABSkeleton>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABSkeleton],
  });
  fixture = TestBed.createComponent(GoABSkeleton);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
