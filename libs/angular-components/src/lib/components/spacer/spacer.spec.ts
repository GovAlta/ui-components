import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabSpacer } from "./spacer";
import { Component } from "@angular/core";

@Component({
  template: `
  <goab-spacer hSpacing="2xl" vSpacing="m" testId="foo"></goab-spacer>
  `
})
class TestSpacerComponent {/** do nothing **/}

describe("GoASpacer", () => {
  let fixture: ComponentFixture<TestSpacerComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [TestSpacerComponent],
      imports: [GoabSpacer]
    }).compileComponents();

    fixture = TestBed.createComponent(TestSpacerComponent);
    fixture.detectChanges();
  });

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-spacer");
    expect(el?.getAttribute("hspacing")).toBe("2xl");
    expect(el?.getAttribute("vspacing")).toBe("m");
    expect(el?.getAttribute("data-testid")).toBe("foo");
  });
});
