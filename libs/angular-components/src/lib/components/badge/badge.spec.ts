import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovBadge } from "./badge";

let component: ABGovBadge;
let fixture: ComponentFixture<ABGovBadge>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovBadge],
  });
  fixture = TestBed.createComponent(ABGovBadge);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
