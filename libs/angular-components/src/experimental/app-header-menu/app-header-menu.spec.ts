import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabxAppHeaderMenu } from "./app-header-menu";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabIconType } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabxAppHeaderMenu],
  template: `
    <goabx-app-header-menu
      [heading]="heading"
      [leadingIcon]="leadingIcon"
      [testId]="testId"
    >
      <a href="#dashboard">Dashboard</a>
      <a href="#accounts">Accounts</a>
    </goabx-app-header-menu>
  `,
})
class TestAppHeaderMenuComponent {
  heading?: string;
  leadingIcon?: GoabIconType;
  testId?: string;
}

describe("GoabxAppHeaderMenu", () => {
  let fixture: ComponentFixture<TestAppHeaderMenuComponent>;
  let component: TestAppHeaderMenuComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabxAppHeaderMenu, TestAppHeaderMenuComponent],
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

  it("should render without leadingIcon", fakeAsync(() => {
    component.heading = "Menu label";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-app-header-menu")).nativeElement;
    expect(el.getAttribute("leadingicon")).toBeNull();
  }));
});
