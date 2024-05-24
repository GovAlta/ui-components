import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovTextArea } from "./textarea";

let component: ABGovTextArea;
let fixture: ComponentFixture<ABGovTextArea>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovTextArea],
  });
  fixture = TestBed.createComponent(ABGovTextArea);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
