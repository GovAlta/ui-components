import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABTextArea } from "./textarea";

let component: GoABTextArea;
let fixture: ComponentFixture<GoABTextArea>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABTextArea],
  });
  fixture = TestBed.createComponent(GoABTextArea);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
