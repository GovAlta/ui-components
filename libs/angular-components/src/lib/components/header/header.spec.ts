import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabAppHeader } from "./header";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { fireEvent } from "@testing-library/dom";

@Component({
  standalone: true,
  imports: [GoabAppHeader],
  template: `
    <goab-app-header
      [heading]="heading"
      [secondaryText]="secondaryText"
      [url]="url"
      [maxContentWidth]="maxContentWidth"
      [fullMenuBreakpoint]="fullMenuBreakpoint"
      [testId]="testId"
      (onMenuClick)="onMenuClick()"
    >
      <a href="#nav">Navigation link</a>
    </goab-app-header>
  `,
})
class TestAppHeaderComponent {
  heading?: string;
  secondaryText?: string;
  url?: string;
  maxContentWidth?: string;
  fullMenuBreakpoint?: number;
  testId?: string;

  onMenuClick() {
    /* do nothing */
  }
}

@Component({
  standalone: true,
  imports: [GoabAppHeader],
  template: `
    <goab-app-header [heading]="heading">
      <span class="child-content">Content</span>
    </goab-app-header>
  `,
})
class TestAppHeaderNoMenuClickComponent {
  heading?: string;
}

describe("GoabAppHeader", () => {
  let fixture: ComponentFixture<TestAppHeaderComponent>;
  let component: TestAppHeaderComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabAppHeader, TestAppHeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestAppHeaderComponent);
    component = fixture.componentInstance;
  }));

  it("should render with version 2", fakeAsync(() => {
    component.heading = "Test heading";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-app-header")).nativeElement;
    expect(el).toBeTruthy();
    expect(el.getAttribute("version")).toBe("2");
  }));

  it("should render all properties", fakeAsync(() => {
    component.heading = "Service name";
    component.secondaryText = "Beta";
    component.url = "https://example.com";
    component.maxContentWidth = "800px";
    component.fullMenuBreakpoint = 1024;
    component.testId = "my-header";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-app-header")).nativeElement;
    expect(el.getAttribute("heading")).toBe("Service name");
    expect(el.getAttribute("secondarytext")).toBe("Beta");
    expect(el.getAttribute("url")).toBe("https://example.com");
    expect(el.getAttribute("maxcontentwidth")).toBe("800px");
    expect(el.getAttribute("fullmenubreakpoint")).toBe("1024");
    expect(el.getAttribute("testid")).toBe("my-header");
    expect(el.getAttribute("version")).toBe("2");
  }));

  it("should set hasmenuclickhandler to true when onMenuClick is bound", fakeAsync(() => {
    component.heading = "Test heading";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-app-header")).nativeElement;
    expect(el.getAttribute("hasmenuclickhandler")).toBe("true");
  }));

  it("should dispatch onMenuClick event", fakeAsync(() => {
    const onMenuClick = jest.spyOn(component, "onMenuClick");
    component.heading = "Test heading";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-app-header")).nativeElement;
    fireEvent(el, new CustomEvent("_menuClick"));
    expect(onMenuClick).toHaveBeenCalled();
  }));

  it("should render secondaryText as secondarytext attribute", fakeAsync(() => {
    component.heading = "Test heading";
    component.secondaryText = "Environment label";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-app-header")).nativeElement;
    expect(el.getAttribute("secondarytext")).toBe("Environment label");
  }));

  it("should project content into the slot", fakeAsync(() => {
    component.heading = "Test heading";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-app-header")).nativeElement;
    expect(el.querySelector("a[href='#nav']")).toBeTruthy();
  }));
});

describe("GoabAppHeader without onMenuClick", () => {
  let fixture: ComponentFixture<TestAppHeaderNoMenuClickComponent>;
  let component: TestAppHeaderNoMenuClickComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabAppHeader, TestAppHeaderNoMenuClickComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestAppHeaderNoMenuClickComponent);
    component = fixture.componentInstance;
  }));

  it("should set hasmenuclickhandler to false when onMenuClick is not bound", fakeAsync(() => {
    component.heading = "Test heading";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("goa-app-header")).nativeElement;
    expect(el.getAttribute("hasmenuclickhandler")).toBe("false");
  }));
});
