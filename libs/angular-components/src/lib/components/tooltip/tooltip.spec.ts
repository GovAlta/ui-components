import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabTooltip } from "./tooltip";
import { Component } from "@angular/core";
import { GoabIcon } from "../icon/icon";

@Component({
  template: `
    <goab-tooltip content="This is a tooltip" position="top" hAlign="right" testId="foo">
      <goab-icon type="information-circle"></goab-icon>
    </goab-tooltip>
  `,
})
class TestTooltipComponent {
  /** do nothing **/
}

describe("GoABTooltip", () => {
  let fixture: ComponentFixture<TestTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTooltipComponent],
      imports: [GoabTooltip, GoabIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTooltipComponent);
    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-tooltip");
    expect(el?.getAttribute("content")).toBe("This is a tooltip");
    expect(el?.getAttribute("position")).toBe("top");
    expect(el?.getAttribute("halign")).toBe("right");
    expect(el?.getAttribute("testid")).toBe("foo");

    const goaIcon = el?.querySelector("goa-icon");
    expect(goaIcon?.getAttribute("type")).toBe("information-circle");
  });
});
