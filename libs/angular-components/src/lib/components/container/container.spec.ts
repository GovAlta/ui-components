import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABContainer } from "./container";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoABContainerAccent,
  GoABContainerPadding,
  GoABContainerType,
  GoABContainerWidth, Spacing,
} from "@abgov/ui-components-common";
import { GoABButton } from "../button/button";
import { By } from "@angular/platform-browser";

@Component({
  template: `
  <goab-container [type]="type"
                  [accent]="accent"
                  [padding]="padding"
                  [width]="width"
                  [testId]="testId"
                  [mt]="mt"
                  [mr]="mr"
                  [mb]="mb"
                  [ml]="ml"
                  [actions]="actions"
                  [title]="title">
    <ng-template #actions>
      <goab-button (onClick)="onClick()">Save</goab-button>
    </ng-template>
    <ng-template #title>
      <div>This is a title</div>
    </ng-template>

    Container content
  </goab-container>
  `
})
class TestContainerComponent {
  type?: GoABContainerType = "interactive";
  accent?: GoABContainerAccent = "filled";
  padding?: GoABContainerPadding = "relaxed";
  width?: GoABContainerWidth = "full";
  testId?: string;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;

  onClick() {
    /* do nothing */
  }
}

describe("GoABContainer", () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let component: TestContainerComponent;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [GoABButton, GoABContainer],
      declarations: [TestContainerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TestContainerComponent);
    component = fixture.componentInstance;

    // assign values
    component.type = "interactive";
    component.accent = "thick";
    component.padding = "relaxed";
    component.mt = "s";
    component.mr = "m";
    component.mb = "l";
    component.ml = "xl";
    component.width = "content";

    fixture.detectChanges();
  })

  it("should render", () => {
    const el = fixture.debugElement.query(By.css("goa-container")).nativeElement;
    expect(el).toBeTruthy();

   expect(el?.getAttribute("type")).toBe(component.type);
   expect(el?.getAttribute("accent")).toBe(component.accent);
   expect(el?.getAttribute("padding")).toBe(component.padding);
   expect(el?.getAttribute("mt")).toBe(component.mt);
   expect(el?.getAttribute("mr")).toBe(component.mr);
   expect(el?.getAttribute("mb")).toBe(component.mb);
   expect(el?.getAttribute("ml")).toBe(component.ml);
   expect(el?.getAttribute("width")).toBe(component.width);

   expect(el?.querySelector("[slot='title']")?.innerHTML).toContain("This is a title");
   expect(el?.querySelector("[slot='actions']")?.querySelector("goa-button")).not.toBeFalsy();

   expect(el?.innerHTML).toContain("Container content");
  })
})
