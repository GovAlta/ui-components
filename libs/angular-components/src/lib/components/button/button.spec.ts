import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovButton } from "./button";

let component: ABGovButton;
let fixture: ComponentFixture<ABGovButton>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovButton],
  });
  fixture = TestBed.createComponent(ABGovButton);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
