import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabPublicFormPage } from "./public-form-page";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import {
  GoabPublicFormPageStep,
  GoabPublicFormPageButtonVisibility,
  GoabPublicFormPageOnCompleteDetail,
  GoabPublicFormPageOnFieldsetChangeDetail,
  GoabPublicFormPageOnContinueDetail,
  Spacing,
} from "@abgov/ui-components-common";

@Component({
  template: `
    <goab-public-form-page
      [id]="id"
      [heading]="heading"
      [subHeading]="subHeading"
      [summaryHeading]="summaryHeading"
      [sectionTitle]="sectionTitle"
      [backUrl]="backUrl"
      [type]="type"
      [buttonText]="buttonText"
      [buttonVisibility]="buttonVisibility"
      [first]="first"
      [last]="last"
      [mt]="mt"
      [mr]="mr"
      [mb]="mb"
      [ml]="ml"
      (onContinue)="handleContinue($event)"
      (onBack)="handleBack()"
      (onFieldsetChange)="handleFieldsetChange($event)"
      (onComplete)="handleComplete($event)"
    >
      <div data-testid="content">Test content</div>
    </goab-public-form-page>
  `,
})
class TestPublicFormPageComponent {
  id = "test-page";
  heading = "Test Heading";
  subHeading = "Test Subheading";
  summaryHeading = "Test Summary";
  sectionTitle = "Test Section";
  backUrl = "/back";
  type: GoabPublicFormPageStep = "step";
  buttonText = "Continue";
  buttonVisibility: GoabPublicFormPageButtonVisibility = "visible";
  first = false;
  last = false;
  mt = "s" as Spacing;
  mr = "m" as Spacing;
  mb = "l" as Spacing;
  ml = "xl" as Spacing;

  handleContinue(event: GoabPublicFormPageOnContinueDetail): void {/** do nothing **/}
  handleBack(): void {/** do nothing **/}
  handleFieldsetChange(event: GoabPublicFormPageOnFieldsetChangeDetail): void {/** do nothing **/}
  handleComplete(event: GoabPublicFormPageOnCompleteDetail): void {/** do nothing **/}
}

describe("GoabPublicFormPage", () => {
  let fixture: ComponentFixture<TestPublicFormPageComponent>;
  let component: TestPublicFormPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestPublicFormPageComponent],
      imports: [GoabPublicFormPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPublicFormPageComponent);
    component = fixture.componentInstance;
  });

  it("should render with properties", () => {
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-public-form-page")).nativeElement;

    expect(el?.getAttribute("heading")).toBe(component.heading);
    expect(el?.getAttribute("sub-heading")).toBe(component.subHeading);
    expect(el?.getAttribute("summary-heading")).toBe(component.summaryHeading);
    expect(el?.getAttribute("section-title")).toBe(component.sectionTitle);
    expect(el?.getAttribute("back-url")).toBe(component.backUrl);
    expect(el?.getAttribute("type")).toBe(component.type);
    expect(el?.getAttribute("button-text")).toBe(component.buttonText);
    expect(el?.getAttribute("button-visibility")).toBe(component.buttonVisibility);
    expect(el?.getAttribute("first")).toBe(component.first.toString());
    expect(el?.getAttribute("last")).toBe(component.last.toString());
    expect(el?.getAttribute("mt")).toBe(component.mt);
    expect(el?.getAttribute("mr")).toBe(component.mr);
    expect(el?.getAttribute("mb")).toBe(component.mb);
    expect(el?.getAttribute("ml")).toBe(component.ml);

    // Content is rendered
    expect(el.querySelector("[data-testid='content']")).toBeTruthy();
  });

  it("should emit onContinue event", () => {
    fixture.detectChanges();
    const spy = jest.spyOn(component, "handleContinue");

    const el = fixture.debugElement.query(By.css("goa-public-form-page")).nativeElement;
    const detail: GoabPublicFormPageOnContinueDetail = {
      el: document.createElement("form"),
      state: {
        "field1": {
          name: "field1",
          label: "Field 1",
          value: "test",
          order: 1
        }
      },
      cancelled: false
    };

    el.dispatchEvent(new CustomEvent("_continue", { detail }));
    expect(spy).toHaveBeenCalledWith(detail);
  });

  it("should emit onBack event", () => {
    fixture.detectChanges();
    const spy = jest.spyOn(component, "handleBack");

    const el = fixture.debugElement.query(By.css("goa-public-form-page")).nativeElement;
    el.dispatchEvent(new CustomEvent("_back"));
    expect(spy).toHaveBeenCalled();
  });

  it("should emit onFieldsetChange event", () => {
    fixture.detectChanges();
    const spy = jest.spyOn(component, "handleFieldsetChange");

    const el = fixture.debugElement.query(By.css("goa-public-form-page")).nativeElement;
    const detail: GoabPublicFormPageOnFieldsetChangeDetail = {
      id: "test-fieldset",
      state: {
        heading: "Test Fieldset",
        data: {
          "field1": {
            name: "field1",
            label: "Field 1",
            value: "test",
            order: 1
          }
        }
      },
      dispatchOn: "continue"
    };

    el.dispatchEvent(new CustomEvent("_fieldsetChange", { detail }));
    expect(spy).toHaveBeenCalledWith(detail);
  });

  it("should emit onComplete event", () => {
    fixture.detectChanges();
    const spy = jest.spyOn(component, "handleComplete");

    const el = fixture.debugElement.query(By.css("goa-public-form-page")).nativeElement;
    const detail: GoabPublicFormPageOnCompleteDetail = {
      el: document.createElement("form"),
      state: {
        "field1": {
          name: "field1",
          label: "Field 1",
          value: "test",
          order: 1
        }
      },
      cancelled: false
    };

    el.dispatchEvent(new CustomEvent("_complete", { detail }));
    expect(spy).toHaveBeenCalledWith(detail);
  });

  it("should have default values", () => {
    const page = new GoabPublicFormPage();
    expect(page.id).toBe("");
    expect(page.heading).toBe("");
    expect(page.subHeading).toBe("");
    expect(page.summaryHeading).toBe("");
    expect(page.sectionTitle).toBe("");
    expect(page.backUrl).toBe("");
    expect(page.type).toBe("step");
    expect(page.buttonText).toBe("");
    expect(page.buttonVisibility).toBe("visible");
    expect(page.first).toBe(false);
    expect(page.last).toBe(false);
  });
});
