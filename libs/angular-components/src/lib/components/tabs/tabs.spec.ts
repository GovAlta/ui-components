import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABTabs } from "./tabs";

let component: GoABTabs;
let fixture: ComponentFixture<GoABTabs>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABTabs],
  });
  fixture = TestBed.createComponent(GoABTabs);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
