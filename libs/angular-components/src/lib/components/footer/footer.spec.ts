import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovAppFooter } from "./footer";

let component: ABGovAppFooter;
let fixture: ComponentFixture<ABGovAppFooter>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovAppFooter],
  });
  fixture = TestBed.createComponent(ABGovAppFooter);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
