import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabCallout } from "./callout";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabCalloutSize, GoabCalloutType, Spacing } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabCallout],
  template: `
    <goab-callout
      [type]="type"
      [heading]="heading"
      [size]="size"
      [testId]="testId"
      maxWidth="480px"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    >
      Information to the user goes in the content. Information can include markup as
      desired.
    </goab-callout>
  `,
})
class TestCalloutComponent {
  type?: GoabCalloutType;
  heading?: string;
  size?: GoabCalloutSize;
  testId?: string;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
}

describe("GoABCallout", () => {
  let fixture: ComponentFixture<TestCalloutComponent>;
  let component: TestCalloutComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabCallout, TestCalloutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCalloutComponent);
    component = fixture.componentInstance;

    component.type = "information";
    component.heading = "Callout Title";
    component.size = "medium";
    component.testId = "test-callout";
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render properties", () => {
    const el = fixture.nativeElement.querySelector("goa-callout");
    expect(el.getAttribute("heading")).toContain(component.heading);
    expect(el.getAttribute("type")).toContain(component.type);
    expect(el.getAttribute("size")).toContain(component.size);
    expect(el.getAttribute("testid")).toContain(component.testId);
    expect(el.getAttribute("maxwidth")).toContain("480px");
    expect(el.getAttribute("mt")).toBe(component.mt);
    expect(el.getAttribute("mr")).toBe(component.mr);
    expect(el.getAttribute("mb")).toBe(component.mb);
    expect(el.getAttribute("ml")).toBe(component.ml);

    // render children
    expect(el.textContent).toContain(
      "Information to the user goes in the content. Information can include markup as desired.",
    );
  });
});
