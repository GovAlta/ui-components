import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovAppFooterMetaSection } from "./footer-meta-section";

let component: ABGovAppFooterMetaSection;
let fixture: ComponentFixture<ABGovAppFooterMetaSection>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovAppFooterMetaSection],
  });
  fixture = TestBed.createComponent(ABGovAppFooterMetaSection);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
