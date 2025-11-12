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
    >
      <a href="#">Home</a>
    </goab-app-header-menu>
  `,
})
class TestAppHeaderMenuComponent {
  heading = "Test heading";
  leadingIcon?: GoabIconType;
  testId?: string;
}

describe("GoABAppHeaderMenu", () => {
  let fixture: ComponentFixture<TestAppHeaderMenuComponent>;
  let component: TestAppHeaderMenuComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabAppHeaderMenu, TestAppHeaderMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestAppHeaderMenuComponent);
    component = fixture.componentInstance;

    component.leadingIcon = "accessibility";
    component.testId = "foo";

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.debugElement.query(By.css("goa-app-header-menu")).nativeElement;

    expect(el?.getAttribute("heading")).toBe(component.heading);
    expect(el?.getAttribute("leadingicon")).toBe(component.leadingIcon);
    expect(el?.getAttribute("testid")).toBe(component.testId);
    expect(el?.innerHTML).toContain("Home");
  });
});
