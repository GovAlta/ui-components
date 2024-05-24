import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovColumnLayout } from "./column-layout";

let component: ABGovColumnLayout;
let fixture: ComponentFixture<ABGovColumnLayout>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovColumnLayout],
  });
  fixture = TestBed.createComponent(ABGovColumnLayout);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
