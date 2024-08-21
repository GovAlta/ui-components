import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabBlock } from "./block";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoabBlockAlignment,
  GoabBlockDirection,
  Spacing,
} from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <goab-block
      [gap]="gap"
      [direction]="direction"
      [alignment]="alignment"
      [testId]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    >
      <div>Block content</div>
    </goab-block>
  `,
})
class TestBlockComponent {
  gap?: Spacing;
  direction?: GoabBlockDirection;
  alignment?: GoabBlockAlignment;
  testId?: string;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
}

describe("GoABBlock", () => {
  let fixture: ComponentFixture<TestBlockComponent>;
  let component: TestBlockComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabBlock],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TestBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestBlockComponent);
    component = fixture.componentInstance;
    component.gap = "3xs" as Spacing;
    component.direction = "row" as GoabBlockDirection;
    component.alignment = "center" as GoabBlockAlignment;
    component.testId = "blockTestId";
    component.mt = "sm" as Spacing;
    component.mb = "m" as Spacing;
    component.ml = "l" as Spacing;
    component.mr = "xl" as Spacing;
    fixture.detectChanges();
  });

  it("should render", () => {
    const blockElement = fixture.debugElement.query(By.css("goa-block")).nativeElement;
    expect(blockElement.getAttribute("gap")).toBe(component.gap);
    expect(blockElement.getAttribute("direction")).toBe(component.direction);
    expect(blockElement.getAttribute("alignment")).toBe(component.alignment);
    expect(blockElement.getAttribute("data-testid")).toBe(component.testId);
    expect(blockElement.getAttribute("mt")).toBe(component.mt);
    expect(blockElement.getAttribute("mb")).toBe(component.mb);
    expect(blockElement.getAttribute("ml")).toBe(component.ml);
    expect(blockElement.getAttribute("mr")).toBe(component.mr);
    const blockContent = blockElement.querySelector("div");
    expect(blockContent.textContent).toContain("Block content");
  });
});
