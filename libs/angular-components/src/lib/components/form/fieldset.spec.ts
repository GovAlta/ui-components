import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabFieldset } from "./fieldset";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { GoabFieldsetOnContinueDetail } from "@abgov/ui-components-common";

@Component({
  template: `
    <goab-fieldset
      [sectionTitle]="sectionTitle"
      [dispatchOn]="dispatchOn"
      [id]="id"
      (onContinue)="handleContinue($event)"
    >
      <div data-testid="content">Test content</div>
    </goab-fieldset>
  `,
})
class TestFieldsetComponent {
  sectionTitle?: string;
  dispatchOn: "change" | "continue" = "continue";
  id?: string;

  handleContinue(event: GoabFieldsetOnContinueDetail): void {/** do nothing **/}
}

describe("GoabFieldSet", () => {
  let fixture: ComponentFixture<TestFieldsetComponent>;
  let component: TestFieldsetComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestFieldsetComponent],
      imports: [GoabFieldset],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestFieldsetComponent);
    component = fixture.componentInstance;

    component.sectionTitle = "Test Section";
    component.dispatchOn = "continue";
    component.id = "test-fieldset";
  });

  it("should render with properties", () => {
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-fieldset")).nativeElement;

    expect(el?.getAttribute("section-title")).toBe(component.sectionTitle);
    expect(el?.getAttribute("dispatch-on")).toBe(component.dispatchOn);
    expect(el?.getAttribute("id")).toBe(component.id);

    // Content is rendered
    expect(el?.querySelector("[data-testid='content']")).toBeTruthy();
  });

  it("should emit onContinue event", () => {
    fixture.detectChanges();
    const spy = jest.spyOn(component, "handleContinue");

    const el = fixture.debugElement.query(By.css("goa-fieldset")).nativeElement;
    const detail = { value: "test" };

    el.dispatchEvent(new CustomEvent("_continue", { detail }));
    expect(spy).toHaveBeenCalledWith(detail);
  });
});
