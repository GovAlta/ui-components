import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabSnackbar } from "./snackbar";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { Spacing } from "@abgov/ui-components-common";

@Component({
  template: `
    <goab-snackbar
      [type]="type"
      [duration]="duration"
      [progress]="progress"
      [testId]="testId"
      [visible]="visible"
      [verticalPosition]="verticalPosition"
      [horizontalPosition]="horizontalPosition"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
      [actions]="actionsTemplate"
    >
      Snackbar content
    </goab-snackbar>

    <ng-template #actionsTemplate>
      <button>Action Button</button>
    </ng-template>
  `,
})
class TestSnackbarComponent {
  type?: "basic" | "success" | "failure";
  duration?: number;
  progress?: number;
  testId?: string;
  visible?: boolean;
  verticalPosition?: "top" | "bottom";
  horizontalPosition?: "left" | "center" | "right";
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
}

describe("GoABSnackbar", () => {
  let fixture: ComponentFixture<TestSnackbarComponent>;
  let component: TestSnackbarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabSnackbar],
      declarations: [TestSnackbarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestSnackbarComponent);
    component = fixture.componentInstance;

    // Set default values
    component.type = "basic";
    component.duration = 4000;
    component.progress = -1;
    component.testId = "test-snackbar";
    component.visible = true;
    component.verticalPosition = "bottom";
    component.horizontalPosition = "left";
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";
    fixture.detectChanges();
  });

  it("should render properties", () => {
    const snackbarElement = fixture.debugElement.query(
      By.css("goa-snackbar"),
    ).nativeElement;

    expect(snackbarElement.getAttribute("type")).toBe(component.type);
    expect(snackbarElement.getAttribute("duration")).toBe(component.duration?.toString());
    expect(snackbarElement.getAttribute("progress")).toBe(component.progress?.toString());
    expect(snackbarElement.getAttribute("testid")).toBe(component.testId);
    expect(snackbarElement.getAttribute("visible")).toBe(component.visible?.toString());
    expect(snackbarElement.getAttribute("verticalposition")).toBe(
      component.verticalPosition,
    );
    expect(snackbarElement.getAttribute("horizontalposition")).toBe(
      component.horizontalPosition,
    );
    expect(snackbarElement.getAttribute("mt")).toBe(component.mt);
    expect(snackbarElement.getAttribute("mr")).toBe(component.mr);
    expect(snackbarElement.getAttribute("mb")).toBe(component.mb);
    expect(snackbarElement.getAttribute("ml")).toBe(component.ml);
    expect(snackbarElement.textContent.trim()).toContain("Snackbar content");
  });

  it("should render with success type", () => {
    component.type = "success";
    fixture.detectChanges();

    const snackbarElement = fixture.debugElement.query(
      By.css("goa-snackbar"),
    ).nativeElement;
    expect(snackbarElement.getAttribute("type")).toBe("success");
  });

  it("should render with failure type", () => {
    component.type = "failure";
    fixture.detectChanges();

    const snackbarElement = fixture.debugElement.query(
      By.css("goa-snackbar"),
    ).nativeElement;
    expect(snackbarElement.getAttribute("type")).toBe("failure");
  });

  it("should render with custom vertical position", () => {
    component.verticalPosition = "top";
    fixture.detectChanges();

    const snackbarElement = fixture.debugElement.query(
      By.css("goa-snackbar"),
    ).nativeElement;
    expect(snackbarElement.getAttribute("verticalposition")).toBe("top");
  });

  it("should render with custom horizontal position", () => {
    component.horizontalPosition = "center";
    fixture.detectChanges();

    const snackbarElement = fixture.debugElement.query(
      By.css("goa-snackbar"),
    ).nativeElement;
    expect(snackbarElement.getAttribute("horizontalposition")).toBe("center");
  });

  it("should render with progress bar", () => {
    component.progress = 50;
    fixture.detectChanges();

    const snackbarElement = fixture.debugElement.query(
      By.css("goa-snackbar"),
    ).nativeElement;
    expect(snackbarElement.getAttribute("progress")).toBe("50");
  });

  it("should render with actions slot", () => {
    const snackbarElement = fixture.debugElement.query(
      By.css("goa-snackbar"),
    ).nativeElement;
    const actionsSlot = snackbarElement.querySelector("[slot='actions']");
    const button = actionsSlot?.querySelector("button");

    expect(actionsSlot).toBeTruthy();
    expect(button?.textContent.trim()).toBe("Action Button");
  });
});
