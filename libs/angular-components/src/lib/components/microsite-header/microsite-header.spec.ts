import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABMicrositeHeader } from "./microsite-header";

let component: GoABMicrositeHeader;
let fixture: ComponentFixture<GoABMicrositeHeader>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABMicrositeHeader],
  });
  fixture = TestBed.createComponent(GoABMicrositeHeader);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
