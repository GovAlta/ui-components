import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabCircularProgress } from "./circular-progress";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoabCircularProgressSize,
  GoabCircularProgressVariant,
} from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <goab-circular-progress
      [variant]="variant"
      [size]="size"
      [progress]="progress"
      [message]="message"
      [visible]="visible"
      [testId]="testId"
    ></goab-circular-progress>
  `,
})
class TestCircularProgressComponent {
  variant?: GoabCircularProgressVariant;
  size?: GoabCircularProgressSize;
  message?: string;
  visible?: boolean;
  progress?: number;
  testId?: string;
}

describe("GoABCircularProgress", () => {
  let fixture: ComponentFixture<TestCircularProgressComponent>;
  let component: TestCircularProgressComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabCircularProgress],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TestCircularProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCircularProgressComponent);
    component = fixture.componentInstance;

    component.variant = "inline";
    component.size = "large";
    component.message = "the message";
    component.visible = false;
    component.testId = "foo";

    fixture.detectChanges();
  });

  it("should not render anything when not visible", () => {
    const el = fixture.debugElement.query(By.css("goa-circular-progress")).nativeElement;
    expect(el?.innerHTML).toBeFalsy();
  });

  describe.each(["fullscreen", "inline"])("Testing variant %s", (variant) => {
    test.each([-1, 50])("Testing progress %s", (progress: number) => {
      component.progress = progress;
      component.variant = variant as GoabCircularProgressVariant;
      component.visible = true;

      fixture.detectChanges();

      const el = fixture.debugElement.query(
        By.css("goa-circular-progress"),
      ).nativeElement;
      expect(el?.getAttribute("progress")).toBe(`${progress}`);
      expect(el?.getAttribute("message")).toBe(component.message);
      expect(el?.getAttribute("data-testid")).toBe(component.testId);
      expect(el?.getAttribute("variant")).toBe(variant);
    });
  });
});
