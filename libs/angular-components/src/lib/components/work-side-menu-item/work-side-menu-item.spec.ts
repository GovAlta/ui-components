import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabWorkSideMenuItem } from "./work-side-menu-item";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabWorkSideMenuItem],
  template: `
    <goab-work-side-menu-item
      [label]="label"
      [url]="url"
      [badge]="badge"
      [current]="current"
      [divider]="divider"
      [icon]="icon"
      [testId]="testId"
      [type]="type"
    >
    </goab-work-side-menu-item>
  `,
})
class TestWorkSideMenuItemComponent {
  label = "Test label";
  url = "/test";
  badge = "Test badge";
  current = true;
  divider = true;
  icon = "triangle";
  testId = "test-id";
  type = "normal";
}

@Component({
  standalone: true,
  imports: [GoabWorkSideMenuItem],
  template: `
    <goab-work-side-menu-item
      [label]="label"
      [url]="url"
      [popoverContent]="popoverTpl"
    >
    </goab-work-side-menu-item>
    <ng-template #popoverTpl>
      <div class="popover-test-content">Popover content here</div>
    </ng-template>
  `,
})
class TestWorkSideMenuItemWithPopoverComponent {
  label = "Popover item";
  url = "/popover";
}

describe("GoabWorkSideMenuItem", () => {
  it("should render and set the props correctly", fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestWorkSideMenuItemComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestWorkSideMenuItemComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const menuItemElement = fixture.debugElement.query(
      By.css("goa-work-side-menu-item"),
    ).nativeElement;
    expect(menuItemElement.getAttribute("label")).toBe("Test label");
    expect(menuItemElement.getAttribute("url")).toBe("/test");
    expect(menuItemElement.getAttribute("badge")).toBe("Test badge");
    expect(menuItemElement.getAttribute("current")).toBe("true");
    expect(menuItemElement.getAttribute("divider")).toBe("true");
    expect(menuItemElement.getAttribute("icon")).toBe("triangle");
    expect(menuItemElement.getAttribute("testid")).toBe("test-id");
    expect(menuItemElement.getAttribute("type")).toBe("normal");
  }));

  it("should render popover content into the popoverContent slot", fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestWorkSideMenuItemWithPopoverComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestWorkSideMenuItemWithPopoverComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const slotDiv = fixture.debugElement.query(
      By.css('[slot="popoverContent"]'),
    );
    expect(slotDiv).toBeTruthy();

    const popoverContent = fixture.debugElement.query(
      By.css(".popover-test-content"),
    );
    expect(popoverContent).toBeTruthy();
    expect(popoverContent.nativeElement.textContent).toBe("Popover content here");
  }));
});
