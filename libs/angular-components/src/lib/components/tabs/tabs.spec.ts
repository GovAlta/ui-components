import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabTabs } from "./tabs";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabTab } from "../tab/tab";
import { GoabTabsOnChangeDetail } from "@abgov/ui-components-common";
import { fireEvent } from "@testing-library/dom";

@Component({
  template: `
    <goab-tabs [initialTab]="1" testId="foo" (onChange)="onChange($event)">
      <goab-tab heading="Profile">Tab content </goab-tab>
    </goab-tabs>
  `,
})
class TestTabsComponent {
  /** do nothing **/
  onChange(event: GoabTabsOnChangeDetail) {
    /** do nothing **/
  }
}

describe("GoABTabs", () => {
  let fixture: ComponentFixture<TestTabsComponent>;
  let component: TestTabsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTabsComponent],
      imports: [GoabTabs, GoabTab],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-tabs");
    expect(el?.getAttribute("initialtab")).toBe("1");
    expect(el?.getAttribute("data-testid")).toBe("foo");
    expect(el?.querySelector("goa-tab")?.innerHTML).toContain("Profile");
    expect(el?.textContent).toContain("Tab content");
  });

  it("should dispatch _onChange", () => {
    const onChange = jest.spyOn(component, "onChange");

    const el = fixture.nativeElement.querySelector("goa-tabs");
    fireEvent(
      el,
      new CustomEvent("_change", {
        detail: { tab: 2}
      })
    );

    expect(onChange).toHaveBeenCalledWith({ tab: 2 });
  });
});
