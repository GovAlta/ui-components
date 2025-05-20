import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GoabMultiActionButton } from "./multi-action-button";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
} from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";

// Import the web components
// eslint-disable-next-line
import '@abgov/web-components';

@Component({
  template: `
    <goab-multi-action-button testId="multi-action-button" text="Actions" type="primary">
      <goab-button action="close" type="blank" testId="button1" (onClick)="click()">Test 1</goab-button>
      <goab-button action="close" type="blank" testId="button2" (onClick)="click()">Test 2</goab-button>
      <goab-button action="close" type="blank" testId="button3" (onClick)="click()">Test 3</goab-button>
    </goab-multi-action-button>
  `,
})
class TestMultiActionButtonComponent {
  click() {
    /* do nothing */
  }
}

describe("goab-multi-action-button", () => {
  let fixture: ComponentFixture<TestMultiActionButtonComponent>;
  let component: TestMultiActionButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestMultiActionButtonComponent],
      imports: [GoabMultiActionButton],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestMultiActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should render", async() => {
    const clickSpy = jest.spyOn(component, "click");
    const multiActionButtonEl = fixture.debugElement.query(By.css("goa-multi-action-button")).nativeElement;
    const shadowRoot = multiActionButtonEl.shadowRoot;
    const multiActionButton = shadowRoot.querySelector('goa-button[slot="target"]');
    // Initially the chevron icon is down
    const goaIcon = multiActionButton.shadowRoot.querySelector('goa-icon');
    const chevronIcon = goaIcon.shadowRoot.querySelector("[role='img']");
    expect(chevronIcon.getAttribute("data-type")).toBe("chevron-down");

    // should open action menu
    fireEvent(multiActionButton, new CustomEvent("click", { bubbles: true }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(chevronIcon.getAttribute("data-type")).toBe("chevron-up");
    const buttons = multiActionButtonEl.querySelectorAll("goab-button");
    expect(buttons.length).toBe(3);
    // click button
    fireEvent(buttons[0] as Element, new CustomEvent("onClick"));
    fixture.detectChanges();

    expect(clickSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});
