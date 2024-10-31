import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabFileUploadInput } from "./file-upload-input";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabFileUploadInputVariant } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";

@Component({
  template: `
    <goab-file-upload-input
      (onSelectFile)="onSelectFile()"
      [maxFileSize]="maxFileSize"
      [accept]="accept"
      [variant]="variant"
      [testId]="testId"
    ></goab-file-upload-input>
  `,
})
class TestFileUploadInputComponent {
  maxFileSize?: string;
  accept?: string;
  variant: GoabFileUploadInputVariant = "button";
  testId?: string;

  onSelectFile() {
    /** do nothing **/
  }
}

describe("GoABFileUploadInput", () => {
  let fixture: ComponentFixture<TestFileUploadInputComponent>;
  let component: TestFileUploadInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestFileUploadInputComponent],
      imports: [GoabFileUploadInput],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestFileUploadInputComponent);
    component = fixture.componentInstance;

    component.maxFileSize = "10MB";
    component.accept = "image/*";
    component.variant = "dragdrop";
    component.testId = "foo";

    fixture.detectChanges();
  });

  it("should render successfully", () => {
    const el = fixture.debugElement.query(By.css("goa-file-upload-input")).nativeElement;

    expect(el?.getAttribute("maxfilesize")).toBe(component.maxFileSize);
    expect(el?.getAttribute("accept")).toBe(component.accept);
    expect(el?.getAttribute("variant")).toBe(component.variant);
    expect(el?.getAttribute("testid")).toBe(component.testId);
  });

  it("should handle onSelectFile event", () => {
    const onSelectFile = jest.spyOn(component, "onSelectFile");
    const el = fixture.debugElement.query(By.css("goa-file-upload-input")).nativeElement;
    fireEvent(el, new CustomEvent("_selectFile", { detail: {} }));

    expect(onSelectFile).toHaveBeenCalledTimes(1);
  });
});
