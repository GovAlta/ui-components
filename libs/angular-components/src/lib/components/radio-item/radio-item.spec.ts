import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabRadioItem } from "./radio-item";

@Component({
  standalone: true,
  imports: [GoabRadioItem],
  template: `
    <goab-radio-item
      name="test"
      [checked]="true"
      label="radio item text"
      [reveal]="revealTemplate"
      revealAriaLabel="Screen reader announcement for radio reveal content"
    >
      <ng-template #revealTemplate>
        <strong>A reveal slot</strong>
      </ng-template>
    </goab-radio-item>
  `,
})
class TestRadioItemWithRevealSlotComponent { }

describe("Radio item with reveal slot", () => {
  let fixture: ComponentFixture<TestRadioItemWithRevealSlotComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabRadioItem, TestRadioItemWithRevealSlotComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestRadioItemWithRevealSlotComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render with slot reveal", () => {
    const radioItemElement = fixture.debugElement.nativeElement.querySelector("goa-radio-item");
    const slotReveal = radioItemElement.querySelector("[slot='reveal']");
    expect(slotReveal.textContent).toContain("A reveal slot");
  });

  it("should pass the revealAriaLabel property to the web component", () => {
    const radioItemElement = fixture.debugElement.nativeElement.querySelector("goa-radio-item");
    expect(radioItemElement.getAttribute("revealarialabel")).toBe("Screen reader announcement for radio reveal content");
  });
});
