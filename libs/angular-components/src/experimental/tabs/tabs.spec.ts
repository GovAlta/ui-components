import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabxTabs } from "./tabs";
import { GoabxTab } from "../tab/tab";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabTabsOnChangeDetail } from "@abgov/ui-components-common";
import { fireEvent } from "@testing-library/dom";

@Component({
  standalone: true,
  imports: [GoabxTabs, GoabxTab],
  template: `
    <goabx-tabs [initialTab]="1" testId="foo" (onChange)="onChange($event)">
      <goabx-tab heading="Profile">Tab content </goabx-tab>
    </goabx-tabs>
  `,
})
class TestTabsComponent {
  /** do nothing **/
  onChange(event: GoabTabsOnChangeDetail) {
    /** do nothing **/
  }
}

@Component({
  standalone: true,
  imports: [GoabxTabs, GoabxTab],
  template: `
    <goabx-tabs [initialTab]="1" navigation="none" testId="nav-tabs">
      <goabx-tab heading="Tab 1">Tab 1 content</goabx-tab>
    </goabx-tabs>
  `,
})
class TestTabsNavigationComponent {}

describe("GoABTabs", () => {
  let fixture: ComponentFixture<TestTabsComponent>;
  let component: TestTabsComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabxTabs, TestTabsComponent, TestTabsNavigationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-tabs");
    expect(el?.getAttribute("initialtab")).toBe("1");
    expect(el?.getAttribute("testid")).toBe("foo");
    expect(el?.innerHTML).toContain("Profile");
    expect(el?.textContent).toContain("Tab content");
  });

  it("should render with navigation attribute", fakeAsync(() => {
    const navFixture = TestBed.createComponent(TestTabsNavigationComponent);
    navFixture.detectChanges();
    tick();
    navFixture.detectChanges();

    const el = navFixture.nativeElement.querySelector("goa-tabs");
    expect(el?.getAttribute("navigation")).toBe("none");
  }));

  it("should dispatch _onChange", () => {
    const onChange = jest.spyOn(component, "onChange");

    const el = fixture.nativeElement.querySelector("goa-tabs");
    fireEvent(
      el,
      new CustomEvent("_change", {
        detail: { tab: 2 },
      }),
    );

    expect(onChange).toHaveBeenCalledWith({ tab: 2 });
  });
});
