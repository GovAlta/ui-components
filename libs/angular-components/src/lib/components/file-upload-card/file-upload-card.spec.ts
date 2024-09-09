import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabFileUploadCard } from "./file-upload-card";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Spacing } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";

@Component({
  template: `
    <goab-file-upload-card
      [filename]="filename"
      [size]="size"
      [type]="type"
      [progress]="progress"
      [error]="error"
      [testId]="testId"
      [mt]="mt"
      [mb]="mb"
      [mr]="mr"
      [ml]="ml"
      (onCancel)="onCancel()"
      (onDelete)="onDelete()"
    ></goab-file-upload-card>
  `,
})
class TestGoABFileUploadComponent {
  filename = "";
  mt?: Spacing;
  mb?: Spacing;
  mr?: Spacing;
  ml?: Spacing;
  size?: number;
  type?: string;
  progress?: number;
  error?: string;
  testId?: string;

  onCancel() {
    /** do nothing **/
  }

  onDelete() {
    /** do nothing **/
  }
}

describe("GoABFileUploadCard", () => {
  let fixture: ComponentFixture<TestGoABFileUploadComponent>;
  let component: TestGoABFileUploadComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestGoABFileUploadComponent],
      imports: [GoabFileUploadCard],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestGoABFileUploadComponent);
    component = fixture.componentInstance;
  });
  it("should render with base params", () => {
    component.filename = "foo.png";
    component.size = 1e3;
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-file-upload-card")).nativeElement;
    expect(el?.getAttribute("filename")).toBe(component.filename);
    expect(el?.getAttribute("size")).toBe("1000");
  });
  it("should render with additional params", () => {
    component.filename = "foo.png";
    component.size = 1e3;
    component.type = "image/png";
    component.progress = 23;
    component.error = "true";
    component.testId = "foo";
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-file-upload-card")).nativeElement;
    expect(el?.getAttribute("filename")).toBe("foo.png");
    expect(el?.getAttribute("size")).toBe("1000");
    expect(el?.getAttribute("type")).toBe("image/png");
    expect(el?.getAttribute("progress")).toBe("23");
    expect(el?.getAttribute("error")).toBe("true");
    expect(el?.getAttribute("data-testid")).toBe("foo");
  });

  it("should dispatch an even when delete is clicked and upload is complete", () => {
    const onCancel = jest.spyOn(component, "onCancel");
    component.filename = "foo.png";
    component.size = 1e3;
    component.progress = 23;

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-file-upload-card")).nativeElement;
    fireEvent(el, new CustomEvent("_cancel"));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
  it("should dispatch an event when an error occurs", () => {
    const onDelete = jest.spyOn(component, "onDelete");
    component.filename = "foo.png";
    component.size = 1e3;
    component.error = "fail";

    const el = fixture.debugElement.query(By.css("goa-file-upload-card")).nativeElement;
    fireEvent(el, new CustomEvent("_delete"));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
