import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovPages } from "./pages";

let component: ABGovPages;
let fixture: ComponentFixture<ABGovPages>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovPages],
  });
  fixture = TestBed.createComponent(ABGovPages);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
