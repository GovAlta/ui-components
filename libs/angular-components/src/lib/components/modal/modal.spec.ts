import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABModal } from "./modal";

let component: GoABModal;
let fixture: ComponentFixture<GoABModal>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABModal],
  });
  fixture = TestBed.createComponent(GoABModal);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
