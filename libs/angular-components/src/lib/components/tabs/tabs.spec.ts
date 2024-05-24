import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovTabs } from "./tabs";

let component: ABGovTabs;
let fixture: ComponentFixture<ABGovTabs>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovTabs],
  });
  fixture = TestBed.createComponent(ABGovTabs);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
