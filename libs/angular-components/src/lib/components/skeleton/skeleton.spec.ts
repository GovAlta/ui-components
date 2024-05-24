import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovSkeleton } from "./skeleton";

let component: ABGovSkeleton;
let fixture: ComponentFixture<ABGovSkeleton>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovSkeleton],
  });
  fixture = TestBed.createComponent(ABGovSkeleton);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
