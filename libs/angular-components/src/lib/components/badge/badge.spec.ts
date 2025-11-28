import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabBadge } from "./badge";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabBadgeType, Spacing } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabBadge],
  template: `
    <goab-badge
      [type]="type"
      [icon]="icon"
      [content]="content"
      [ariaLabel]="ariaLabel"
      [testId]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    ></goab-badge>
  `,
})
class TestBadgeComponent {
  type?: GoabBadgeType;
  content?: string;
  testId?: string;
  icon?: boolean;
  ariaLabel?: string;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
}

@Component({
  standalone: true,
  imports: [GoabBadge],
  template: ` <goab-badge [type]="type" [content]="content"></goab-badge> `,
})
class TestBadgeNoIconComponent {
  type?: GoabBadgeType;
  content?: string;
}

describe("GoABBadge", () => {
  let fixture: ComponentFixture<TestBadgeComponent>;
  let component: TestBadgeComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabBadge, TestBadgeComponent, TestBadgeNoIconComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it("should render and set the props correctly", fakeAsync(() => {
    fixture = TestBed.createComponent(TestBadgeComponent);
    component = fixture.componentInstance;
    component.type = "information";
    component.content = "Information";
    component.icon = true;
    component.ariaLabel = "123";
    component.testId = "test-id";
    component.mt = "xs" as Spacing;
    component.mb = "m" as Spacing;
    component.ml = "l" as Spacing;
    component.mr = "xl" as Spacing;

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const badgeElement = fixture.debugElement.query(By.css("goa-badge")).nativeElement;
    expect(badgeElement.getAttribute("type")).toBe("information");
    expect(badgeElement.getAttribute("content")).toBe("Information");
    expect(badgeElement.getAttribute("icon")).toBe("true");
    expect(badgeElement.getAttribute("arialabel")).toBe("123");
    expect(badgeElement.getAttribute("testid")).toBe("test-id");
    expect(badgeElement.getAttribute("mt")).toBe(component.mt);
    expect(badgeElement.getAttribute("mb")).toBe(component.mb);
    expect(badgeElement.getAttribute("ml")).toBe(component.ml);
    expect(badgeElement.getAttribute("mr")).toBe(component.mr);
  }));

  it("should not set icon attribute by default (icon undefined)", fakeAsync(() => {
    const noIconFixture = TestBed.createComponent(TestBadgeNoIconComponent);
    const noIconComponent = noIconFixture.componentInstance;
    noIconComponent.type = "information";
    noIconComponent.content = "Information";
    noIconFixture.detectChanges();
    tick();
    noIconFixture.detectChanges();
    const badgeElement = noIconFixture.debugElement.query(
      By.css("goa-badge"),
    ).nativeElement;
    expect(badgeElement.getAttribute("icon")).toBe("false");
  }));

  it("should not render icon when icon is false", fakeAsync(() => {
    fixture = TestBed.createComponent(TestBadgeComponent);
    component = fixture.componentInstance;
    component.type = "information";
    component.content = "Information";
    component.icon = false;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const badgeElement = fixture.debugElement.query(By.css("goa-badge")).nativeElement;
    expect(badgeElement.getAttribute("icon")).toBe("false");
  }));
});
