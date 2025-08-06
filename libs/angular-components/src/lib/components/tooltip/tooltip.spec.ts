import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabTooltip } from "./tooltip";
import { Component } from "@angular/core";
import { GoabIcon } from "../icon/icon";

@Component({
  standalone: true,
  imports: [GoabTooltip, GoabIcon],
  template: `
    <goab-tooltip content="This is a tooltip" position="top" hAlign="right" testId="foo">
      <goab-icon type="information-circle"></goab-icon>
    </goab-tooltip>
    <goab-tooltip content="This is a tooltip" maxWidth="300px" testId="foo-maxwidth">
      <goab-icon type="information-circle"></goab-icon>
    </goab-tooltip>
  `,
})
class TestTooltipComponent {
  /** do nothing **/
}

describe("GoABTooltip", () => {
  let fixture: ComponentFixture<TestTooltipComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabTooltip, GoabIcon, TestTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTooltipComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.nativeElement.querySelector('goa-tooltip[testid="foo"]');
    expect(el?.getAttribute("content")).toBe("This is a tooltip");
    expect(el?.getAttribute("position")).toBe("top");
    expect(el?.getAttribute("halign")).toBe("right");
    expect(el?.getAttribute("testid")).toBe("foo");

    const goaIcon = el?.querySelector("goa-icon");
    expect(goaIcon?.getAttribute("type")).toBe("information-circle");
  });

  it("should render with maxWidth property", () => {
    const el = fixture.nativeElement.querySelector('goa-tooltip[testid="foo-maxwidth"]');
    expect(el?.getAttribute("maxwidth")).toBe("300px");
    expect(el?.getAttribute("testid")).toBe("foo-maxwidth");
  });
});