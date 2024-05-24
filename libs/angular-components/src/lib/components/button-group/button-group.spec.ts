import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovButtonGroup } from "./button-group";

let component: ABGovButtonGroup;
let fixture: ComponentFixture<ABGovButtonGroup>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovButtonGroup],
  });
  fixture = TestBed.createComponent(ABGovButtonGroup);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
