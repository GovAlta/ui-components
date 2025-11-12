import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabSpacer } from "./spacer";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  standalone: true,
  imports: [GoabSpacer],
  template: `
  <goab-spacer hSpacing="2xl" vSpacing="m" testId="foo"></goab-spacer>
  `
})
class TestSpacerComponent {/** do nothing **/}

describe("GoASpacer", () => {
  let fixture: ComponentFixture<TestSpacerComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabSpacer, TestSpacerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TestSpacerComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-spacer");
    expect(el?.getAttribute("hspacing")).toBe("2xl");
    expect(el?.getAttribute("vspacing")).toBe("m");
    expect(el?.getAttribute("testid")).toBe("foo");
  });
});
