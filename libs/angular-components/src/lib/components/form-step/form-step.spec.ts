import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabFormStep } from "./form-step";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabFormStepStatus } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";

@Component({
  template: ` <goab-form-step [text]="text" [status]="status"></goab-form-step> `,
})
class TestFormStepComponent {
  text?: string;
  status?: GoabFormStepStatus;
}

describe("GoABFormStep", () => {
  let fixture: ComponentFixture<TestFormStepComponent>;
  let component: TestFormStepComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestFormStepComponent],
      imports: [GoabFormStep],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(TestFormStepComponent);
    component = fixture.componentInstance;

    component.text = "Step 1";
    component.status = "complete";
    fixture.detectChanges();
  });

  it("should render successfully", () => {
    const el = fixture.debugElement.query(By.css("goa-form-step")).nativeElement;
    expect(el?.getAttribute("text")).toBe(component.text);
    expect(el?.getAttribute("status")).toBe(component.status);
  });
});
