import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABBlock } from "./block";

let component: GoABBlock;
let fixture: ComponentFixture<GoABBlock>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABBlock],
  });
  fixture = TestBed.createComponent(GoABBlock);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
