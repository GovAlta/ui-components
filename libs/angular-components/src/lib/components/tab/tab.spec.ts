import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovTab } from "./tab";

let component: ABGovTab;
let fixture: ComponentFixture<ABGovTab>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovTab],
  });
  fixture = TestBed.createComponent(ABGovTab);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
