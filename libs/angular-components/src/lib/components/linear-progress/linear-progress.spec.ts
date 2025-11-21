import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabLinearProgress } from "./linear-progress";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabLinearProgress],
  template: `
    <goab-linear-progress
      [progress]="progress"
      [testid]="testid"
      [showPercentage]="showPercentage"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
    ></goab-linear-progress>
  `,
})
class TestLinearProgressComponent {
  progress?: number;
  testid?: string;
  showPercentage?: boolean | undefined;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

describe("GoABLinearProgress", () => {
  let fixture: ComponentFixture<TestLinearProgressComponent>;
  let component: TestLinearProgressComponent;
  const showPercentage: boolean | undefined = true;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabLinearProgress, TestLinearProgressComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestLinearProgressComponent);
    component = fixture.componentInstance;

    component.testid = "foo";
    component.showPercentage = showPercentage;
    component.ariaLabel = "ariaLabel";
    component.ariaLabelledBy = "ariaLabelledBy";

    fixture.detectChanges();
    tick(); // Wait for component initialization
    fixture.detectChanges();
  }));

  it("should not render anything when not visible", () => {
    const el = fixture.debugElement.query(By.css("goa-linear-progress"))?.nativeElement;
    expect(el?.innerHTML).toBeFalsy();
  });

  it("should render correctly with various attribute values", () => {
    const el = fixture.debugElement.query(By.css("goa-linear-progress"))?.nativeElement;

    expect(el?.getAttribute("testid")).toBe("foo");
    expect(el?.getAttribute("show-percentage")).toBe(showPercentage?.toString());
    expect(el?.getAttribute("aria-label")).toBe("ariaLabel");
    expect(el?.getAttribute("aria-labelledby")).toBe("ariaLabelledBy");
  });

  test.each([-1, 0, 10, 25, 50, 100])("Testing progress %s", (progress: number) => {
    component.progress = progress;
    component.showPercentage = true;

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-linear-progress"))?.nativeElement;

    expect(el).toBeTruthy();
    expect(el?.getAttribute("progress")).toBe(`${progress}`);
  });
});
