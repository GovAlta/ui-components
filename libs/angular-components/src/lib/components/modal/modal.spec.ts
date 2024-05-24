import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovModal } from "./modal";

let component: ABGovModal;
let fixture: ComponentFixture<ABGovModal>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovModal],
  });
  fixture = TestBed.createComponent(ABGovModal);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
