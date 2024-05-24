import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovIcon } from "./icon";

let component: ABGovIcon;
let fixture: ComponentFixture<ABGovIcon>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovIcon],
  });
  fixture = TestBed.createComponent(ABGovIcon);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
