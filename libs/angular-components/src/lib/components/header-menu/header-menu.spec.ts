import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabAppHeaderMenu } from "./header-menu";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabIconType } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabAppHeaderMenu],
  template: `
    <goab-app-header-menu
      [heading]="heading"
      [leadingIcon]="leadingIcon"
      [testId]="testId"
      [slotName]="slotName"
    >
      <a href="#dashboard">Dashboard</a>
      <a href="#accounts">Accounts</a>
    </goab-app-header-menu>
  `,
})
class TestAppHeaderMenuComponent {
  heading?: string;
  leadingIcon?: GoabIconType;
  testId?: string;
  slotName?: string;
}

describe("GoabAppHeaderMenu", () => {
  let fixture: ComponentFixture<TestAppHeaderMenuComponent>;
  let component: TestAppHeaderMenuComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabAppHeaderMenu, TestAppHeaderMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestAppHeaderMenuComponent);
    component = fixture.componentInstance;
  }));

  it("should render with heading", fakeAsync(() => {
    component.heading = "Menu label";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-app-header-menu")).nativeElement;
    expect(el).toBeTruthy();
    expect(el.getAttribute("heading")).toBe("Menu label");
  }));

  it("should render all properties", fakeAsync(() => {
    component.heading = "Menu label";
    component.leadingIcon = "search";
    component.testId = "my-menu";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-app-header-menu")).nativeElement;
    expect(el.getAttribute("heading")).toBe("Menu label");
    expect(el.getAttribute("leadingicon")).toBe("search");
    expect(el.getAttribute("testid")).toBe("my-menu");
  }));

  it("should render projected content", fakeAsync(() => {
    component.heading = "Menu label";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-app-header-menu")).nativeElement;
    expect(el.querySelector("a[href='#dashboard']")).toBeTruthy();
    expect(el.querySelector("a[href='#accounts']")).toBeTruthy();
  }));

  it("should set slot attribute on host element when slotName is provided", fakeAsync(() => {
    component.heading = "Menu label";
    component.slotName = "navigation";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const host = fixture.debugElement.query(
      By.css("goab-app-header-menu"),
    ).nativeElement;
    expect(host.getAttribute("slot")).toBe("navigation");
  }));

  it("should not set slot attribute when slotName is not provided", fakeAsync(() => {
    component.heading = "Menu label";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const host = fixture.debugElement.query(
      By.css("goab-app-header-menu"),
    ).nativeElement;
    expect(host.getAttribute("slot")).toBeNull();
  }));

  it("should render without leadingIcon", fakeAsync(() => {
    component.heading = "Menu label";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-app-header-menu")).nativeElement;
    expect(el.getAttribute("leadingicon")).toBeNull();
  }));
});
