import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABAppFooterMetaSection } from "./footer-meta-section";

let component: GoABAppFooterMetaSection;
let fixture: ComponentFixture<GoABAppFooterMetaSection>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABAppFooterMetaSection],
  });
  fixture = TestBed.createComponent(GoABAppFooterMetaSection);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
