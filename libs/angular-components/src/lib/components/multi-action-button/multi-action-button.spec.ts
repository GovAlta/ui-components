import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GoabMultiActionButton } from "./multi-action-button";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
} from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";

@Component({
  template: `
    <goab-multi-action-button>
      <goab-button action="close" type="blank" (onClick)="click()">Test 1</goab-button>
      <goab-button action="close" type="blank" (onClick)="click()">Test 2</goab-button>
      <goab-button action="close" type="blank" (onClick)="click()">Test 3</goab-button>
    </goab-multi-action-button>
  `,
})
class TestMultiActionButtonComponent {
  text = "Actions";
  type = "primary";

  click() {
    /* do nothing */
  }
}

describe("GoABModal", () => {
  let fixture: ComponentFixture<TestMultiActionButtonComponent>;
  let component: TestMultiActionButtonComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestMultiActionButtonComponent],
      imports: [GoabMultiActionButton],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestMultiActionButtonComponent);
    component = fixture.componentInstance;
    component.text = "Actions";
    component.type = "primary";
    fixture.detectChanges();
  });

  it("should render", () => {
    const menuButtonEl = fixture.debugElement.query(By.css("goa-multi-action-button")).nativeElement;
    fireEvent(menuButtonEl, new CustomEvent("_click"));

    // const onClick = jest.spyOn(component, "onClick");
    // should open action menu

    // click button

    // action associated with button should be triggered
  });
});
