import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABColumnLayout } from "./column-layout";

let component: GoABColumnLayout;
let fixture: ComponentFixture<GoABColumnLayout>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABColumnLayout],
  });
  fixture = TestBed.createComponent(GoABColumnLayout);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
