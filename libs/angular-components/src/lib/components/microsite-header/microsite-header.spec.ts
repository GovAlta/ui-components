import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovMicrositeHeader } from "./microsite-header";

let component: ABGovMicrositeHeader;
let fixture: ComponentFixture<ABGovMicrositeHeader>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovMicrositeHeader],
  });
  fixture = TestBed.createComponent(ABGovMicrositeHeader);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
