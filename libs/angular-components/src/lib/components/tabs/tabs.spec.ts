import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABTabs } from "./tabs";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoABTab } from "../tab/tab";

@Component({
  template: `
    <goab-tabs [initialTab]="1" testId="foo">
      <goab-tab heading="Profile">Tab content </goab-tab>
    </goab-tabs>
  `,
})
class TestTabsComponent {
  /** do nothing **/
}

describe("GoABTabs", () => {
  let fixture: ComponentFixture<TestTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTabsComponent],
      imports: [GoABTabs, GoABTab],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTabsComponent);
    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-tabs");
    expect(el?.getAttribute("initialtab")).toBe("1");
    expect(el?.getAttribute("data-testid")).toBe("foo");
    expect(el?.querySelector("goa-tab")?.innerHTML).toContain("Profile");
    expect(el?.textContent).toContain("Tab content");
  });
});
