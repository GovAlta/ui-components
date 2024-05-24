import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovIconButton } from "./icon-button";

let component: ABGovIconButton;
let fixture: ComponentFixture<ABGovIconButton>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovIconButton],
  });
  fixture = TestBed.createComponent(ABGovIconButton);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
