import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovAppHeaderMenu } from "./header-menu";

let component: ABGovAppHeaderMenu;
let fixture: ComponentFixture<ABGovAppHeaderMenu>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovAppHeaderMenu],
  });
  fixture = TestBed.createComponent(ABGovAppHeaderMenu);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
