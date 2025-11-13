import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabLinearProgress } from "./linear-progress";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabLinearProgress],
  template: `
    <goab-linear-progress [progress]="progress" [testId]="testId"></goab-linear-progress>
  `,
})
class TestLinearProgressComponent {
  progress?: number;
  testId?: string;
}

describe("GoABLinearProgress", () => {
  let fixture: ComponentFixture<TestLinearProgressComponent>;
  let component: TestLinearProgressComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabLinearProgress, TestLinearProgressComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestLinearProgressComponent);
    component = fixture.componentInstance;

    component.testId = "foo";

    fixture.detectChanges();
    tick(); // Wait for component initialization
    fixture.detectChanges();
  }));

  it("should not render anything when not visible", () => {
    const el = fixture.debugElement.query(By.css("goa-linear-progress"))?.nativeElement;
    expect(el?.innerHTML).toBeFalsy();
  });

  describe.each(["fullscreen", "inline"])("Testing variant %s", (variant) => {
    test.each([-1, 50])("Testing progress %s", (progress: number) => {
      component.progress = progress;

      fixture.detectChanges();

      const el = fixture.debugElement.query(By.css("goa-linear-progress"))?.nativeElement;

      expect(el).toBeTruthy();
      expect(el?.getAttribute("progress")).toBe(`${progress}`);
      expect(el?.getAttribute("testid")).toBe(component.testId);
    });
  });
});
