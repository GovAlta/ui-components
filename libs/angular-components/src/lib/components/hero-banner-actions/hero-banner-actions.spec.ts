import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABHeroBannerActions } from "./hero-banner-actions";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { prettyDOM } from "@testing-library/dom";
import { GoABButton, GoABHeroBanner } from "@abgov/angular-components";

@Component({
  template: `
    <goab-hero-banner heading="Upgrading our bitumen" backgroundColor="some-ng.png">
      This is a hero banner content
      <goab-hero-banner-actions>
        <goab-button (onClick)="onClick()">Submit</goab-button>
      </goab-hero-banner-actions>
    </goab-hero-banner>
  `,
})
class TestHeroBannerActionComponent {
  onClick() {
    /** do nothing **/
  }
}

describe("GoABHeroBannerActions", () => {
  let fixture: ComponentFixture<TestHeroBannerActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHeroBannerActionComponent],
      imports: [GoABHeroBanner, GoABHeroBannerActions, GoABButton],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHeroBannerActionComponent);
  });

  it("should render actions", () => {
    console.log(prettyDOM(fixture.debugElement.nativeElement));
    const el = fixture.debugElement.query(By.css("goa-hero-banner")).nativeElement;
    expect(el?.querySelector("goa-button").textContent).toBe("Submit");
  });
});
