import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovSpacer } from "./spacer";

let component: ABGovSpacer;
let fixture: ComponentFixture<ABGovSpacer>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovSpacer],
  });
  fixture = TestBed.createComponent(ABGovSpacer);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
