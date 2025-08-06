import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabPages } from "./pages";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Spacing } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabPages],
  template: `
    <goab-pages [current]="current" [mt]="mt" [mb]="mb" [ml]="ml" [mr]="mr">
      <div>Children content</div>
    </goab-pages>
  `,
})
class TestPagesComponent {
  current?: number;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
}

describe("GoABPages", () => {
  let fixture: ComponentFixture<TestPagesComponent>;
  let component: TestPagesComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabPages, TestPagesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPagesComponent);
    component = fixture.componentInstance;

    component.current = 1;
    component.ml = "s";
    component.mr = "m";
    component.mt = "l";
    component.mb = "xl";

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-pages");
    expect(el).toBeTruthy();

    expect(el.getAttribute("current")).toBe(`${component.current}`);
    expect(el.getAttribute("mt")).toBe(`${component.mt}`);
    expect(el.getAttribute("mb")).toBe(`${component.mb}`);
    expect(el.getAttribute("ml")).toBe(`${component.ml}`);
    expect(el.getAttribute("mr")).toBe(`${component.mr}`);
  });
});
