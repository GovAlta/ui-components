import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovContainer } from "./container";

let component: ABGovContainer;
let fixture: ComponentFixture<ABGovContainer>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovContainer],
  });
  fixture = TestBed.createComponent(ABGovContainer);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
