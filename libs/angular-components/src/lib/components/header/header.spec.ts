import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovAppHeader } from "./header";

let component: ABGovAppHeader;
let fixture: ComponentFixture<ABGovAppHeader>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovAppHeader],
  });
  fixture = TestBed.createComponent(ABGovAppHeader);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
