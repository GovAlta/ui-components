import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabTab } from "./tab";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  template: `
    <goab-tab heading="Profile">
      <p>
        <b>Profile:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </goab-tab>
  `,
})
class TestTabComponent {
  /** do nothing **/
}

describe("GoABTab", () => {
  let fixture: ComponentFixture<TestTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTabComponent],
      imports: [GoabTab],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTabComponent);
    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-tab");
    expect(el?.innerHTML).toContain("Profile");
    const content = el?.querySelector("p");
    expect(content?.textContent).toContain(
      "Profile: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    );
  });
});
