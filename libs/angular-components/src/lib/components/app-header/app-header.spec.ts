import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabAppHeader } from "./app-header";
import { GoabAppHeaderMenu } from "../app-header-menu/app-header-menu";
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

@Component({
  standalone: true,
  imports: [GoabAppHeader, GoabAppHeaderMenu],
  template: `
    <ng-template #bannerRef><span>Banner content</span></ng-template>
    <ng-template #phaseRef><span>Beta</span></ng-template>
    <ng-template #navigationRef>
      <a href="/home">Home</a>
      <goab-app-header-menu heading="Applications">
        <a href="/applications">Applications</a>
      </goab-app-header-menu>
    </ng-template>
    <ng-template #utilitiesRef>
      <button>Help</button>
      <button>Account</button>
    </ng-template>
    <goab-app-header
      heading="Test heading"
      [banner]="bannerRef"
      [phase]="phaseRef"
      [navigation]="navigationRef"
      [utilities]="utilitiesRef"
    />
  `,
})
class TestAppHeaderSlotsComponent {}

@Component({
  standalone: true,
  imports: [GoabAppHeader],
  template: `
    <ng-template #signedOutUtilitiesRef>
      <button type="button">Sign in</button>
    </ng-template>
    <ng-template #signedInUtilitiesRef>
      <button type="button">Help</button>
      <a href="/account">Account</a>
    </ng-template>
    <goab-app-header
      heading="Test heading"
      [utilities]="isSignedIn ? signedInUtilitiesRef : signedOutUtilitiesRef"
    />
  `,
})
class TestAppHeaderDynamicSlotsComponent {
  isSignedIn = false;
}

@Component({
  standalone: true,
  imports: [GoabAppHeader],
  template: `<goab-app-header heading="Test heading" />`,
})
class TestAppHeaderNoSlotsComponent {}

function getDirectSlottedChildren(el: HTMLElement, slot: string): Element[] {
  return Array.from(el.children).filter((child) => child.getAttribute("slot") === slot);
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

describe("GoabAppHeader slot templates", () => {
  let fixture: ComponentFixture<TestAppHeaderSlotsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabAppHeader, TestAppHeaderSlotsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestAppHeaderSlotsComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render banner template into a div with slot='banner'", fakeAsync(() => {
    const el = fixture.debugElement.query(By.css("goa-app-header")).nativeElement;
    expect(el.querySelector("[slot='banner']")?.textContent).toContain("Banner content");
  }));

  it("should render phase template into a div with slot='phase'", fakeAsync(() => {
    const el = fixture.debugElement.query(By.css("goa-app-header")).nativeElement;
    expect(el.querySelector("[slot='phase']")?.textContent).toContain("Beta");
  }));

  it("should render navigation template root items directly with slot='navigation'", fakeAsync(() => {
    const el = fixture.debugElement.query(By.css("goa-app-header")).nativeElement;
    const navigationItems = getDirectSlottedChildren(el, "navigation");

    expect(el.querySelector("div[slot='navigation']")).toBeNull();
    expect(navigationItems).toHaveLength(2);
    expect(el.querySelector("a[slot='navigation'][href='/home']")?.textContent).toContain("Home");
    expect(el.querySelector("goab-app-header-menu[slot='navigation']")?.textContent).toContain("Applications");
  }));

  it("should render utilities template root items directly with slot='utilities'", fakeAsync(() => {
    const el = fixture.debugElement.query(By.css("goa-app-header")).nativeElement;
    const utilityItems = getDirectSlottedChildren(el, "utilities");

    expect(el.querySelector("div[slot='utilities']")).toBeNull();
    expect(utilityItems).toHaveLength(2);
    expect(utilityItems[0].textContent).toContain("Help");
    expect(utilityItems[1].textContent).toContain("Account");
  }));
});

describe("GoabAppHeader dynamic slot templates", () => {
  let fixture: ComponentFixture<TestAppHeaderDynamicSlotsComponent>;
  let component: TestAppHeaderDynamicSlotsComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabAppHeader, TestAppHeaderDynamicSlotsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestAppHeaderDynamicSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should update utilities template content when the TemplateRef changes", fakeAsync(() => {
    const el = fixture.debugElement.query(By.css("goa-app-header")).nativeElement;
    let utilityItems = getDirectSlottedChildren(el, "utilities");
    expect(utilityItems).toHaveLength(1);
    expect(utilityItems[0].textContent).toContain("Sign in");

    component.isSignedIn = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    utilityItems = getDirectSlottedChildren(el, "utilities");
    expect(utilityItems).toHaveLength(2);
    expect(utilityItems[0].textContent).toContain("Help");
    expect(utilityItems[1].textContent).toContain("Account");
    expect(el.textContent).not.toContain("Sign in");
  }));
});

describe("GoabAppHeader empty slot templates", () => {
  let fixture: ComponentFixture<TestAppHeaderNoSlotsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabAppHeader, TestAppHeaderNoSlotsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestAppHeaderNoSlotsComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should not render slot divs when slot templates are not provided", fakeAsync(() => {
    const el = fixture.debugElement.query(By.css("goa-app-header")).nativeElement;
    expect(el.querySelector("[slot='banner']")).toBeNull();
    expect(el.querySelector("[slot='phase']")).toBeNull();
    expect(el.querySelector("[slot='navigation']")).toBeNull();
    expect(el.querySelector("[slot='utilities']")).toBeNull();
  }));
});
