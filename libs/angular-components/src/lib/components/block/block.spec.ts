import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovBlock } from "./block";

let component: ABGovBlock;
let fixture: ComponentFixture<ABGovBlock>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovBlock],
  });
  fixture = TestBed.createComponent(ABGovBlock);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
